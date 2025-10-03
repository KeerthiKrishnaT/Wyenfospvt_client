import React from 'react';
import { useTranslation } from 'react-i18next';
import './OurAim.css';

const OurAim = () => {
  const { t } = useTranslation();
  return (
    <div className="our-aim-page">
      {/* Hero Section */}
      <div 
        className="aim-hero"
        style={{
          background: `url('/assets/OurAim.jpg') center/cover no-repeat`
        }}
      >
                 <div className="container">
           <div className="aim-title-container">
             <div className="title-line"></div>
             <h1 className="aim-title">{t('aim.title')}</h1>
             <div className="title-line"></div>
           </div>
         </div>
      </div>

             {/* Main Content */}
       <div className="aim-main">
         <div className="container">
           {/* Short Description Section */}
           <div className="aim-short-description">
             <div className="description-content">
               <p>
                 {t('aim.shortDesc')}
               </p>
             </div>
           </div>
         </div>

         {/* Detailed Description Section - Full Width */}
         <div className="aim-detailed-description">
           <div className="detailed-content">
             <p>
               {t('aim.detailedDesc')}
             </p>
           </div>
         </div>

         <div className="container">
           {/* Image Section */}
           <div className="aim-image-section">
             <div className="image-content">
               <img 
                 src="/assets/vectors-04-.png" 
                 alt="Our Aim Visual Representation" 
                 className="aim-image"
               />
             </div>
           </div>
         </div>
       </div>
    </div>
  );
};

export default OurAim;
