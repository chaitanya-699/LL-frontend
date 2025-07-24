import React, { useState, useMemo } from 'react';
import Header from '../../components/layout/Header';
import Footer from '../../components/layout/Footer';
import SearchIcon from '../../components/icons/SearchIcon';
import StarIcon from '../../components/icons/StarIcon';
import './ProductListingPage.css';

// Enhanced placeholder data with more details
const placeholderProducts = [
  { id: 1, name: 'Glenfiddich 18 Year', type: 'Scotch Whisky', category: 'whisky', price: 8500, originalPrice: 9500, rating: 5, reviews: 124, image: 'https://placehold.co/400x400/1a202c/ffffff?text=Whisky', inStock: true, discount: 10 },
  { id: 2, name: 'Sula Sauvignon Blanc', type: 'White Wine', category: 'wine', price: 1200, originalPrice: 1400, rating: 4, reviews: 89, image: 'https://placehold.co/400x400/4a5568/ffffff?text=Wine', inStock: true, discount: 14 },
  { id: 3, name: 'Bira 91 Blonde', type: 'Craft Beer', category: 'beer', price: 180, originalPrice: 200, rating: 4, reviews: 256, image: 'https://placehold.co/400x400/2d3748/ffffff?text=Beer', inStock: true, discount: 10 },
  { id: 4, name: 'Absolut Vodka', type: 'Vodka', category: 'vodka', price: 2100, originalPrice: 2300, rating: 5, reviews: 178, image: 'https://placehold.co/400x400/718096/ffffff?text=Vodka', inStock: false, discount: 9 },
  { id: 5, name: 'Old Monk', type: 'Dark Rum', category: 'rum', price: 800, originalPrice: 850, rating: 4, reviews: 342, image: 'https://placehold.co/400x400/A0522D/FFFFFF?text=Rum', inStock: true, discount: 6 },
  { id: 6, name: 'Greater Than Gin', type: 'Premium Gin', category: 'gin', price: 1500, originalPrice: 1650, rating: 4, reviews: 67, image: 'https://placehold.co/400x400/008080/FFFFFF?text=Gin', inStock: true, discount: 9 },
  { id: 7, name: 'Jacob\'s Creek Shiraz', type: 'Red Wine', category: 'wine', price: 1400, originalPrice: 1600, rating: 4, reviews: 145, image: 'https://placehold.co/400x400/800020/FFFFFF?text=Wine', inStock: true, discount: 13 },
  { id: 8, name: 'Kingfisher Ultra', type: 'Lager Beer', category: 'beer', price: 150, originalPrice: 160, rating: 3, reviews: 423, image: 'https://placehold.co/400x400/FFD700/000000?text=Beer', inStock: true, discount: 6 },
  { id: 9, name: 'Macallan 12 Year', type: 'Single Malt', category: 'whisky', price: 12500, originalPrice: 13000, rating: 5, reviews: 89, image: 'https://placehold.co/400x400/8B4513/FFFFFF?text=Whisky', inStock: true, discount: 4 },
  { id: 10, name: 'Chandon Brut', type: 'Sparkling Wine', category: 'wine', price: 2800, originalPrice: 3200, rating: 4, reviews: 156, image: 'https://placehold.co/400x400/FFD700/000000?text=Champagne', inStock: true, discount: 13 },
  { id: 11, name: 'Captain Morgan Spiced', type: 'Spiced Rum', category: 'rum', price: 1800, originalPrice: 1950, rating: 4, reviews: 234, image: 'https://placehold.co/400x400/8B4513/FFFFFF?text=Rum', inStock: false, discount: 8 },
  { id: 12, name: 'Bombay Sapphire', type: 'London Dry Gin', category: 'gin', price: 2200, originalPrice: 2400, rating: 5, reviews: 198, image: 'https://placehold.co/400x400/4169E1/FFFFFF?text=Gin', inStock: true, discount: 8 },
];

// Enhanced Product Card component
const ProductCard = ({ product }) => (
  <div className={`product-card ${!product.inStock ? 'product-card--out-of-stock' : ''}`}>
    <div className="product-card__image-container">
      <img src={product.image} alt={product.name} className="product-card__image" />
      {product.discount > 0 && (
        <div className="product-card__discount-badge">-{product.discount}%</div>
      )}
      {!product.inStock && (
        <div className="product-card__stock-overlay">Out of Stock</div>
      )}
    </div>
    <div className="product-card__content">
      <h3 className="product-card__name">{product.name}</h3>
      <p className="product-card__type">{product.type}</p>
      
      <div className="product-card__rating">
        <div className="rating-stars">
          {[...Array(5)].map((_, i) => (
            <StarIcon key={i} className={`star ${i < product.rating ? 'star--filled' : 'star--empty'}`} isFilled={i < product.rating} />
          ))}
        </div>
        <span className="rating-text">({product.reviews})</span>
      </div>

      <div className="product-card__pricing">
        <div className="price-container">
          <span className="current-price">₹{product.price.toLocaleString('en-IN')}</span>
          {product.originalPrice > product.price && (
            <span className="original-price">₹{product.originalPrice.toLocaleString('en-IN')}</span>
          )}
        </div>
      </div>

      <button 
        className={`product-card__button ${!product.inStock ? 'product-card__button--disabled' : ''}`}
        disabled={!product.inStock}
      >
        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
      </button>
    </div>
  </div>
);

// Enhanced Filter Sidebar Component
const FilterSidebar = ({ filters, onFilterChange, onClearFilters }) => {
  const categories = [
    { id: 'whisky', label: 'Whisky', count: 2 },
    { id: 'wine', label: 'Wine', count: 3 },
    { id: 'beer', label: 'Beer', count: 2 },
    { id: 'vodka', label: 'Vodka', count: 1 },
    { id: 'rum', label: 'Rum', count: 2 },
    { id: 'gin', label: 'Gin', count: 2 },
  ];

  return (
    <aside className="filter-sidebar">
      <div className="filter-sidebar__header">
        <h3 className="filter-sidebar__title">Filters</h3>
        <button className="filter-sidebar__clear" onClick={onClearFilters}>Clear All</button>
      </div>
      
      <div className="filter-group">
        <h4 className="filter-group__title">Search</h4>
        <div className="search-input-container">
          <SearchIcon className="search-input-icon" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="search-input"
            value={filters.search}
            onChange={(e) => onFilterChange('search', e.target.value)}
          />
        </div>
      </div>

      <div className="filter-group">
        <h4 className="filter-group__title">Category</h4>
        {categories.map(category => (
          <div key={category.id} className="filter-group__option">
            <input 
              type="checkbox" 
              id={`cat-${category.id}`}
              checked={filters.categories.includes(category.id)}
              onChange={(e) => {
                const newCategories = e.target.checked 
                  ? [...filters.categories, category.id]
                  : filters.categories.filter(c => c !== category.id);
                onFilterChange('categories', newCategories);
              }}
            />
            <label htmlFor={`cat-${category.id}`}>
              {category.label} <span className="category-count">({category.count})</span>
            </label>
          </div>
        ))}
      </div>

      <div className="filter-group">
        <h4 className="filter-group__title">Price Range</h4>
        <div className="price-range-container">
          <input 
            type="range" 
            min="100" 
            max="15000" 
            value={filters.maxPrice}
            onChange={(e) => onFilterChange('maxPrice', parseInt(e.target.value))}
            className="price-slider" 
          />
          <div className="price-labels">
            <span>₹100</span>
            <span>₹{filters.maxPrice.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      <div className="filter-group">
        <h4 className="filter-group__title">Availability</h4>
        <div className="filter-group__option">
          <input 
            type="checkbox" 
            id="in-stock"
            checked={filters.inStockOnly}
            onChange={(e) => onFilterChange('inStockOnly', e.target.checked)}
          />
          <label htmlFor="in-stock">In Stock Only</label>
        </div>
      </div>

      <div className="filter-group">
        <h4 className="filter-group__title">Rating</h4>
        {[4, 3, 2, 1].map(rating => (
          <div key={rating} className="filter-group__option">
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
                  <StarIcon key={i} className={`star star--small ${i < rating ? 'star--filled' : 'star--empty'}`} isFilled={i < rating} />
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

// Main Product Listing Page Component
const ProductListingPage = () => {
  const [filters, setFilters] = useState({
    search: '',
    categories: [],
    maxPrice: 15000,
    inStockOnly: false,
    minRating: 0
  });
  
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid'); // grid or list

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      search: '',
      categories: [],
      maxPrice: 15000,
      inStockOnly: false,
      minRating: 0
    });
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = placeholderProducts.filter(product => {
      // Search filter
      if (filters.search && !product.name.toLowerCase().includes(filters.search.toLowerCase()) && 
          !product.type.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(product.category)) {
        return false;
      }
      
      // Price filter
      if (product.price > filters.maxPrice) {
        return false;
      }
      
      // Stock filter
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }
      
      // Rating filter
      if (filters.minRating > 0 && product.rating < filters.minRating) {
        return false;
      }
      
      return true;
    });

    // Sort products
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating-desc':
        filtered.sort((a, b) => b.rating - a.rating);
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
    <div className="plp-page">
      <Header />
      <div className="plp-container">
        <FilterSidebar 
          filters={filters} 
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />
        <main className="product-grid-container">
          <div className="product-grid__header">
            <div className="header-left">
              <h1 className="product-grid__title">All Products</h1>
              <span className="results-count">
                {filteredAndSortedProducts.length} products found
              </span>
            </div>
            <div className="header-controls">
              <div className="view-toggle">
                <button 
                  className={`view-toggle__btn ${viewMode === 'grid' ? 'view-toggle__btn--active' : ''}`}
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </button>
                <button 
                  className={`view-toggle__btn ${viewMode === 'list' ? 'view-toggle__btn--active' : ''}`}
                  onClick={() => setViewMode('list')}
                >
                  List
                </button>
              </div>
              <select 
                className="product-grid__sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Sort by: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="rating-desc">Rating: High to Low</option>
                <option value="popularity">Most Popular</option>
              </select>
            </div>
          </div>
          
          {filteredAndSortedProducts.length === 0 ? (
            <div className="no-results">
              <h3>No products found</h3>
              <p>Try adjusting your filters or search terms</p>
              <button onClick={clearFilters} className="clear-filters-btn">Clear All Filters</button>
            </div>
          ) : (
            <div className={`product-grid ${viewMode === 'list' ? 'product-grid--list' : ''}`}>
              {filteredAndSortedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default ProductListingPage;

