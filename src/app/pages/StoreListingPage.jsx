import React, { useState, useMemo } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import SearchIcon from '../../components/icons/SearchIcon';
import StarIcon from '../../components/icons/StarIcon';
import { Stores } from '../../lib/placeholder-data';
import StoreCard from '../../features/stores/components/StoreCard';
import './StoreListingPage.css';



// Enhanced Store Card Component


// Filter Sidebar Component
const FilterSidebar = ({ filters, onFilterChange, onClearFilters }) => {
    const cities = [
        { id: 'mumbai', label: 'Mumbai', count: 1 },
        { id: 'delhi', label: 'Delhi', count: 1 },
        { id: 'bengaluru', label: 'Bengaluru', count: 1 },
        { id: 'hyderabad', label: 'Hyderabad', count: 1 },
        { id: 'chennai', label: 'Chennai', count: 1 },
        { id: 'pune', label: 'Pune', count: 1 },
        { id: 'kolkata', label: 'Kolkata', count: 1 },
        { id: 'goa', label: 'Goa', count: 1 },
    ];

    const storeTypes = [
        { id: 'luxury', label: 'Luxury', count: 1 },
        { id: 'premium', label: 'Premium', count: 2 },
        { id: 'standard', label: 'Standard', count: 3 },
        { id: 'budget', label: 'Budget', count: 2 },
    ];

    return (
        <aside className="filter-sidebar">
            <div className="filter-sidebar-header">
                <h3 className="filter-sidebar-title">Filters</h3>
                <button className="filter-sidebar-clear" onClick={onClearFilters}>Clear All</button>
            </div>

            <div className="filter-group">
                <h4 className="filter-group-title">Search Stores</h4>
                <div className="search-input-container">
                    <SearchIcon className="search-input-icon" />
                    <input
                        type="text"
                        placeholder="Search by name or location..."
                        className="search-input"
                        value={filters.search}
                        onChange={(e) => onFilterChange('search', e.target.value)}
                    />
                </div>
            </div>

            <div className="filter-group">
                <h4 className="filter-group-title">City</h4>
                {cities.map(city => (
                    <div key={city.id} className="filter-group-option">
                        <input
                            type="checkbox"
                            id={`city-${city.id}`}
                            checked={filters.cities.includes(city.id)}
                            onChange={(e) => {
                                const newCities = e.target.checked
                                    ? [...filters.cities, city.id]
                                    : filters.cities.filter(c => c !== city.id);
                                onFilterChange('cities', newCities);
                            }}
                        />
                        <label htmlFor={`city-${city.id}`}>
                            {city.label} <span className="filter-count">({city.count})</span>
                        </label>
                    </div>
                ))}
            </div>

            <div className="filter-group">
                <h4 className="filter-group-title">Store Type</h4>
                {storeTypes.map(type => (
                    <div key={type.id} className="filter-group-option">
                        <input
                            type="checkbox"
                            id={`type-${type.id}`}
                            checked={filters.types.includes(type.id)}
                            onChange={(e) => {
                                const newTypes = e.target.checked
                                    ? [...filters.types, type.id]
                                    : filters.types.filter(t => t !== type.id);
                                onFilterChange('types', newTypes);
                            }}
                        />
                        <label htmlFor={`type-${type.id}`}>
                            {type.label} <span className="filter-count">({type.count})</span>
                        </label>
                    </div>
                ))}
            </div>

            <div className="filter-group">
                <h4 className="filter-group-title">Delivery Fee</h4>
                <div className="price-range-container">
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={filters.maxDeliveryFee}
                        onChange={(e) => onFilterChange('maxDeliveryFee', parseInt(e.target.value))}
                        className="price-slider"
                    />
                    <div className="price-labels">
                        <span>Free</span>
                        <span>₹{filters.maxDeliveryFee}</span>
                    </div>
                </div>
            </div>

            <div className="filter-group">
                <h4 className="filter-group-title">Availability</h4>
                <div className="filter-group-option">
                    <input
                        type="checkbox"
                        id="open-now"
                        checked={filters.openOnly}
                        onChange={(e) => onFilterChange('openOnly', e.target.checked)}
                    />
                    <label htmlFor="open-now">Open Now</label>
                </div>
            </div>

            <div className="filter-group">
                <h4 className="filter-group-title">Rating</h4>
                {[4.5, 4.0, 3.5, 3.0].map(rating => (
                    <div key={rating} className="filter-group-option">
                        <input
                            type="radio"
                            name="rating"
                            id={`rating-${rating}`}
                            checked={filters.minRating === rating}
                            onChange={() => onFilterChange('minRating', rating)}
                        />
                        <label htmlFor={`rating-${rating}`} className="rating-filter-label">
                            <div className="rating-stars">
                                {[...Array(5)].map((_, i) => (
                                    <StarIcon key={i} className={`star star-small ${i < rating ? 'star-filled' : 'star-empty'}`} isFilled={i < rating} />
                                ))}
                            </div>
                            & Up
                        </label>
                    </div>
                ))}
            </div>
        </aside>
    );
};

// Main Store Listing Page Component
const StoreListingPage = () => {
    const [filters, setFilters] = useState({
        search: '',
        cities: [],
        types: [],
        maxDeliveryFee: 100,
        openOnly: false,
        minRating: 0
    });

    const [sortBy, setSortBy] = useState('default');
    const [viewMode, setViewMode] = useState('grid');

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            search: '',
            cities: [],
            types: [],
            maxDeliveryFee: 100,
            openOnly: false,
            minRating: 0
        });
    };

    const filteredAndSortedStores = useMemo(() => {
        let filtered = Stores.filter(store => {
            // Search filter
            if (filters.search && !store.name.toLowerCase().includes(filters.search.toLowerCase()) &&
                !store.location.toLowerCase().includes(filters.search.toLowerCase())) {
                return false;
            }

            // City filter
            if (filters.cities.length > 0 && !filters.cities.includes(store.city)) {
                return false;
            }

            // Type filter
            if (filters.types.length > 0 && !filters.types.includes(store.type)) {
                return false;
            }

            // Delivery fee filter
            if (store.deliveryFee > filters.maxDeliveryFee) {
                return false;
            }

            // Open only filter
            if (filters.openOnly && !store.isOpen) {
                return false;
            }

            // Rating filter
            if (filters.minRating > 0 && store.rating < filters.minRating) {
                return false;
            }

            return true;
        });

        // Sort stores
        switch (sortBy) {
            case 'rating-desc':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'delivery-time':
                filtered.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
                break;
            case 'delivery-fee':
                filtered.sort((a, b) => a.deliveryFee - b.deliveryFee);
                break;
            case 'name-asc':
                filtered.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'popularity':
                filtered.sort((a, b) => b.reviews - a.reviews);
                break;
            default:
                // Keep original order
                break;
        }

        return filtered;
    }, [filters, sortBy]);

    return (
        <div className="slp-page">
            <Header />
            <div className="slp-container">
                <FilterSidebar
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={clearFilters}
                />
                <main className="store-grid-container">
                    <div className="store-grid-header">
                        <div className="header-left">
                            <h1 className="store-grid-title">All Stores</h1>
                            <span className="results-count">
                                {filteredAndSortedStores.length} stores found
                            </span>
                        </div>
                        <div className="header-controls">
                            <div className="view-toggle">
                                <button
                                    className={`view-toggle-btn ${viewMode === 'grid' ? 'view-toggle-btn--active' : ''}`}
                                    onClick={() => setViewMode('grid')}
                                >
                                    Grid
                                </button>
                                <button
                                    className={`view-toggle-btn ${viewMode === 'list' ? 'view-toggle-btn--active' : ''}`}
                                    onClick={() => setViewMode('list')}
                                >
                                    List
                                </button>
                            </div>
                            <select
                                className="store-grid-sort"
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                            >
                                <option value="default">Sort by: Default</option>
                                <option value="rating-desc">Rating: High to Low</option>
                                <option value="delivery-time">Delivery Time: Fastest</option>
                                <option value="delivery-fee">Delivery Fee: Lowest</option>
                                <option value="name-asc">Name: A to Z</option>
                                <option value="popularity">Most Popular</option>
                            </select>
                        </div>
                    </div>

                    {filteredAndSortedStores.length === 0 ? (
                        <div className="no-results">
                            <h3>No stores found</h3>
                            <p>Try adjusting your filters or search terms</p>
                            <button onClick={clearFilters} className="clear-filters-btn">Clear All Filters</button>
                        </div>
                    ) : (
                        <div className={`store-grid ${viewMode === 'list' ? 'store-grid--list' : ''}`}>
                            {filteredAndSortedStores.map(store => (
                                <StoreCard key={store.id} store={store} />
                            ))}
                        </div>
                    )}
                </main>
            </div>
            <Footer />
        </div>
    );
};

export default StoreListingPage;


