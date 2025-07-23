import './CategoryCard.css';

const CategoryCard = ({ category }) => (
    <div className="category-card">
        <img src={category.image} alt={category.name} />
        <div className="category-card-overlay">
            <h3 className="category-card-title">{category.name}</h3>
        </div>
    </div>
);

export default CategoryCard;
