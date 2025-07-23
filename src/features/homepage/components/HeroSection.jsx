import { useNavigate } from 'react-router-dom';
import './HeroSection.css';

const HeroSection = () => {
  const navigate = useNavigate(); // ✅ Moved inside component

  return (
    <div className="hero-section">
      <div className="hero-background">
        <img src="https://github.com/chaitanya-699/liquor-store-ecommerce/blob/master/frontend1/src/assets/background-img6.jpg?raw=true" alt="Bottles on a shelf" />
        <div className="hero-overlay"></div>
      </div>
      <div className="container hero-content">
        <h1 className="hero-title">
          Your Favorite Drinks, <br />
          <span className="hero-title-highlight">Delivered Fast.</span>
        </h1>
        <p className="hero-description">
          Browse thousands of products from local stores and get them delivered to your doorstep.
        </p>
        <div className="hero-cta">
          <a onClick={() => navigate("/products")} className="hero-cta-button">
            Shop All Products
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
