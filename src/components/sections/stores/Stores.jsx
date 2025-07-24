import React, { useState, useEffect, useRef } from 'react';
import { stores, brands } from '../../../libs/data.js';
import './Stores.css';

export default function Stores() {
  const [currentStoreIndex, setCurrentStoreIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer for load animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Reset and trigger animations every time section comes into view
            setIsLoaded(false);
            setHasAnimated(false);

            // Small delay to ensure reset, then trigger animations
            setTimeout(() => {
              setIsLoaded(true);
              setHasAnimated(true);
            }, 100);
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of section is visible
        rootMargin: '-50px 0px -50px 0px' // Add some margin for better timing
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto-rotate featured store every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      nextStore();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextStore = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentStoreIndex((prev) => (prev + 1) % stores.length);
    setTimeout(() => setIsAnimating(false), 400);
  };

  const goToStore = (index) => {
    if (isAnimating || index === currentStoreIndex) return;
    setIsAnimating(true);
    setCurrentStoreIndex(index);
    setTimeout(() => setIsAnimating(false), 400);
  };

  // Triple brands for seamless scroll
  const brandBelt = [...brands, ...brands, ...brands];

  return (
    <section
      ref={sectionRef}
      className={`stores-section compact-design ${isLoaded ? 'loaded' : ''} ${hasAnimated ? 'animated' : ''}`}
    >
      <div className="stores-container">

        {/* Left Side - Store Info */}
        <div className={`stores-left ${isLoaded ? 'slide-in-left' : ''}`}>
          <div className={`stores-header ${isLoaded ? 'fade-in-up' : ''}`}>
            <h2 className="stores-title">Our Premium Locations</h2>
            <p className="stores-subtitle">
              Visit our curated stores for an exceptional spirits experience
            </p>
          </div>

          <div className={`featured-store ${isLoaded ? 'scale-in' : ''}`}>
            <div className="store-image-container">
              <img
                src={stores[currentStoreIndex].image}
                alt={stores[currentStoreIndex].name}
                className={`store-image ${isAnimating ? 'fade' : ''}`}
              />
              <div className="store-badge">Featured</div>
            </div>

            <div className="store-info">
              <h3 className={`store-name ${isAnimating ? 'fade' : ''}`}>
                {stores[currentStoreIndex].name}
              </h3>
              <p className={`store-address ${isAnimating ? 'fade' : ''}`}>
                {stores[currentStoreIndex].address}
              </p>

              <div className="store-actions">
                <a
                  href={stores[currentStoreIndex].map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="store-btn primary"
                >
                  Get Directions
                </a>
                <button className="store-btn secondary">Details</button>
              </div>
            </div>
          </div>

          {/* Store Navigation Dots */}
          <div className="store-dots">
            {stores.map((_, index) => (
              <button
                key={index}
                className={`store-dot ${index === currentStoreIndex ? 'active' : ''}`}
                onClick={() => goToStore(index)}
              />
            ))}
          </div>
        </div>

        {/* Right Side - All Stores Grid */}
        <div className="stores-right">
          <h3 className="grid-title">All Locations</h3>
          <div className="stores-grid">
            {stores.map((store, index) => (
              <div
                key={store.name}
                className={`store-card ${index === currentStoreIndex ? 'active' : ''}`}
                onClick={() => goToStore(index)}
              >
                <div className="card-image">
                  <img src={store.image} alt={store.name} />
                </div>
                <div className="card-info">
                  <h4>{store.name}</h4>
                  <p>{store.address}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Brand Belt */}
      <div className="brands-belt">
        <div className="brands-scroll">
          {brandBelt.map((brand, idx) => (
            <div className="brand-item" key={`${brand.name}-${idx}`}>
              <img src={brand.logo} alt={brand.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}