
import StarIcon from '../../../components/icons/StarIcon';
import './StoreCard.css';

const StoreCard = ({ store }) => {
    // Handle missing properties with defaults
    const storeData = {
        isOpen: true,
        type: 'standard',
        deliveryFee: 50,
        minOrder: 500,
        deliveryTime: '45-60 min',
        rating: 4.0,
        reviews: 100,
        specialties: ['Wide Selection', 'Quality Products'],
        offers: ['Special discounts available'],
        ...store
    };

    return (
        <div className={`store-card ${!storeData.isOpen ? 'store-card--closed' : ''}`}>
            <div className="store-card-image-container">
                <img src={storeData.image} alt={storeData.name} className="store-card-image" />
                <div className="store-card-badges">
                    {!storeData.isOpen && <div className="store-badge store-badge--closed">Closed</div>}
                    {storeData.type === 'luxury' && <div className="store-badge store-badge--luxury">Luxury</div>}
                    {storeData.type === 'premium' && <div className="store-badge store-badge--premium">Premium</div>}
                    {storeData.deliveryFee === 0 && <div className="store-badge store-badge--free">Free Delivery</div>}
                </div>
                <div className="store-card-rating">
                    <StarIcon className="rating-star" isFilled={true} />
                    <span>{storeData.rating}</span>
                </div>
            </div>

            <div className="store-card-content">
                <div className="store-card-header">
                    <h3 className="store-card-title">{storeData.name}</h3>
                    <p className="store-card-location">{storeData.location}</p>
                </div>

                <div className="store-card-info">
                    <div className="store-info-item">
                        <span className="info-label">Delivery Time</span>
                        <span className="info-value">{storeData.deliveryTime}</span>
                    </div>
                    <div className="store-info-item">
                        <span className="info-label">Delivery Fee</span>
                        <span className="info-value">₹{storeData.deliveryFee}</span>
                    </div>
                    <div className="store-info-item">
                        <span className="info-label">Min Order</span>
                        <span className="info-value">₹{storeData.minOrder}</span>
                    </div>
                </div>

                {storeData.specialties && storeData.specialties.length > 0 && (
                    <div className="store-card-specialties">
                        {storeData.specialties.slice(0, 2).map((specialty, index) => (
                            <span key={index} className="specialty-tag">{specialty}</span>
                        ))}
                    </div>
                )}

                {storeData.offers && storeData.offers.length > 0 && (
                    <div className="store-card-offers">
                        <div className="offer-item">
                            <span className="offer-icon">🎉</span>
                            <span className="offer-text">{storeData.offers[0]}</span>
                        </div>
                    </div>
                )}

                <div className="store-card-actions">
                    <button 
                        className={`store-card-button ${!storeData.isOpen ? 'store-card-button--disabled' : ''}`} 
                        disabled={!storeData.isOpen}
                    >
                        {storeData.isOpen ? 'View Store' : 'Closed'}
                    </button>
                    <button className="store-card-button-secondary" title="Store Info">
                        <span>ℹ️</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StoreCard;