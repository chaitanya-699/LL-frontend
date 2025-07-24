import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-column">
                    <h4>The Gilded Cask</h4>
                    <p>Experience the finest spirits, delivered.</p>
                </div>
                <div className="footer-column">
                    <h4>Quick Links</h4>
                    <a href="#">About Us</a>
                    <a href="#">Contact</a>
                    <a href="#">FAQ</a>
                </div>
                <div className="footer-column">
                    <h4>Follow Us</h4>
                    <div className="social-links">
                        <a href="#">Facebook</a>
                        <a href="#">Instagram</a>
                        <a href="#">Twitter</a>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2024 The Gilded Cask. All Rights Reserved.</p>
                <p>Please drink responsibly.</p>
            </div>
        </footer>
    );
};

export default Footer;

