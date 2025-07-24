import React, { useState, useEffect, useRef, useCallback } from "react";

// Import the separated components
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import ScrollNavigation from "../../components/layout/scrollnavigation/ScrollNavigation";
// Import the specific stylesheet for this page
import "./HomePage.css";
import HeroSection from "../../components/sections/heroSection/HeroSection";
import Categories from "../../components/sections/category/Categories";
import JoinAsRetailer from "../../components/sections/joinAsRetailer/JoinAsRetailer";
import FeaturedProducts from "../../components/sections/featuredProducts/FeaturedProducts";
import Stores from "../../components/sections/stores/Stores";


const HomePage = () => {
  const sectionRefs = useRef([]);
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef(null);
  const isClickScrolling = useRef(false);

  const FooterSection = () => <></>; 

  const sectionComponents = [
    HeroSection,
    Categories,
    FeaturedProducts,
    Stores,
    JoinAsRetailer,
    FooterSection,
  ];
    const sectionCount = sectionComponents.length;



  const scrollToSection = useCallback(
    (sectionIndex) => {
      if (isClickScrolling.current) return;
      const targetIndex = Math.max(0, Math.min(sectionCount - 1, sectionIndex));

      isClickScrolling.current = true;
      sectionRefs.current[targetIndex]?.scrollIntoView({ behavior: "smooth" });

      setTimeout(() => {
        isClickScrolling.current = false;
      }, 800);
    },
    [sectionCount]
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = sectionRefs.current.indexOf(entry.target);
            if (index !== -1) {
              setActiveSection(index);
            }
          }
        });
      },
      {
        root: containerRef.current,
        threshold: 0.6,
      }
    );

    const currentRefs = sectionRefs.current;
    currentRefs.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      currentRefs.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);


  return (
    < >
    <div className="homePage">

      <Header onNavigate={scrollToSection} />
      <ScrollNavigation
        onNavigate={scrollToSection}
        activeSection={activeSection}
        sectionCount={sectionCount}
      />
      <main ref={containerRef} className="scroll-container">
        {sectionComponents.map((SectionComponent, i) => (
          <section
            key={i}
            id={`section-${i + 1}`}
            className="section"
            ref={(el) => (sectionRefs.current[i] = el)}
          >
            <div className="section-content">
              <SectionComponent />
            </div>
            {i === sectionCount - 1 && <Footer />}
          </section>
        ))}
      </main>
          </div>
    </>
  );
};

export default HomePage;

