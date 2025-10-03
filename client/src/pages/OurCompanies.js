import React from 'react';
import { useTranslation } from 'react-i18next';
import './OurCompanies.css';

const OurCompanies = () => {
  const { t } = useTranslation();
  const companies = [
    {
      id: 1,
      name: t('ourCompanies.companies.wyenfosInfotech.name', 'Wyenfos Infotech'),
      logo: "/assets/wyenfosinfotech.png",
      description: t('ourCompanies.companies.wyenfosInfotech.description', 'Leading technology solutions provider specializing in innovative software development and digital transformation.'),
      website: "https://wyenfosinfotech.com/",
      category: t('ourCompanies.categories.technology', 'Technology')
    },
    {
      id: 2,
      name: t('ourCompanies.companies.ayur4life.name', 'Ayur4Life'),
      logo: "/assets/Ayur4life_logo.png",
      description: t('ourCompanies.companies.ayur4life.description', 'Comprehensive healthcare solutions focused on Ayurvedic treatments and holistic wellness approaches.'),
      website: "#",
      category: t('ourCompanies.categories.healthcare', 'Healthcare')
    },
    {
      id: 3,
      name: t('ourCompanies.companies.wyenfosPureDrops.name', 'Wyenfos Pure Drops'),
      logo: "/assets/wyenfos-pure-drops.png",
      description: t('ourCompanies.companies.wyenfosPureDrops.description', 'Premium water purification systems ensuring clean and safe drinking water for communities.'),
      website: "#",
      category: t('ourCompanies.categories.water', 'Water Solutions')
    },
    {
      id: 4,
      name: t('ourCompanies.companies.wyenfosGold.name', 'Wyenfos Gold'),
      logo: "/assets/wyenfos_gold.png",
      description: t('ourCompanies.companies.wyenfosGold.description', 'Exquisite jewelry and gold investment solutions with authentic craftsmanship and quality assurance.'),
      website: "#",
      category: t('ourCompanies.categories.jewelry', 'Jewelry')
    },
    {
      id: 5,
      name: t('ourCompanies.companies.cashVapase.name', 'Cash Vapase'),
      logo: "/assets/wyenfos_cash.png",
      description: t('ourCompanies.companies.cashVapase.description', 'Innovative financial services and cash management solutions for modern businesses.'),
      website: "#",
      category: t('ourCompanies.categories.financial', 'Financial Services')
    },
    {
      id: 6,
      name: t('ourCompanies.companies.wyenfosBills.name', 'Wyenfos Bills'),
      logo: "/assets/Wyenfosbills_logo.png",
      description: t('ourCompanies.companies.wyenfosBills.description', 'Digital bill management and payment solutions streamlining financial transactions.'),
      website: "#",
      category: t('ourCompanies.categories.fintech', 'Fintech')
    },
    {
      id: 7,
      name: t('ourCompanies.companies.wyenfosCharitableTrust.name', 'Wyenfos Charitable Trust'),
      logo: "/assets/Wyenfoscharity.png",
      description: t('ourCompanies.companies.wyenfosCharitableTrust.description', 'Dedicated to making a difference through compassionate action and community service initiatives.'),
      website: "#",
      category: t('ourCompanies.categories.charitable', 'Charitable Trust')
    }
  ];

  return (
    <div className="our-companies-page">
      {/* Hero Section */}
      <div className="companies-hero-section">
        <div className="container-fluid">
          <h1 className="companies-main-title">{t('ourCompanies.heroTitle', 'OUR COMPANIES')}</h1>
          <p className="companies-subtitle">{t('ourCompanies.heroSubtitle', 'Discover our diverse portfolio of innovative companies')}</p>
        </div>
      </div>

      {/* Companies Grid Section */}
      <div className="companies-grid-section">
        <div className="container-fluid">
          <div className="companies-grid">
            {companies.map((company, index) => (
              <div key={company.id} className={`company-card company-card-${index + 1}`}>
                <div className="company-logo-container">
                  <img 
                    src={company.logo} 
                    alt={`${company.name} Logo`} 
                    className="company-logo"
                  />
                </div>
                <div className="company-info">
                  <div className="company-category">{company.category}</div>
                  <h3 className="company-name">{company.name}</h3>
                  <p className="company-description">{company.description}</p>
                  {company.website !== "#" && (
                    <div className="company-link-container">
                      <a 
                        href={company.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="company-link"
                      >
{t('ourCompanies.visitWebsite', 'Visit Website')}
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Company Section - Wyenfos Infotech */}
      <div className="featured-company-section">
        <div className="container-fluid">
          <div className="featured-content">
            <h2 className="featured-title">{t('ourCompanies.featured.title', 'FEATURED COMPANY')}</h2>
            <div className="featured-company-card">
              <div className="featured-image-container">
                <a href="https://wyenfosinfotech.com/" target="_blank" rel="noopener noreferrer">
                  <img 
                    src="/assets/company1.jpg" 
                    alt="Wyenfos Infotech Team" 
                    className="featured-image"
                  />
                </a>
              </div>
              <div className="featured-info">
                <h3 className="featured-company-name">{t('ourCompanies.featured.companyName', 'Wyenfos Infotech')}</h3>
                <p className="featured-description">
                  {t('ourCompanies.featured.description', 'Leading technology solutions provider specializing in innovative software development, digital transformation, and cutting-edge IT services for businesses worldwide.')}
                </p>
                <div className="featured-button-container">
                  <a 
                    href="https://wyenfosinfotech.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="featured-button"
                  >
                    Explore Wyenfos Infotech
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurCompanies;
