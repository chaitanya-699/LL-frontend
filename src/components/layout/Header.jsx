import { useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import SearchIcon from '../icons/SearchIcon';
import ShoppingCartIcon from '../icons/ShoppingCartIcon';
import MenuIcon from '../icons/MenuIcon';
import XIcon from '../icons/XIcon';
import { searchData } from '../../lib/placeholder-data';
import './Header.css';

// Sample search data - in a real app, this would come from an API

const Header = () => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(true); // For demo purposes, set to true
    const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
    const searchInputRef = useRef(null);
    const searchContainerRef = useRef(null);
    const accountDropdownRef = useRef(null);

    // Handle search functionality
    const handleSearch = (query) => {
        setSearchQuery(query);
        if (query.trim() === '') {
            setSearchResults([]);
            return;
        }

        const filtered = searchData.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.type.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        );
        setSearchResults(filtered.slice(0, 6)); // Limit to 6 results
    };

    // Handle search submit
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
            setIsSearchOpen(false);
            setSearchQuery('');
            setSearchResults([]);
        }
    };

    // Handle search result click
    const handleResultClick = (item) => {
        navigate(`/products/${item.id}`);
        setIsSearchOpen(false);
        setSearchQuery('');
        setSearchResults([]);
    };

    // Toggle search
    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
        if (!isSearchOpen) {
            setTimeout(() => {
                searchInputRef.current?.focus();
            }, 1);
        } else {
            setSearchQuery('');
            setSearchResults([]);
        }
    };

    // Close search when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if click is on search toggle button
            const searchToggle = event.target.closest('.header-search-toggle');
            if (searchToggle) return;

            // Check if click is inside search container
            if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
                setIsSearchOpen(false);
                setIsSearchFocused(false);
                setSearchQuery('');
                setSearchResults([]);
            }
        };

        if (isSearchOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isSearchOpen]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                setIsSearchOpen(false);
                setIsSearchFocused(false);
                setSearchQuery('');
                setSearchResults([]);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, []);

    return (
        <header className={`header ${isSearchOpen ? 'header-search-active' : ''}`}>
            <nav className="container header-nav">
                <div className="header-logo">
                    <a href="#" onClick={() => navigate('/')}>LiquorLink</a>
                </div>

                {/* Search Backdrop */}
                <div className={`search-backdrop ${isSearchOpen ? 'active' : ''}`} onClick={toggleSearch}></div>

                {/* Desktop Search Bar */}
                <div className={`header-search-desktop ${isSearchOpen ? 'active' : ''}`} ref={searchContainerRef}>
                    <form onSubmit={handleSearchSubmit} className="header-search-form">
                        <div className="header-search-input-container">
                            <SearchIcon className="header-search-icon" />
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search for whisky, wine, beer..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                onFocus={() => setIsSearchFocused(true)}
                                onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
                                className="header-search-input"
                            />
                            <button
                                type="submit"
                                className="header-search-submit"
                                aria-label="Search"
                            >
                                <SearchIcon />
                            </button>
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSearchResults([]);
                                        searchInputRef.current?.focus();
                                    }}
                                    className="header-search-clear"
                                >
                                    <XIcon />
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Search Results Dropdown */}
                    {(isSearchFocused || searchResults.length > 0) && searchQuery && (
                        <div className="header-search-results">
                            {searchResults.length > 0 ? (
                                <>
                                    <div className="header-search-results-header">
                                        <span>Products ({searchResults.length})</span>
                                    </div>
                                    {searchResults.slice(0, 6).map((item) => (
                                        <div
                                            key={item.id}
                                            className="header-search-result-item"
                                            onClick={() => handleResultClick(item)}
                                        >
                                            <div className="search-result-info">
                                                <span className="search-result-name">{item.name}</span>
                                                <span className="search-result-type">{item.type}</span>
                                            </div>
                                            <span className="search-result-price">{item.price}</span>
                                        </div>
                                    ))}
                                    <div className="header-search-results-footer">
                                        <button
                                            onClick={handleSearchSubmit}
                                            className="search-view-all"
                                        >
                                            View all results for "{searchQuery}"
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="header-search-no-results">
                                    <span>No products found for "{searchQuery}"</span>
                                    <small>Try searching for whisky, wine, beer, or vodka</small>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <div className="header-desktop-menu">
                    <a onClick={() => navigate("/")}>Home</a>
                    <a onClick={() => navigate("/products")}>Shop</a>
                    <a onClick={() => navigate("/stores")}>Stores</a>
                    <a href="#" className="join-retailer-link">Join as Retailer</a>
                </div>

                <div className="header-actions">
                    <button
                        className={`header-icon-button header-search-toggle ${isSearchOpen ? 'active' : ''}`}
                        onClick={toggleSearch}
                        aria-label="Toggle search"
                    >
                        {isSearchOpen ? <XIcon /> : <SearchIcon />}
                    </button>
                    <button className="header-icon-button header-cart-button" aria-label="Shopping cart">
                        <ShoppingCartIcon />
                        <span className="header-cart-badge">3</span>
                    </button>

                    {/* User Account Section */}
                    {isUserLoggedIn ? (
                        <div 
                            className="header-account-dropdown"
                            ref={accountDropdownRef}
                            onMouseEnter={() => setIsAccountDropdownOpen(true)}
                            onMouseLeave={() => setIsAccountDropdownOpen(false)}
                        >
                            <button className="header-account-button">
                                <span className="account-icon">👤</span>
                                <span className="account-text">My Account</span>
                                <span className="dropdown-arrow">▼</span>
                            </button>
                            
                            {isAccountDropdownOpen && (
                                <div className="account-dropdown-menu">
                                    <div className="dropdown-header">
                                        <div className="user-info">
                                            <div className="user-avatar">👤</div>
                                            <div className="user-details">
                                                <span className="user-name">John Doe</span>
                                                <span className="user-email">john@example.com</span>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="dropdown-divider"></div>
                                    
                                    <div className="dropdown-menu-items">
                                        <a href="#" className="dropdown-item" onClick={() => navigate("/profile")}>
                                            <span className="item-icon">👤</span>
                                            <span className="item-text">My Profile</span>
                                        </a>
                                        
                                        <a href="#" className="dropdown-item" onClick={() => navigate("/orders")}>
                                            <span className="item-icon">📦</span>
                                            <span className="item-text">My Orders</span>
                                        </a>
                                        
                                        <a href="#" className="dropdown-item" onClick={() => navigate("/wishlist")}>
                                            <span className="item-icon">❤️</span>
                                            <span className="item-text">My Wish List</span>
                                        </a>
                                        
                                        <a href="#" className="dropdown-item" onClick={() => navigate("/favorite-stores")}>
                                            <span className="item-icon">🏪</span>
                                            <span className="item-text">My Favorite Stores</span>
                                        </a>
                                        
                                        <a href="#" className="dropdown-item" onClick={() => navigate("/payment-methods")}>
                                            <span className="item-icon">💳</span>
                                            <span className="item-text">Saved Card Details</span>
                                        </a>
                                        
                                        <a href="#" className="dropdown-item" onClick={() => navigate("/change-password")}>
                                            <span className="item-icon">🔒</span>
                                            <span className="item-text">Change Password</span>
                                        </a>
                                    </div>
                                    
                                    <div className="dropdown-divider"></div>
                                    
                                    <div className="dropdown-footer">
                                        <button 
                                            className="dropdown-item signout-item" 
                                            onClick={() => {
                                                setIsUserLoggedIn(false);
                                                setIsAccountDropdownOpen(false);
                                                // Add logout logic here
                                            }}
                                        >
                                            <span className="item-icon">🚪</span>
                                            <span className="item-text">Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button className="header-signin-button" onClick={() => navigate("/signin")}>
                            <span className="signin-icon">👤</span>
                            <span className="signin-text">Sign In</span>
                        </button>
                    )}

                    <div className="header-mobile-toggle">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="header-icon-button"
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? <XIcon /> : <MenuIcon />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Search Bar */}
            {isSearchOpen && (
                <div className="header-search-mobile">
                    <form onSubmit={handleSearchSubmit} className="header-search-form">
                        <div className="header-search-input-container">
                            <SearchIcon className="header-search-icon" />
                            <input
                                type="text"
                                placeholder="Search for whisky, wine, beer..."
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="header-search-input"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="header-search-submit"
                                aria-label="Search"
                            >
                                <SearchIcon />
                            </button>
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSearchResults([]);
                                    }}
                                    className="header-search-clear"
                                >
                                    <XIcon />
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Mobile Search Results */}
                    {searchResults.length > 0 && (
                        <div className="header-search-results mobile">
                            {searchResults.map((item) => (
                                <div
                                    key={item.id}
                                    className="header-search-result-item"
                                    onClick={() => handleResultClick(item)}
                                >
                                    <div className="search-result-info">
                                        <span className="search-result-name">{item.name}</span>
                                        <span className="search-result-type">{item.type}</span>
                                    </div>
                                    <span className="search-result-price">{item.price}</span>
                                </div>
                            ))}
                            <div className="header-search-results-footer">
                                <button
                                    onClick={handleSearchSubmit}
                                    className="search-view-all"
                                >
                                    View all results
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="header-mobile-menu">
                    <a onClick={() => { navigate("/"); setIsMenuOpen(false); }}>Home</a>
                    <a onClick={() => { navigate("/products"); setIsMenuOpen(false); }}>Shop</a>
                    <a href="#" onClick={() => setIsMenuOpen(false)}>Stores</a>
                    <a href="#" onClick={() => setIsMenuOpen(false)} className="join-retailer-link">Join as Retailer</a>
                    <div className="mobile-menu-divider"></div>
                    <a onClick={() => { navigate("/signin"); setIsMenuOpen(false); }} className="mobile-signin-link">
                        <span className="signin-icon">👤</span>
                        <span>Sign In</span>
                    </a>
                </div>
            )}
        </header>
    );
};

export default Header;