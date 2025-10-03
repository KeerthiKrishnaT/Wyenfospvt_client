import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { contactService, branchService, handleFirebaseError } from '../services/firebaseService';
import './Contact.css';

const Contact = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      const branchesData = await branchService.getBranches();
      setBranches(branchesData);
      
      // Set default branch (main branch or first branch)
      if (branchesData.length > 0) {
        const mainBranch = branchesData.find(branch => branch.isMain) || branchesData[0];
        setSelectedBranch(mainBranch.id);
      }
    } catch (error) {
      console.error('Error loading branches:', error);
      setError(handleFirebaseError(error));
    }
  };

  // Convert branches array to object for easier access
  const branchesObj = branches.reduce((acc, branch) => {
    acc[branch.id] = branch;
    return acc;
  }, {});

  const currentBranch = selectedBranch ? branchesObj[selectedBranch] : null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    try {
      setIsSubmitting(true);
      setError('');
      
      // Create contact request object
      const contactRequest = {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        branchId: selectedBranch,
        branchName: currentBranch?.name || 'Main Branch'
      };
      
      // Save to Firebase
      const result = await contactService.addContactMessage(contactRequest);
      
      if (result.success) {
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        setSubmitMessage('Thank you for your message! We will get back to you soon.');
        setTimeout(() => setSubmitMessage(''), 5000);
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      setError(handleFirebaseError(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <div 
        className="contact-hero"
        style={{
          background: 'url(/assets/ContactUs.jpg) center/cover no-repeat'
        }}
      >
        <div className="container">
          <h1 className="contact-title">CONTACT US</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="contact-main">
        <div className="container">
          <div className="contact-content">
            {/* Contact Form Section */}
            <div className="contact-form-section">
              <div className="form-container">
                <h2 className="section-title">{t('getInTouch')}</h2>
                <form className="contact-form" onSubmit={handleSubmit}>
                  {/* Error Message */}
                  {error && (
                    <div className="error-message" style={{ 
                      color: 'red', 
                      backgroundColor: '#ffe6e6', 
                      padding: '10px', 
                      borderRadius: '5px', 
                      marginBottom: '20px',
                      border: '1px solid #ffcccc'
                    }}>
                      {error}
                    </div>
                  )}
                  
                  {/* Success Message */}
                  {submitMessage && (
                    <div className="success-message" style={{ 
                      color: 'green', 
                      backgroundColor: '#e6ffe6', 
                      padding: '10px', 
                      borderRadius: '5px', 
                      marginBottom: '20px',
                      border: '1px solid #ccffcc'
                    }}>
                      {submitMessage}
                    </div>
                  )}
                  
                  <div className="form-group">
                    <label htmlFor="name">{t('name')}</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">{t('email')}</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="subject">{t('subject')}</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="form-input"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="message">{t('message')}</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="10"
                      className="form-textarea"
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="submit-btn"
                    disabled={isSubmitting}
                    style={{ 
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isSubmitting ? 'Sending...' : t('sendMessage')}
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Details Section */}
            <div className="contact-details-section">
              <div className="details-container">
                <h2 className="section-title">{t('ContactDetails')}</h2>
                
                {/* Branch Selector */}
                {branches.length > 0 && (
                  <div className="branch-selector">
                    <label htmlFor="contact-branch-select" className="branch-label">{t('selectBranch')}</label>
                    <select 
                      id="contact-branch-select"
                      value={selectedBranch || ''} 
                      onChange={(e) => setSelectedBranch(parseInt(e.target.value))}
                      className="branch-dropdown"
                    >
                      {branches.map((branch) => (
                        <option key={branch.id} value={branch.id}>
                          {branch.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {currentBranch ? (
                  <>
                    <div className="contact-info">
                      <div className="info-item">
                        <p>
                          <strong>{t('companyName')}</strong><br />
                          <strong>{currentBranch.name}</strong><br />
                          {currentBranch.address}
                        </p>
                      </div>
                      
                      <div className="info-item">
                        <p>
                          <strong>{t('phone')}</strong><br />
                          <a href={`tel:${currentBranch.phone.replace(/\D/g, '')}`}>{currentBranch.phone}</a>
                        </p>
                      </div>
                      
                      <div className="info-item">
                        <p>
                          <strong>{t('email')}</strong><br />
                          <a href={`mailto:${currentBranch.email}`}>{currentBranch.email}</a>
                        </p>
                      </div>
                    </div>

                    {/* Google Maps */}
                    <div className="map-container">
                      <iframe
                        src={currentBranch.mapEmbed}
                        title={currentBranch.address}
                        width="100%"
                        height="300"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                  </>
                ) : (
                  <div className="no-branches">
                    <p>{t('noBranches')}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Care Section */}
      <div className="customer-care-section">
        <div className="container">
          <div className="customer-care-content">
            <div className="customer-care-image">
              <img 
                src="/assets/Customercare.jpg" 
                alt="Customer Care" 
                className="customer-care-img"
              />
            </div>
            <div className="customer-care-text">
              <h2 className="customer-care-title">{t('customerSupport')}</h2>
              <p className="customer-care-description">
                {t('customerSupportDesc')}
              </p>
              <div className="customer-care-features">
                <div className="feature-item">
                  <span className="feature-icon">📞</span>
                  <span className="feature-text">{t('features.helpline')}</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">💬</span>
                  <span className="feature-text">{t('features.liveChat')}</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">📧</span>
                  <span className="feature-text">{t('features.emailSupport')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call Us Section */}
      <div className="call-us-section">
        <div className="container">
          <div className="call-us-content">
            <div className="call-icon">
              <a 
                href={currentBranch ? `tel:${currentBranch.phone.replace(/\D/g, '')}` : "tel:7012478846"} 
                className="phone-icon"
              >
                <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                  <path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z"></path>
                </svg>
              </a>
            </div>
            <div className="call-content">
              <h3 className="call-title">
                <a href={currentBranch ? `tel:${currentBranch.phone.replace(/\D/g, '')}` : "tel:7012478846"}>{t('callUs')}</a>
              </h3>
              <p className="call-number">{currentBranch ? currentBranch.phone : "91+ 70124 78846"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
