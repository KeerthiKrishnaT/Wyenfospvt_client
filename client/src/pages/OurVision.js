import React from 'react';
import { useTranslation } from 'react-i18next';
import './OurVision.css';

const OurVision = () => {
  const { t } = useTranslation();
  return (
    <div className="our-vision-page">
      {/* Hero Section */}
      <div 
        className="vision-hero"
        style={{
          background: `url('/assets/vission1.jpg') center/cover no-repeat`
        }}
      >
        <div className="container">
          <div className="vision-title-container">
            <div className="title-line"></div>
            <h1 className="vision-title">{t('vision.title')}</h1>
            <div className="title-line"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="vision-main">
        <div className="container">
          {/* Short Description Section */}
          <div className="vision-short-description">
            <div className="description-content">
               <p>
                 {t('vision.shortDesc')}
               </p>
            </div>
          </div>
        </div>

        {/* Detailed Description Section - Full Width */}
        <div className="vision-detailed-description">
          <div className="detailed-content">
             <p>
               {t('vision.detailedDesc')}
             </p>
          </div>
        </div>

        <div className="container">
          {/* Image Section */}
          <div className="vision-image-section">
            <div className="image-content">
              <img 
                src="/assets/vission2.png" 
                alt="Our Vision Visual Representation" 
                className="vision-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurVision;
