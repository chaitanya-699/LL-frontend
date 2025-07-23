import React, { useState, useEffect } from 'react';
import './AgeVerificationModal.css';

const AgeVerificationModal = ({ onVerify }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // Add animation delay for smooth entrance
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleAnswer = (isOfAge) => {
    setSelectedAnswer(isOfAge);
    
    if (isOfAge) {
      // Store verification in localStorage to remember for session
      localStorage.setItem('ageVerified', 'true');
      localStorage.setItem('ageVerifiedDate', new Date().toISOString());
      
      // Smooth exit animation
      setShowAnimation(false);
      setTimeout(() => {
        setIsVisible(false);
        onVerify(true);
      }, 300);
    } else {
      // Show age restriction message
      setTimeout(() => {
        setShowAnimation(false);
        setTimeout(() => {
          onVerify(false);
        }, 300);
      }, 1000);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`age-modal-overlay ${showAnimation ? 'age-modal-overlay--visible' : ''}`}>
      <div className={`age-modal ${showAnimation ? 'age-modal--visible' : ''}`}>
        <div className="age-modal-content">
          {selectedAnswer === null ? (
            <>
              {/* Logo/Brand */}
              <div className="age-modal-logo">
                <div className="logo-icon">🍷</div>
                <h1 className="logo-text">LiquorLink</h1>
              </div>

              {/* Age Verification Content */}
              <div className="age-modal-body">
                <h2 className="age-modal-title">Age Verification Required</h2>
                <p className="age-modal-description">
                  You must be of legal drinking age to access this website. 
                  Please confirm that you are 21 years or older.
                </p>

                <div className="age-modal-question">
                  <h3>Are you 21 years or older?</h3>
                </div>

                <div className="age-modal-buttons">
                  <button 
                    className="age-btn age-btn--yes"
                    onClick={() => handleAnswer(true)}
                  >
                    <span className="btn-icon">✓</span>
                    <span className="btn-text">Yes, I am 21+</span>
                  </button>
                  
                  <button 
                    className="age-btn age-btn--no"
                    onClick={() => handleAnswer(false)}
                  >
                    <span className="btn-icon">✗</span>
                    <span className="btn-text">No, I am under 21</span>
                  </button>
                </div>

                <div className="age-modal-disclaimer">
                  <p>
                    By clicking "Yes", you certify that you are of legal drinking age 
                    in your jurisdiction and agree to our terms of service.
                  </p>
                </div>
              </div>
            </>
          ) : selectedAnswer === false ? (
            <div className="age-restriction-content">
              <div className="restriction-icon">🚫</div>
              <h2 className="restriction-title">Access Restricted</h2>
              <p className="restriction-message">
                Sorry, you must be 21 years or older to access this website.
              </p>
              <p className="restriction-submessage">
                Please come back when you reach the legal drinking age.
              </p>
              <div className="restriction-links">
                <a href="https://www.responsibility.org/" target="_blank" rel="noopener noreferrer" className="info-link">
                  Learn about Responsible Drinking
                </a>
              </div>
            </div>
          ) : (
            <div className="age-success-content">
              <div className="success-icon">🎉</div>
              <h2 className="success-title">Welcome!</h2>
              <p className="success-message">Thank you for verifying your age.</p>
              <div className="loading-spinner"></div>
            </div>
          )}
        </div>

        {/* Decorative Elements */}
        <div className="age-modal-decorations">
          <div className="decoration decoration--1"></div>
          <div className="decoration decoration--2"></div>
          <div className="decoration decoration--3"></div>
        </div>
      </div>
    </div>
  );
};

export default AgeVerificationModal;