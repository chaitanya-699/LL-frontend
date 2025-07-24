import React, { useState, useRef, useEffect } from 'react';
import { retailerData } from '../../../libs/data.js';
import './JoinAsRetailer.css';

const JoinAsRetailer = React.forwardRef((props, ref) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [selectedTier, setSelectedTier] = useState('Professional');
  const [showForm, setShowForm] = useState(false);
  const modalRef = useRef(null);

  // Handle modal opening
  const openModal = (contentType) => {
    let content = {};
    
    switch(contentType) {
      case 'benefits':
        content = {
          title: 'Partnership Benefits',
          type: 'benefits',
          data: retailerData.benefits
        };
        break;
      case 'pricing':
        content = {
          title: 'Pricing Details',
          type: 'pricing', 
          data: retailerData.pricingTiers
        };
        break;
      case 'requirements':
        content = {
          title: 'Application Requirements',
          type: 'requirements',
          data: retailerData.requirements
        };
        break;
      case 'process':
        content = {
          title: 'Application Process',
          type: 'process',
          data: retailerData.applicationProcess
        };
        break;
      default:
        return;
    }
    
    setModalContent(content);
    setShowModal(true);
  };

  // Handle modal closing
  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && showModal) {
        closeModal();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [showModal]);

  // Handle form toggle
  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    <section ref={ref} id="retailer-join-section" className="retailer-join-section">
      {/* Split Layout Container */}
      <div className="retailer-main-container">
        
        {/* Left Panel - Hero Content */}
        <div className="retailer-left-panel">
          <div className="retailer-hero-content">
            <div className="retailer-badge">Partnership Program</div>
            <h1 className="retailer-main-title">{retailerData.hero.title}</h1>
            <p className="retailer-main-subtitle">{retailerData.hero.subtitle}</p>
            <p className="retailer-main-description">{retailerData.hero.description}</p>
            
            <div className="retailer-cta-container">
              <button 
                className="retailer-btn-primary"
                onClick={toggleForm}
              >
                {retailerData.hero.primaryCTA}
              </button>
              <button 
                className="retailer-btn-secondary"
                onClick={() => openModal('benefits')}
              >
                {retailerData.hero.secondaryCTA}
              </button>
            </div>

            {/* Key Stats */}
            <div className="retailer-stats-row">
              <div className="retailer-stat">
                <span className="retailer-stat-number">2000+</span>
                <span className="retailer-stat-label">Products</span>
              </div>
              <div className="retailer-stat">
                <span className="retailer-stat-number">40%</span>
                <span className="retailer-stat-label">Margins</span>
              </div>
              <div className="retailer-stat">
                <span className="retailer-stat-number">2-Day</span>
                <span className="retailer-stat-label">Delivery</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Benefits & Pricing */}
        <div className="retailer-right-panel">
          <div className="retailer-content-scroll">
            
            {/* Benefits Grid */}
            <div className="retailer-benefits-compact">
              <h3 className="retailer-section-heading">Partnership Benefits</h3>
              <div className="retailer-benefits-list">
                {retailerData.benefits.map((benefit, index) => (
                  <div key={index} className="retailer-benefit-item">
                    <div className="retailer-benefit-icon-small">{benefit.icon}</div>
                    <div className="retailer-benefit-content">
                      <h4 className="retailer-benefit-name">{benefit.title}</h4>
                      <p className="retailer-benefit-desc">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button 
                className="retailer-link-btn"
                onClick={() => openModal('benefits')}
              >
                View All Benefits →
              </button>
            </div>

            {/* Pricing Cards */}
            <div className="retailer-pricing-compact">
              <h3 className="retailer-section-heading">Choose Your Plan</h3>
              <div className="retailer-pricing-list">
                {retailerData.pricingTiers.map((tier, index) => (
                  <div 
                    key={index} 
                    className={`retailer-price-item ${tier.popular ? 'retailer-price-popular' : ''} ${selectedTier === tier.name ? 'retailer-price-selected' : ''}`}
                    onClick={() => setSelectedTier(tier.name)}
                  >
                    <div className="retailer-price-top">
                      <div className="retailer-price-header">
                        <h4 className="retailer-price-name">{tier.name}</h4>
                        {tier.popular && <span className="retailer-popular-tag">Popular</span>}
                      </div>
                      <div className="retailer-price-cost">
                        <span className="retailer-price-value">{tier.fee}</span>
                        <span className="retailer-price-term">{tier.monthly}</span>
                      </div>
                    </div>
                    <p className="retailer-price-ideal">{tier.ideal}</p>
                  </div>
                ))}
              </div>
              <button 
                className="retailer-link-btn"
                onClick={() => openModal('pricing')}
              >
                Compare All Plans →
              </button>
            </div>

            {/* Quick Actions */}
            <div className="retailer-actions-compact">
              <button 
                className="retailer-action-link"
                onClick={() => openModal('requirements')}
              >
                📋 View Requirements
              </button>
              <button 
                className="retailer-action-link"
                onClick={() => openModal('process')}
              >
                🚀 Application Process
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Registration Form (conditionally rendered) */}
      {showForm && (
        <div className="retailer-form-overlay">
          <div className="retailer-form-container">
            <button 
              className="retailer-form-close"
              onClick={toggleForm}
            >
              ×
            </button>
            <h3>Start Your Application</h3>
            <p>Selected Plan: <strong>{selectedTier}</strong></p>
            {/* Form will be implemented in a later task */}
            <div className="retailer-form-placeholder">
              <p>Registration form will be implemented in the next tasks.</p>
              <button className="retailer-cta-primary" onClick={toggleForm}>
                Close for Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal (conditionally rendered) */}
      {showModal && modalContent && (
        <div className="retailer-modal-overlay" onClick={closeModal}>
          <div 
            className="retailer-modal-container"
            onClick={(e) => e.stopPropagation()}
            ref={modalRef}
          >
            <button 
              className="retailer-modal-close"
              onClick={closeModal}
            >
              ×
            </button>
            <h3 className="retailer-modal-title">{modalContent.title}</h3>
            {/* Modal content will be implemented in a later task */}
            <div className="retailer-modal-placeholder">
              <p>Detailed {modalContent.type} content will be implemented in the next tasks.</p>
              <button className="retailer-cta-secondary" onClick={closeModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
});

export default JoinAsRetailer;