import SearchIcon from "../../../components/icons/SearchIcon";
import ShoppingCartIcon from "../../../components/icons/ShoppingCartIcon";
import './HowItWorksSection.css';

const HowItWorksSection = () => (
    <div className="how-it-works-section">
        <div className="container">
            <h2 className="how-it-works-title">How It Works</h2>
            <div className="how-it-works-grid">
                <div className="how-it-works-step">
                    <div className="how-it-works-icon">
                        <SearchIcon />
                    </div>
                    <h3 className="how-it-works-step-title">1. Browse & Discover</h3>
                    <p className="how-it-works-step-description">Find your favorite spirits, wines, and beers from a wide selection of local stores.</p>
                </div>
                <div className="how-it-works-step">
                    <div className="how-it-works-icon">
                        <ShoppingCartIcon />
                    </div>
                    <h3 className="how-it-works-step-title">2. Place Your Order</h3>
                    <p className="how-it-works-step-description">Add products to your cart and securely check out in just a few clicks.</p>
                </div>
                <div className="how-it-works-step">
                    <div className="how-it-works-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <h3 className="how-it-works-step-title">3. Fast Delivery</h3>
                    <p className="how-it-works-step-description">Get your order delivered to your doorstep, typically within a few hours.</p>
                </div>
            </div>
        </div>
    </div>
);

export default HowItWorksSection;