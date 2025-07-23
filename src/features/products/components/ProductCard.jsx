import StarIcon from "../../../components/icons/StarIcon";
import './ProductCard.css';

const ProductCard = ({ product }) => (
  <div className="product-card">
    <div className="product-card-image-container">
      <img src={product.image} alt={product.name} className="product-card-image" />
      <div className="product-card-badge">NEW</div>
    </div>
    <div className="product-card-content">
      <h3 className="product-card-title">{product.name}</h3>
      <p className="product-card-type">{product.type}</p>
      <div className="product-card-footer">
        <span className="product-card-price">{product.price}</span>
        <div className="product-card-rating">
            {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className={`product-card-star ${i < product.rating ? 'filled' : 'empty'}`} isFilled={i < product.rating} />
            ))}
        </div>
      </div>
      <button className="product-card-button">
        Add to Cart
      </button>
    </div>
  </div>
);

export default ProductCard;
