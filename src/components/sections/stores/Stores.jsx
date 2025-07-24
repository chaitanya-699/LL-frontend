import React, { useState, useEffect, useRef } from 'react';
import { stores, brands } from '../../../libs/data.js';
import './Stores.css';

export default function Stores() {
  const [currentStoreIndex, setCurrentStoreIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const sectionRef = useRef(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimate(true), 10);
        } else {
          setAnimate(false);
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
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
  
  // Debug: log brand data
  console.log('Brand Belt Data:', brandBelt.length, brands);

  return (
    <section className="stores-section" ref={sectionRef}>
      <div className="stores-main">
        <div className={`stores-left${animate ? ' animate' : ''}`}>
          <div className="stores-header">
            <h2 className={`stores-title${animate ? ' animate' : ''}`}>Our Premium Locations</h2>
            <p className={`stores-subtitle${animate ? ' animate' : ''}`}>
              Visit our curated stores for an exceptional spirits experience
            </p>
          </div>

          <div className="featured-store">
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
                  <span>Get Directions</span>
                </a>
                <button className="store-btn secondary">
                  <span>Details</span>
                </button>
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

        <div className={`stores-right${animate ? ' animate' : ''}`}>
          <h3 className="stores-right-title">All Locations</h3>
          <div className="stores-grid">
            {stores.map((store, index) => (
              <div
                key={store.name}
                className={`store-card ${index === currentStoreIndex ? 'active' : ''} ${animate ? 'animate' : ''}`}
                onClick={() => goToStore(index)}
                style={{ animationDelay: animate ? `${index * 0.1 + 0.2}s` : '0s' }}
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

      {/* Brand Belt Section */}
      <div className={`brands-belt${animate ? ' animate' : ''}`}>
        <div className="brands-belt-header">
          <h3 className="brands-title">Our Premium Partners</h3>
        </div>
        <div className="brands-scroll">
          {brandBelt.map((brand, idx) => (
            <div className="brand-item" key={`${brand.name}-${idx}`}>
              <div className="brand-fallback">
                {brand.name}
              </div>
            </div>
          ))}
          {/* Debug: Ensure render */}
          <div className="brand-item">
            <div className="brand-fallback" style={{background: 'red', color: 'white'}}>
              TEST BRAND
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
