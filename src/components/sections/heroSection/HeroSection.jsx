import React, { useState, useEffect, useCallback, useRef } from 'react';
import { heroSlides } from '../../../libs/data.js';
import './HeroSection.css';

const AUTOPLAY_DURATION = 3000; // 3 seconds

const HeroSection = React.forwardRef((props, ref) => {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef(null);
  const slideCount = heroSlides.length;

  const changeSlide = useCallback((newIndex) => {
    if (isAnimating || newIndex === current) return;
    setIsAnimating(true);
    setCurrent(newIndex);
    if (timerRef.current) clearTimeout(timerRef.current);
    setTimeout(() => setIsAnimating(false), 1000); // Animation duration
  }, [isAnimating, current]);

  const nextSlide = useCallback(() => {
    changeSlide((current + 1) % slideCount);
  }, [current, changeSlide, slideCount]);

  const prevSlide = useCallback(() => {
    changeSlide((current - 1 + slideCount) % slideCount);
  }, [current, changeSlide, slideCount]);

  useEffect(() => {
    if (!isAnimating) {
      timerRef.current = setTimeout(nextSlide, AUTOPLAY_DURATION);
    }
    return () => clearTimeout(timerRef.current);
  }, [isAnimating, nextSlide]);

  return (
    <section ref={ref} id="hero-section" className="hero-split-section slide-anim-root">
      {/* Left: Content Panel */}
      <div className="hero-left slide-anim-panel">
        <div className="hero-content-slider">
          {heroSlides.map((slide, idx) => (
            <div
              key={slide.category}
              className="hero-content-slide"
              style={{
                transform: `translateY(${(idx - current) * 100}%)`,
                opacity: idx === current ? 1 : 0,
                zIndex: idx === current ? 2 : 1,
                pointerEvents: idx === current ? 'auto' : 'none',
              }}
            >
              <span className="hero-category">{slide.category}</span>
              <h1 className="hero-title">{slide.title}</h1>
              {slide.subtitle && <p className="hero-subtitle">{slide.subtitle}</p>}
              <p className="hero-desc">{slide.description}</p>
              <button className="hero-cta">View Collection</button>
            </div>
          ))}
        </div>
        <div className="hero-controls">
          <span className="hero-index">{String(current + 1).padStart(2, '0')}</span>
          <span className="hero-divider">/</span>
          <span className="hero-total">{String(slideCount).padStart(2, '0')}</span>
          <button className="hero-arrow" onClick={prevSlide} aria-label="Previous Slide" disabled={isAnimating}>&#8593;</button>
          <button className="hero-arrow" onClick={nextSlide} aria-label="Next Slide" disabled={isAnimating}>&#8595;</button>
        </div>
      </div>
      {/* Right: Image Panel */}
      <div className="hero-right slide-anim-panel">
        <div className="hero-image-slider">
          {heroSlides.map((slide, idx) => (
            <div
              key={slide.image}
              className="hero-image-slide"
              style={{
                backgroundImage: `url(${slide.image})`,
                transform: `translateY(${-(idx - current) * 100}%)`,
                opacity: idx === current ? 1 : 0,
                zIndex: idx === current ? 2 : 1,
                pointerEvents: idx === current ? 'auto' : 'none',
              }}
            >
              <div className="hero-image-overlay"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default HeroSection;
