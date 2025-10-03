import React from 'react';
import { useTranslation } from 'react-i18next';
import './Services.css';

const Services = () => {
  const { t } = useTranslation();
  return (
    <div className="services-page">
      {/* Hero Section */}
      <div 
        className="services-hero"
        style={{
          background: `url('/assets/service.png') left center/70% no-repeat`,
          alignContent:"left"
        }}
      >
        <div className="container-fluid">
          <h1 className="services-title">{t('services.title')}</h1>
        </div>
      </div>

      {/* Services Overview Section */}
      <div className="services-overview">
        <div className="container-fluid">
          <div className="overview-content">
            <div className="overview-image">
              <img 
                src="/assets/icon_service.png" 
                alt="Services Icon" 
                className="services-icon"
              />
            </div>
            <div className="overview-text">
              <h2 className="overview-subtitle">{t('services.ourFeature')}</h2>
              <h3 className="overview-title">{t('services.exploreServices')}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* Services Grid Section */}
      <div className="services-grid-section">
        <div className="container-fluid">
          <div className="services-grid">
            <div className="service-card">
              <div className="service-image">
                <img 
                  src="/assets/software_develop_-01.png" 
                  alt="Software Development" 
                  className="service-img"
                />
              </div>
              <div className="service-content">
                <h3 className="service-title">{t('services.softwareDevelopment')}</h3>
              </div>
            </div>

            <div className="service-card">
              <div className="service-image">
                <img 
                  src="/assets/mobile_app_develop_-01.png" 
                  alt="Mobile App Development" 
                  className="service-img"
                />
              </div>
              <div className="service-content">
                <h3 className="service-title">{t('services.mobileAppDevelopment')}</h3>
              </div>
            </div>

            <div className="service-card">
              <div className="service-image">
                <img 
                  src="/assets/Graphic_design_-01.png" 
                  alt="Graphic Design" 
                  className="service-img"
                />
              </div>
              <div className="service-content">
                <h3 className="service-title">{t('services.graphicDesigning')}</h3>
              </div>
            </div>

            <div className="service-card">
              <div className="service-image">
                <img 
                  src="/assets/Website_develop_-01.png" 
                  alt="Web Development" 
                  className="service-img"
                />
              </div>
              <div className="service-content">
                <h3 className="service-title">{t('services.webDevelopment')}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="container-fluid">
          <div className="features-content">
            <div className="features-image">
              <img 
                src="/assets/Service_2nd-01.png" 
                alt="Services Features" 
                className="features-img"
              />
            </div>
            <div className="features-list">
              <div className="feature-item">
                <div className="feature-icon">
                  <img 
                    src="/assets/Tick_mark-01.png" 
                    alt="Tick Mark" 
                    className="tick-icon"
                  />
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{t('services.empoweringNextGen')}</h3>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <img 
                    src="/assets/Tick_mark-01.png" 
                    alt="Tick Mark" 
                    className="tick-icon"
                  />
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{t('services.youthfulInnovation')}</h3>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <img 
                    src="/assets/Tick_mark-01.png" 
                    alt="Tick Mark" 
                    className="tick-icon"
                  />
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{t('services.unleashingCreativity')}</h3>
                </div>
              </div>

              <div className="feature-item">
                <div className="feature-icon">
                  <img 
                    src="/assets/Tick_mark-01.png" 
                    alt="Tick Mark" 
                    className="tick-icon"
                  />
                </div>
                <div className="feature-content">
                  <h3 className="feature-title">{t('services.webInnovation')}</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ISO Certification Section */}
      <div className="iso-section">
        <div className="container-fluid">
          <div className="iso-content">
            <div className="iso-image">
              <img 
                src="/assets/wyenfos.jpeg" 
                alt="Wyenfos Logo" 
                className="iso-logo"
              />
            </div>
            <div className="iso-text">
              <h3 className="iso-title">{t('services.isoCertified')}</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;