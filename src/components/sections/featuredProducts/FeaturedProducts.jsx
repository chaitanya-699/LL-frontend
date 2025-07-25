import React, { useRef, useEffect, useState } from 'react';
import { featuredProducts } from '../../../libs/data.js';
import './FeaturedProducts.css';

export default function FeaturedProducts() {
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

  return (
    <section className="featured-section" ref={sectionRef}>
      <div className={`featured-left${animate ? ' animate' : ''}`}>
        <div className="featured-grid">
          {featuredProducts.slice(0, 4).map((product, idx) => (
            <div
              key={product.title}
              className={`featured-card${animate ? ' animate' : ''}`}
              style={{ animationDelay: animate ? `${idx * 0.14 + 0.1}s` : '0s' }}
            >
              <div className="featured-card-img" style={{ backgroundImage: `url(${product.image})` }} />
              <div className="featured-card-info">
                <h3>{product.title}</h3>
                <p>{product.description}</p>
                <div className="featured-card-bottom">
                  <span className="featured-card-price">{product.price}</span>
                  <button className="featured-card-btn"><span>{product.button}</span></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`featured-right${animate ? ' animate' : ''}`}>
        <h2 className="featured-title">Featured Products</h2>
        <p className="featured-desc">
          Discover our handpicked selection of premium spirits, each chosen for their exceptional quality and unique character. Elevate your collection with these exclusive bottles.
        </p>
        <button className="featured-cta"><span>Browse All Products</span></button>
      </div>
    </section>
  );
}
