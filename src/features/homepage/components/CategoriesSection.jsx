import CategoryCard from "../../categories/components/CategoryCard";
import { categories } from "../../../lib/placeholder-data";
import './CategoriesSection.css';

const CategoriesSection = () => (
    <div className="categories-section">
        <div className="container">
            <h2 className="categories-title">Browse By Category</h2>
            <div className="categories-grid">
                {categories.map(category => <CategoryCard key={category.name} category={category} />)}
            </div>
        </div>
    </div>
);

export default CategoriesSection;

