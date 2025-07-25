import React, { useRef, useEffect, useState } from 'react';
import { categories } from '../../../libs/data.js';
import './Categories.css';

export default function Categories() {
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
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="categories-section" ref={sectionRef}>
      <div className={`categories-left${animate ? ' animate' : ''}`}>
        <h2 className={`categories-title${animate ? ' animate' : ''}`}>Shop by Category</h2>
        <p className={`categories-desc${animate ? ' animate' : ''}`}>Discover our curated selection of liquors. Choose your favorite and explore our exclusive collections.</p>
        <div className="categories-actions">
          <button className="categories-btn"><span>All</span></button>
          <button className="categories-btn"><span>Popular</span></button>
          <button className="categories-btn"><span>New Arrivals</span></button>
        </div>
      </div>
      <div className="categories-right">
        <div className="categories-grid">
          {categories.slice(0, 7).map((cat, idx) => (
            <div
              key={cat.title}
              className={`category-card${animate ? ' animate' : ''}`}
              style={{
                backgroundImage: `url(${cat.image})`,
                animationDelay: animate ? `${idx * 0.12 + 0.1}s` : '0s',
              }}
            >
              <div className="category-card-overlay" />
              <div className="category-card-content">
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
                <button className="category-card-btn"><span>{cat.button}</span></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
