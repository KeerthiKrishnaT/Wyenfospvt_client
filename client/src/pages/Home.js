import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>{t('home.welcome')}</h1>
            <p>{t('home.subtitle')}</p>
            <div className="hero-buttons">
              <Link to="/services" className="btn btn-primary">{t('home.ourServices')}</Link>
              <Link to="/contact" className="btn btn-secondary">{t('home.getStarted')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features section">
        <div className="container">
          <h2 className="section-title">{t('home.whyChoose')}</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-code"></i>
              </div>
              <h3>{t('home.modernDev')}</h3>
              <p>{t('home.modernDevDesc')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-mobile-alt"></i>
              </div>
              <h3>{t('home.responsiveDesign')}</h3>
              <p>{t('home.responsiveDesignDesc')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-rocket"></i>
              </div>
              <h3>{t('home.fastPerformance')}</h3>
              <p>{t('home.fastPerformanceDesc')}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <i className="fas fa-shield-alt"></i>
              </div>
              <h3>{t('home.secureReliable')}</h3>
              <p>{t('home.secureReliableDesc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="services-preview section">
        <div className="container">
          <h2 className="section-title">{t('services.title')}</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>{t('home.webDevelopment')}</h3>
              <p>{t('home.webDevelopmentDesc')}</p>
              <Link to="/services" className="btn">{t('home.learnMore')}</Link>
            </div>
            <div className="service-card">
              <h3>{t('home.mobileApps')}</h3>
              <p>{t('home.mobileAppsDesc')}</p>
              <Link to="/services" className="btn">{t('home.learnMore')}</Link>
            </div>
            <div className="service-card">
              <h3>{t('home.uiUxDesign')}</h3>
              <p>{t('home.uiUxDesignDesc')}</p>
              <Link to="/services" className="btn">{t('home.learnMore')}</Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section">
        <div className="container">
          <div className="cta-content">
            <h2>{t('home.readyToStart')}</h2>
            <p>{t('home.discussVision')}</p>
            <Link to="/contact" className="btn btn-primary">{t('home.contactUsToday')}</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
