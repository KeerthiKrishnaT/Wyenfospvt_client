import React from 'react';
import { useTranslation } from 'react-i18next';
import './WyenfosCharitableTrust.css';

const WyenfosCharitableTrust = () => {
  const { t } = useTranslation();
  
  return (
    <div className="charitable-trust-page">
      {/* Hero Section */}
      <div className="trust-hero">
        <div className="container-fluid">
          <div className="hero-content">
            <div className="charitable-hero-text">
              <h1 
                className="charitable-main-title" 
                style={{
                  color: '#ffffff',
                  fontSize: '3.5rem',
                  fontWeight: '700',
                  textAlign: 'center',
                  textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  margin: '20px 0',
                  display: 'block',
                  visibility: 'visible',
                  opacity: 1
                }}
              >
                WYENFOS CHARITABLE TRUST
              </h1>
              <p 
                className="charitable-main-subtitle"
                style={{
                  color: '#ffffff',
                  fontSize: '1.3rem',
                  textAlign: 'center',
                  textShadow: '1px 1px 2px rgba(0, 0, 0, 0.3)',
                  margin: '10px 0',
                  display: 'block',
                  visibility: 'visible',
                  opacity: 1
                }}
              >
                We are Making a Difference Through Compassionate Action
              </p>
            </div>
            <div className="trust-logo-section">
              <img 
                src="/assets/Wyenfoscharity.jpg" 
                alt="Wyenfos Charitable Trust" 
                className="trust-logo"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="trust-mission">
        <div className="container-fluid">
          <div className="mission-content">
            <h2 className="section-title">{t('missionTitle')}</h2>
            <p className="mission-text">{t('missionText')}</p>
            <div className="mission-highlights">
              <div className="highlight-item">
                <div className="highlight-icon">🎯</div>
                <h3>{t('focusedApproach')}</h3>
                <p>{t('focusedApproachDesc')}</p>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">🤝</div>
                <h3>{t('communityPartnership')}</h3>
                <p>{t('communityPartnershipDesc')}</p>
              </div>
              <div className="highlight-item">
                <div className="highlight-icon">💡</div>
                <h3>{t('innovativeSolutions')}</h3>
                <p>{t('innovativeSolutionsDesc')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Programs Section */}
      <div className="trust-programs">
        <div className="container-fluid">
          <h2 className="section-title">{t('programsTitle')}</h2>
          <div className="programs-grid">
            <div className="program-card">
              <div className="program-icon">📚</div>
              <h3>{t('educationProgram')}</h3>
              <p>{t('educationProgramDesc')}</p>
            </div>
            <div className="program-card">
              <div className="program-icon">🏥</div>
              <h3>{t('healthcareProgram')}</h3>
              <p>{t('healthcareProgramDesc')}</p>
            </div>
            <div className="program-card">
              <div className="program-icon">🌱</div>
              <h3>{t('environmentProgram')}</h3>
              <p>{t('environmentProgramDesc')}</p>
            </div>
            <div className="program-card">
              <div className="program-icon">👥</div>
              <h3>{t('communityProgram')}</h3>
              <p>{t('communityProgramDesc')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="trust-impact">
        <div className="container-fluid">
          <h2 className="section-title">{t('impactTitle')}</h2>
          <div className="impact-stats">
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">{t('livesImpacted')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">25+</div>
              <div className="stat-label">{t('communitiesServed')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">₹2M+</div>
              <div className="stat-label">{t('fundsDeployed')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">50+</div>
              <div className="stat-label">{t('projectsCompleted')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="trust-values">
        <div className="container-fluid">
          <h2 className="section-title">{t('valuesTitle')}</h2>
          <div className="values-content">
            <div className="values-text">
              <p>{t('valuesText')}</p>
            </div>
            <div className="values-list">
              <div className="value-item">
                <span className="value-icon">❤️</span>
                <span className="value-text">{t('compassion')}</span>
              </div>
              <div className="value-item">
                <span className="value-icon">⚖️</span>
                <span className="value-text">{t('integrity')}</span>
              </div>
              <div className="value-item">
                <span className="value-icon">🤝</span>
                <span className="value-text">{t('collaboration')}</span>
              </div>
              <div className="value-item">
                <span className="value-icon">🌟</span>
                <span className="value-text">{t('excellence')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="trust-cta">
        <div className="container-fluid">
          <div className="cta-content">
            <h2 className="cta-title">{t('ctaTitle')}</h2>
            <p className="cta-text">{t('ctaText')}</p>
            <div className="cta-buttons">
              <button className="cta-btn primary">
                {t('donateNow')}
              </button>
              <button className="cta-btn secondary">
                {t('volunteer')}
              </button>
            </div>
            <div className="contact-info">
              <p><strong>{t('contactTitle')}</strong></p>
              <p>{t('contactEmail')}</p>
              <p>{t('contactPhone')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WyenfosCharitableTrust;
