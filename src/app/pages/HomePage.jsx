import Header from '../../components/layout/Header';
import HeroSection from '../../features/homepage/components/HeroSection';
import CategoriesSection from '../../features/homepage/components/CategoriesSection';
import FeaturedProductsSection from '../../features/homepage/components/FeaturedProductsSection';
import HowItWorksSection from '../../features/homepage/components/HowItWorksSection';
import FeaturedStoresSection from '../../features/homepage/components/FeaturedStoresSection';
import Footer from '../../components/layout/Footer';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProductsSection />
        <HowItWorksSection />
        <FeaturedStoresSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

