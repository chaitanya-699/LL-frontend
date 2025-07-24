import './Footer.css';

const Footer = () => (
    <footer className="footer">
        <div className="container footer-container">
            <div className="footer-grid">
                <div className="footer-brand">
                    <h3>LiquorLink</h3>
                    <p>Your one-stop shop for the best drinks from local stores.</p>
                </div>
                <div className="footer-section">
                    <h4>Shop</h4>
                    <ul>
                        <li><a href="#">All Products</a></li>
                        <li><a href="#">Whisky</a></li>
                        <li><a href="#">Wine</a></li>
                        <li><a href="#">Beer</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="#">About Us</a></li>
                        <li><a href="#">Contact</a></li>
                        <li><a href="#">Terms of Service</a></li>
                        <li><a href="#">Privacy Policy</a></li>
                    </ul>
                </div>
                <div className="footer-section footer-newsletter">
                    <h4>Stay Connected</h4>
                    <p>Get the latest updates and offers.</p>
                    <div className="footer-newsletter-form">
                        <input type="email" placeholder="Enter your email" className="footer-newsletter-input" />
                        <button className="footer-newsletter-button">Go</button>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} LiquorLink. All rights reserved.</p>
                <p>Please drink responsibly. You must be of legal drinking age to purchase.</p>
            </div>
        </div>
    </footer>
);

export default Footer;
