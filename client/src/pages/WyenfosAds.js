import React from 'react';
import { useTranslation } from 'react-i18next';
import './WyenfosAds.css';

const WyenfosAds = () => {
  const { t } = useTranslation();
  return (
    <div className="wyenfos-ads-page">
      {/* Hero Section */}
      <div className="ads-hero">
        <div className="container-fluid">
          <h1 className="ads-title">{t('wyenfosAds.heroTitle')}</h1>
          <div className="ads-logo-section">
            <img 
              src="/assets/Wyenfos_Ads.png" 
              alt="Wyenfos Ads Logo" 
              className="wyenfos-ads-logo"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ads-main">
        {/* New Face in Advertising Section */}
        <div className="ads-intro-section">
          <div className="container-fluid">
            <div className="intro-content">
              <div className="intro-text">
                <h2 className="intro-title">{t('wyenfosAds.newFace')}</h2>
              </div>
              <div className="intro-image">
                <img 
                  src="/assets/ads1.png" 
                  alt="Wyenfos Ads Introduction" 
                  className="ads-intro-img"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="ads-coming-soon">
          <div className="container-fluid">
            <div className="coming-soon-content">
              <img 
                src="/assets/ads2.png" 
                alt="Coming Soon" 
                className="coming-soon-img"
              />
            </div>
          </div>
        </div>


        {/* Posters Section */}
        <div className="ads-posters">
          <div className="container-fluid">
            <div className="posters-grid">
              <div className="poster-item">
                <img 
                  src="/assets/poster1.png" 
                  alt="Wyenfos Ads Poster 1" 
                  className="poster-img"
                />
              </div>
              <div className="poster-item">
                <img 
                  src="/assets/poster2.png" 
                  alt="Wyenfos Ads Poster 2" 
                  className="poster-img"
                />
              </div>
              <div className="poster-item">
                <img 
                  src="/assets/poster3.png" 
                  alt="Wyenfos Ads Poster 3" 
                  className="poster-img"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Video Section */}
        <div className="ads-video-section">
          <div className="container-fluid">
            <div className="video-content">
              <h2 className="video-title">{t('wyenfosAds.watchNow')}</h2>
              <div className="video-container">
                <video 
                  className="ads-video"
                  controls
                  autoPlay
                  loop
                  playsInline
                  poster="/assets/vectors-04-.png"
                >
                  <source 
                    src="/assets/adsvideo.mp4" 
                    type="video/mp4" 
                  />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WyenfosAds;
