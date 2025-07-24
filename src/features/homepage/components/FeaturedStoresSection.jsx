import StoreCard from "../../stores/components/StoreCard";
import { featuredStores } from "../../../lib/placeholder-data";
import './FeaturedStoresSection.css';

const FeaturedStoresSection = () => {


    return (
        <div className="featured-stores-section">
            <div className="container">
                <h2 className="featured-stores-title">Our Partner Stores</h2>
                <div className="featured-stores-grid">
                    {featuredStores.map(store => <StoreCard key={store.name} store={store} />)}
                </div>
            </div>
        </div>
    )
};

export default FeaturedStoresSection;
