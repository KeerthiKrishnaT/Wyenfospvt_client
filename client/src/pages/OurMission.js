import React from 'react';
import { useTranslation } from 'react-i18next';
import './OurMission.css';

const OurMission = () => {
  const { t } = useTranslation();
  return (
    <div className="our-mission-page">
      {/* Hero Section */}
      <div 
        className="mission-hero"
        style={{
          background: `url('/assets/mission2.jpg') center/cover no-repeat`
        }}
      >
        <div className="container">
          <div className="mission-title-container">
            <div className="title-line"></div>
            <h1 className="mission-title">{t('mission.title')}</h1>
            <div className="title-line"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mission-main">
        <div className="container">
          {/* Short Description Section */}
          <div className="mission-short-description">
            <div className="description-content">
               <p>
                 {t('mission.shortDesc')}
               </p>
            </div>
          </div>
        </div>

        {/* Detailed Description Section - Full Width */}
        <div className="mission-detailed-description">
          <div className="detailed-content">
             <p>
               {t('mission.detailedDesc')}
             </p>
          </div>
        </div>

        <div className="container">
          {/* Image Section */}
          <div className="mission-image-section">
            <div className="image-content">
              <img 
                src="/assets/mission1.png" 
                alt="Our Mission Visual Representation" 
                className="mission-image"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurMission;

