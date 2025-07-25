import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, X } from 'lucide-react';
import './Header.css';

const Header = ({ onNavigate }) => {
    const [mobileOpen, setMobileOpen] = useState(false);
    
    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        
        return () => {
            document.body.style.overflow = '';
        };
    }, [mobileOpen]);
    
    const handleNav = (idx) => {
        onNavigate(idx);
        setMobileOpen(false);
    };
    
    const toggleMobileMenu = () => {
        setMobileOpen(!mobileOpen);
    };
    return (
        <header className="header">
            <div className="logo">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span>Liquor🔗</span>
            </div>
            <nav className="navigation">
                <a onClick={() => handleNav(0)}>Home</a>
                <a onClick={() => handleNav(1)}>Categories</a>
                <a onClick={() => handleNav(2)}>Products</a>
                <a onClick={() => handleNav(3)}>Stores</a>
                <a onClick={() => handleNav(4)}>Join as Retailer</a>
            </nav>
            <button className="hamburger" aria-label="Open navigation" onClick={toggleMobileMenu}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div className={`mobile-nav-overlay${mobileOpen ? ' open' : ''}`} onClick={toggleMobileMenu}></div>
            <div className={`mobile-nav${mobileOpen ? ' open' : ''}`}> 
                <button className="mobile-close" onClick={toggleMobileMenu}>
                    <X size={24} />
                </button>
                <a onClick={() => handleNav(0)} style={{animationDelay: '0.1s'}}>Home</a>
                <a onClick={() => handleNav(1)} style={{animationDelay: '0.2s'}}>Categories</a>
                <a onClick={() => handleNav(2)} style={{animationDelay: '0.3s'}}>Products</a>
                <a onClick={() => handleNav(3)} style={{animationDelay: '0.4s'}}>Stores</a>
                <a onClick={() => handleNav(4)} style={{animationDelay: '0.5s'}}>Join as Retailer</a>
            </div>
            <div className="header-actions">
                <button aria-label="Search"><Search size={20} /></button>
                <button aria-label="User Account"><User size={20} /></button>
                <button aria-label="Shopping Cart"><ShoppingCart size={20} /></button>
            </div>
        </header>
    );
};

export default Header;

