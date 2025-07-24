import ProductCard from "../../products/components/ProductCard";
import { featuredProducts } from "../../../lib/placeholder-data";
import './FeaturedProductsSection.css';

const FeaturedProductsSection = () => (
  <div className="featured-products-section">
    <div className="container">
      <h2 className="featured-products-title">Featured Products</h2>
      <div className="featured-products-grid">
        {featuredProducts.map(product => <ProductCard key={product.id} product={product} />)}
      </div>
    </div>
  </div>
);

export default FeaturedProductsSection;

