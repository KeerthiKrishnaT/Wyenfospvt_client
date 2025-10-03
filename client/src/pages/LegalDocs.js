import React from 'react';
import { useTranslation } from 'react-i18next';
import './LegalDocs.css';

const LegalDocs = () => {
  const { t } = useTranslation();
  return (
    <div className="legal-docs-page">
      {/* Hero Section */}
      <div className="legal-hero">
        <div className="container-fluid">
          <div className="hero-content">
            <h1 className="legal-title">{t('legal.heroTitle')}</h1>
            <div className="legal-icon">
              <img 
                src="/assets/legal.png" 
                alt="Legal Documents Icon" 
                className="legal-hero-icon"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="legal-main">
        {/* Introduction Section */}
        <div className="legal-intro">
          <div className="container-fluid">
            <div className="intro-content">
              <h2 className="intro-title">{t('legal.introTitle')}</h2>
              <p className="intro-description">
                {t('legal.introDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Documents Grid */}
        <div className="documents-grid">
          <div className="container-fluid">
            <div className="documents-container">
              
              {/* PAN Card Document */}
              <div className="document-item">
                <div className="document-header">
                  <h3 className="document-title">{t('legal.panCard')}</h3>
                  <p className="document-description">
                    {t('legal.panCardDesc')}
                  </p>
                </div>
                <div className="document-image">
                  <img 
                    src="/assets/Wyenfos-pan-card_-01-1086.png" 
                    alt="WYENFOS Company PAN Card" 
                    className="legal-doc-img"
                  />
                </div>
              </div>

              {/* ISO Certificate */}
              <div className="document-item">
                <div className="document-header">
                  <h3 className="document-title">{t('legal.isoCert')}</h3>
                  <p className="document-description">
                    {t('legal.isoCertDesc')}
                  </p>
                </div>
                <div className="document-image">
                  <img 
                    src="/assets/legal1.jpg" 
                    alt="WYENFOS ISO 9001:2015 Certificate" 
                    className="legal-doc-img"
                  />
                </div>
              </div>

              {/* Certificate of Incorporation */}
              <div className="document-item">
                <div className="document-header">
                  <h3 className="document-title">{t('legal.incorporation')}</h3>
                  <p className="document-description">
                    {t('legal.incorporationDesc')}
                  </p>
                </div>
                <div className="document-image">
                  <img 
                    src="/assets/legal2.jpg" 
                    alt="WYENFOS Certificate of Incorporation" 
                    className="legal-doc-img"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Company Information Section */}
        <div className="company-info">
          <div className="container-fluid">
            <div className="info-content">
              <h2 className="info-title">{t('legal.companyInfo')}</h2>
              <div className="info-grid">
                <div className="info-item">
                  <h4 className="info-label">{t('legal.companyName')}:</h4>
                  <p className="info-value">{t('legal.companyNameValue')}</p>
                </div>
                <div className="info-item">
                  <h4 className="info-label">{t('legal.cin')}:</h4>
                  <p className="info-value">U74900KL2021PTC067222</p>
                </div>
                <div className="info-item">
                  <h4 className="info-label">{t('legal.pan')}:</h4>
                  <p className="info-value">AACCW8671Q</p>
                </div>
                <div className="info-item">
                  <h4 className="info-label">{t('legal.incorporationDate')}:</h4>
                  <p className="info-value">{t('legal.incorporationDateValue')}</p>
                </div>
                <div className="info-item">
                  <h4 className="info-label">{t('legal.registeredAddress')}:</h4>
                  <p className="info-value">
                    {t('legal.registeredAddressValue')}
                  </p>
                </div>
                <div className="info-item">
                  <h4 className="info-label">{t('legal.isoCertification')}:</h4>
                  <p className="info-value">{t('legal.isoCertificationValue')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Notice Section */}
        <div className="legal-notice">
          <div className="container-fluid">
            <div className="notice-content">
              <h2 className="notice-title">{t('legal.legalNotice')}</h2>
              <div className="notice-text">
                <p>
                  {t('legal.legalNoticeText1')}
                </p>
                <p>
                  {t('legal.legalNoticeText2')}
                </p>
                <p>
                  {t('legal.legalNoticeText3')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LegalDocs;
