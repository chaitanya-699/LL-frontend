<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import HomePage from './app/pages/HomePage'
import ProductListingPage from './app/pages/ProductListingPage'
import StoreListingPage from './app/pages/StoreListingPage'
import AgeVerificationModal from './components/AgeVerificationModal'

// Age Restriction Component
const AgeRestrictionPage = () => (
  <div className="age-restriction-page">
    <div className="restriction-container">
      <div className="restriction-content">
        <div className="restriction-icon">🚫</div>
        <h1 className="restriction-title">Access Restricted</h1>
        <p className="restriction-message">
          You must be 21 years or older to access this website.
        </p>
        <p className="restriction-submessage">
          This website contains information about alcoholic beverages and is intended for adults of legal drinking age.
        </p>
        <div className="restriction-info">
          <h3>Why do we ask for age verification?</h3>
          <ul>
            <li>Legal compliance with alcohol advertising regulations</li>
            <li>Promoting responsible drinking practices</li>
            <li>Protecting minors from alcohol-related content</li>
          </ul>
        </div>
        <div className="restriction-resources">
          <h3>Resources</h3>
          <div className="resource-links">
            <a href="https://www.responsibility.org/" target="_blank" rel="noopener noreferrer">
              Foundation for Advancing Alcohol Responsibility
            </a>
            <a href="https://www.samhsa.gov/" target="_blank" rel="noopener noreferrer">
              SAMHSA - Substance Abuse Resources
            </a>
            <a href="https://www.cdc.gov/alcohol/" target="_blank" rel="noopener noreferrer">
              CDC - Alcohol and Public Health
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function App() {
  const [isAgeVerified, setIsAgeVerified] = useState(null);
  const [showAgeModal, setShowAgeModal] = useState(false);

  useEffect(() => {
    // Check if user has already verified their age in this session
    const ageVerified = localStorage.getItem('ageVerified');
    const verificationDate = localStorage.getItem('ageVerifiedDate');

    if (ageVerified === 'true' && verificationDate) {
      // Check if verification is still valid (24 hours)
      const verifiedDate = new Date(verificationDate);
      const now = new Date();
      const hoursDiff = (now - verifiedDate) / (1000 * 60 * 60);

      if (hoursDiff < 24) {
        setIsAgeVerified(true);
      } else {
        // Clear expired verification
        localStorage.removeItem('ageVerified');
        localStorage.removeItem('ageVerifiedDate');
        setShowAgeModal(true);
      }
    } else {
      setShowAgeModal(true);
    }
  }, []);

  const handleAgeVerification = (isOfAge) => {
    setShowAgeModal(false);
    setIsAgeVerified(isOfAge);
  };

  // Show age verification modal
  if (showAgeModal) {
    return <AgeVerificationModal onVerify={handleAgeVerification} />;
  }

  // Show age restriction page if user is under 21
  if (isAgeVerified === false) {
    return <AgeRestrictionPage />;
  }

  // Show main app if age is verified or still checking
  if (isAgeVerified === true || isAgeVerified === null) {
    return (
      <Router>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/products' element={<ProductListingPage />}></Route>
          <Route path='/stores' element={<StoreListingPage />}></Route>
        </Routes>
      </Router>
    );
  }

  return null;
=======

import './App.css'
import HomePage from './pages/homepage/HomePage'

function App() {


  return (
    <>
     <HomePage className="homepage"/>
    </>
  )
>>>>>>> 7f37fea (new design)
}

export default App
