import React from 'react';
import { ShoppingCart, User, Search } from 'lucide-react';
import './Header.css';

const Header = ({ onNavigate }) => {
    return (
        <header className="header">
            <div className="logo">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <span>The Gilded Cask</span>
            </div>
            <nav className="navigation">
                <a onClick={() => onNavigate(0)}>Home</a>
                <a onClick={() => onNavigate(1)}>Categories</a>
                <a onClick={() => onNavigate(2)}>Products</a>
                <a onClick={() => onNavigate(3)}>Stores</a>
                <a onClick={() => onNavigate(4)}>Join as Retailer</a>
            </nav>
            <div className="header-actions">
                <button aria-label="Search"><Search size={20} /></button>
                <button aria-label="User Account"><User size={20} /></button>
                <button aria-label="Shopping Cart"><ShoppingCart size={20} /></button>
            </div>
        </header>
    );
};

export default Header;

