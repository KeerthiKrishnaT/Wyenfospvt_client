import React from 'react';
import { useTranslation } from 'react-i18next';
import './OurKeyAttributes.css';

const OurKeyAttributes = () => {
  const { t } = useTranslation();
  return (
    <div className="our-key-attributes-page">
      {/* Hero Section */}
      <div className="key-attributes-hero-section" style={{
        backgroundImage: 'url(/assets/ourkeyattributes.jpg)',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="container-fluid">
          <h1 className="hero-title">{t('ourKeyAttributes.heroTitle')}</h1>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="key-attributes-main-section">
        <div className="container-fluid">
          <div className="attributes-content-wrapper">
            {/* Left Side - Content */}
            <div className="attributes-content">
              <h2 className="attributes-title">{t('ourKeyAttributes.heroTitle')}</h2>
              <div className="mountain-image-container">
                <img 
                  src="/assets/Mountain_crest.png" 
                  alt="Mountain Crest" 
                  className="mountain-image"
                />
              </div>
              <h3 className="crestm-title">{t('ourKeyAttributes.crestm')}</h3>
              <div className="attributes-description">
                <p>
                  <span className="attribute-letter">C</span>{t('ourKeyAttributes.customerCentric')}<br />
                  <span className="attribute-letter">R</span>{t('ourKeyAttributes.reliable')}<br />
                  <span className="attribute-letter">E</span>{t('ourKeyAttributes.efficient')}<br />
                  <span className="attribute-letter">S</span>{t('ourKeyAttributes.secure')}<br />
                  <span className="attribute-letter">T</span>{t('ourKeyAttributes.transparent')}<br />
                  <span className="attribute-letter">M</span>{t('ourKeyAttributes.modest')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Image Section */}
      <div className="key-attributes-bottom-section">
        <div className="container-fluid">
          <div className="bottom-image-container">
            <img 
              src="/assets/ourkeyattributes1.png" 
              alt="Our Key Attributes Illustration" 
              className="bottom-illustration"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurKeyAttributes;
