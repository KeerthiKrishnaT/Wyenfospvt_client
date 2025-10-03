import React from 'react';
import { useTranslation } from 'react-i18next';
import './About.css';

const About = () => {
  const { t } = useTranslation();
  return (
    <div className="about-page">
      {/* Hero Section with Background Image */}
      <div 
        className="about-hero"
        style={{
          backgroundImage: `url('/assets/meeting.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed',
          width: '100%',
          height: '100vh',
          minHeight: '600px'
        }}
      >
        <div className="hero-overlay"></div>
        <div className="container-fluid">
          <h1 className="about-title">{t('about.title')}</h1>
        </div>
      </div>

      {/* Who We Are Section */}
      <section className="who-we-are-section">
        <div className="container-fluid">
          <div className="who-we-are-box">
            <div className="who-we-are-content">
              <div className="who-we-are-text">
                <h2 className="section-title slide-from-top">{t('about.whoWeAre')}</h2>
                <div className="about-description slide-from-top">
                  <p>
                    {t('about.whoWeAreDesc')}
                  </p>
                </div>
              </div>
              <div className="who-we-are-image slide-from-bottom">
                <img 
                  src="/assets/group.jpg" 
                  alt="Our Team" 
                  className="group-image"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Affordable Living Section */}
      <section className="affordable-living-section">
        <div className="container-fluid">
          <div className="affordable-living-content">
            <div className="affordable-living-icon">
              <i className="fas fa-money-bill-alt"></i>
            </div>
            <div className="affordable-living-text">
              <h3>{t('about.affordableLiving')}</h3>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="about-contact-section">
        <div className="container-fluid">
          <div className="about-contact-content">
            <div className="about-contact-info">
              <div className="about-contact-icon">
                <img src="/assets/contact.png" alt="Contact Icon" className="about-contact-icon-image" />
              </div>
              <div className="about-contact-details">
                <h3>{t('about.callUs')}</h3>
                <p>{t('about.phoneNumber')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="about-certifications-section">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-11 col-sm-12">
              <div className="about-certifications-box">
                <div className="about-certifications-grid">
                  <div className="about-certification-item">
                    <img 
                      src="/assets/egac.png" 
                      alt="EGAC Certification" 
                      className="about-certification-logo"
                    />
                  </div>
                  <div className="about-certification-item">
                    <img 
                      src="/assets/IAF.png" 
                      alt="IAF Certification" 
                      className="about-certification-logo"
                    />
                  </div>
                  <div className="about-certification-item">
                    <img 
                      src="/assets/MSME_Certificate.png" 
                      alt="MSME Certificate" 
                      className="about-certification-logo"
                    />
                  </div>
                  <div className="about-certification-item">
                    <img 
                      src="/assets/OROlogo.png" 
                      alt="ORO Logo" 
                      className="about-certification-logo about-oro-logo"
                     
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;