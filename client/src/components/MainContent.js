import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { festivalService } from '../services/firebaseService';
import { onSnapshot, collection, query, orderBy } from 'firebase/firestore';
import { db } from '../config/firebase';
import './MainContent.css';
import './MainContent-English.css';
import AppDownload from './AppDownload';
import FestivalAnimation from './FestivalAnimation';

const MainContent = () => {
  const { t, i18n } = useTranslation();
  const [showAbout, setShowAbout] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showHero, setShowHero] = useState(false);
  const [showMission, setShowMission] = useState(false);
  const [showVision, setShowVision] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);
  const [showAttributes, setShowAttributes] = useState(false);
  const [showCultural, setShowCultural] = useState(false);
  const [showMilestone, setShowMilestone] = useState(false);
  const [showCashVapase, setShowCashVapase] = useState(false);
  const [showWyenfosAdsPromo, setShowWyenfosAdsPromo] = useState(false);
  const [showCharitableTrust, setShowCharitableTrust] = useState(false);
  const [showCareers, setShowCareers] = useState(false);
  const [showCertifications, setShowCertifications] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [animationFestival, setAnimationFestival] = useState(null);
  const [previousFestivalCount, setPreviousFestivalCount] = useState(0);

  // Refs for intersection observer
  const aboutRef = useRef(null);
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  const animationRef = useRef(null);
  const attributesRef = useRef(null);
  const culturalRef = useRef(null);
  const milestoneRef = useRef(null);
  const cashVapaseRef = useRef(null);
  const wyenfosAdsPromoRef = useRef(null);
  const charitableTrustRef = useRef(null);
  const careersRef = useRef(null);
  const certificationsRef = useRef(null);

  useEffect(() => {
    // Show loading for 0.8 seconds (reduced from 1.5s), then show main content
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    // Load active festival images from Firebase - OPTIMIZED with caching
    const loadActiveFestivalImages = async () => {
      try {
        // Clear cache to force fresh data (temporary for debugging)
        const cacheKey = 'festival_images_cache';
        localStorage.removeItem(cacheKey); // Force fresh data
        const cacheTime = 5 * 60 * 1000; // 5 minutes
        const cached = null; // Force fresh fetch
        
        if (cached) {
          const { data, timestamp } = JSON.parse(cached);
          if (Date.now() - timestamp < cacheTime) {
            console.log('Using cached festival images');
            const activeImages = data.filter(img => img.isActive);
            
            if (activeImages.length > 0 && !animationFestival) {
              const newestFestival = activeImages[activeImages.length - 1];
              console.log('Triggering festival animation with cached data:', newestFestival);
              setAnimationFestival(newestFestival);
            }
            
            if (activeImages.length === 0 && previousFestivalCount > 0 && animationFestival) {
              console.log('All festival images deactivated, closing animation');
              setAnimationFestival(null);
            }
            
            setPreviousFestivalCount(activeImages.length);
            return;
          }
        }

        // Fetch fresh data from Firebase - OPTIMIZED
        console.log('Fetching fresh festival images from Firebase');
        const activeImages = await festivalService.getActiveFestivalImages();
        
        // Cache the results
        localStorage.setItem(cacheKey, JSON.stringify({
          data: activeImages,
          timestamp: Date.now()
        }));
        
        // Immediate festival display if active images exist
        if (activeImages.length > 0 && !animationFestival) {
          const newestFestival = activeImages[activeImages.length - 1];
          console.log('Triggering festival animation with:', newestFestival);
          setAnimationFestival(newestFestival);
        }
        
        // Check if all festival images are deactivated and close animation
        if (activeImages.length === 0 && previousFestivalCount > 0 && animationFestival) {
          console.log('All festival images deactivated, closing animation');
          setAnimationFestival(null);
        }
        
        setPreviousFestivalCount(activeImages.length);
      } catch (error) {
        console.error('Error loading festival images:', error);
        // Don't prevent app from loading due to festival image errors
      }
    };

    // Load festival images immediately on page load
    loadActiveFestivalImages();

    // Refresh festival images every 2 minutes (reduced from 30 seconds)
    const refreshInterval = setInterval(() => {
      loadActiveFestivalImages();
    }, 120000);

    return () => {
      clearTimeout(loadingTimer);
      clearInterval(refreshInterval);
    };
  }, [previousFestivalCount, animationFestival]);

  // Real-time listener for festival image status changes
  useEffect(() => {
    if (isLoading) return; // Don't set up listener during initial loading

    console.log('Setting up real-time festival listener...');
    
    const q = query(
      collection(db, 'festivalImages'), 
      orderBy('uploadedAt', 'desc')
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log('Real-time festival update received');
      
      const activeImages = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.isActive) {
          activeImages.push({ id: doc.id, ...data });
        }
      });
      
      console.log('Active festival images:', activeImages.length);
      
      // Update cache with fresh data
      const cacheKey = 'festival_images_cache';
      localStorage.setItem(cacheKey, JSON.stringify({
        data: activeImages,
        timestamp: Date.now()
      }));
      
      // Handle festival animation based on active images
      if (activeImages.length > 0) {
        const newestFestival = activeImages[activeImages.length - 1];
        console.log('Real-time: Triggering festival animation with:', newestFestival);
        setAnimationFestival(newestFestival);
      } else {
        console.log('Real-time: All festival images deactivated, stopping animation');
        setAnimationFestival(null);
      }
      
      setPreviousFestivalCount(activeImages.length);
    }, (error) => {
      console.error('Real-time listener error:', error);
    });

    return () => {
      console.log('Cleaning up real-time festival listener');
      unsubscribe();
    };
  }, [isLoading]);

    useEffect(() => {
    if (!isLoading) {
      // Show logo animation immediately after loading
      setTimeout(() => setShowAbout(true), 300);

      // Set up intersection observers for scroll-triggered animations
      const observerOptions = {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      };

      const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShowAbout(true);
            setTimeout(() => setShowText(true), 200);
          }
        });
      }, observerOptions);

      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShowHero(true);
          }
        });
      }, observerOptions);

      const missionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShowMission(true);
          }
        });
      }, observerOptions);

      const visionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShowVision(true);
          }
        });
      }, observerOptions);

      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShowAnimation(true);
          }
        });
      }, observerOptions);

      const attributesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShowAttributes(true);
          }
        });
      }, observerOptions);

      const culturalObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShowCultural(true);
          }
        });
      }, observerOptions);

             const milestoneObserver = new IntersectionObserver((entries) => {
         entries.forEach(entry => {
           if (entry.isIntersecting) {
             setShowMilestone(true);
           }
         });
       }, observerOptions);

       const cashVapaseObserver = new IntersectionObserver((entries) => {
         entries.forEach(entry => {
           if (entry.isIntersecting) {
             setShowCashVapase(true);
           }
         });
       }, observerOptions);

      const wyenfosAdsPromoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShowWyenfosAdsPromo(true);
          }
        });
      }, observerOptions);

      const charitableTrustObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShowCharitableTrust(true);
          }
        });
      }, observerOptions);

      const careersObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShowCareers(true);
          }
        });
      }, observerOptions);

      const certificationsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setShowCertifications(true);
          }
        });
      }, observerOptions);

      // Observe elements
      if (aboutRef.current) aboutObserver.observe(aboutRef.current);
      if (heroRef.current) heroObserver.observe(heroRef.current);
      if (missionRef.current) missionObserver.observe(missionRef.current);
      if (visionRef.current) visionObserver.observe(visionRef.current);
      if (animationRef.current) animationObserver.observe(animationRef.current);
      if (attributesRef.current) attributesObserver.observe(attributesRef.current);
      if (culturalRef.current) culturalObserver.observe(culturalRef.current);
      if (milestoneRef.current) milestoneObserver.observe(milestoneRef.current);
      if (cashVapaseRef.current) cashVapaseObserver.observe(cashVapaseRef.current);
      if (wyenfosAdsPromoRef.current) wyenfosAdsPromoObserver.observe(wyenfosAdsPromoRef.current);
      if (charitableTrustRef.current) charitableTrustObserver.observe(charitableTrustRef.current);
      if (careersRef.current) careersObserver.observe(careersRef.current);
      if (certificationsRef.current) certificationsObserver.observe(certificationsRef.current);

      // Cleanup observers
      return () => {
        aboutObserver.disconnect();
        heroObserver.disconnect();
        missionObserver.disconnect();
        visionObserver.disconnect();
        animationObserver.disconnect();
        attributesObserver.disconnect();
        culturalObserver.disconnect();
        milestoneObserver.disconnect();
        cashVapaseObserver.disconnect();
        wyenfosAdsPromoObserver.disconnect();
        charitableTrustObserver.disconnect();
        careersObserver.disconnect();
        certificationsObserver.disconnect();
      };
    }
  }, [isLoading]);


  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="loading-dots">
          <div className="dot dot-1"></div>
          <div className="dot dot-2"></div>
          <div className="dot dot-3"></div>
          <div className="dot dot-4"></div>
        </div>
      </div>
    );
  }



  return (
    <main className="main-content" style={{ paddingTop: animationFestival ? '0' : '80px' }}>

      {/* Festival Animation - Above Main Logo */}
      {animationFestival && (
        <FestivalAnimation 
          festivalData={animationFestival}
          onComplete={() => setAnimationFestival(null)}
        />
      )}

      {/* Hero Section - Seamless connection */}
      <div className="container-fluid" style={{ marginTop: animationFestival ? '0' : '0' }}>
        <div className="row align-items-center justify-content-center min-vh-100">
          <div className="col-lg-8 col-md-10 col-sm-12 text-center">
            <div className="hero-section" style={{ marginTop: animationFestival ? '0' : '-50px' }}>
               {/* HERO LOGO SECTION - WITH FESTIVAL IMAGE SPACE */}
               <div className={`hero-logo-container mb-4 ${showAbout ? 'visible' : ''} ${animationFestival ? 'festival-active' : 'festival-inactive'}`}>
                
                
                {/* Main Wyenfos Logo */}
                <img 
                  src="/assets/wyenfos.jpeg" 
                  alt="Wyenfos Logo"
                  className={`hero-logo-image ${animationFestival ? 'festival-active' : 'festival-inactive'}`}
                />
                
              </div>
              
            </div>
          </div>
        </div>
      </div>

      {/* ISO Certification Text - Separate from About Us */}
      <div className="iso-certification-text">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-12 text-center">
              <p className="hero-description mb-0">
                {t('mainContent.isoCertified')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* About Us Section */}
      <div className="about-us-section" ref={aboutRef}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className={`col-lg-12 col-md-12 col-sm-12 slide-up-box ${showAbout ? 'visible' : ''}`}>
              <div className="about-us-box">
                <div className={`about-us-company-header slide-down-text ${showText ? 'visible' : ''}`}>
                  <img 
                    src="/assets/White_text_Wyenfos.png" 
                    alt="WYENFOS PRIVATE LIMITED" 
                    className="about-us-company-logo"
                  />
                </div>
                <div className={`about-us-company-description slide-down-text ${showText ? 'visible' : ''}`}>
                  <p>
                    {t('mainContent.aboutUsDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marketing Hero Section */}
      <div className="marketing-hero-section" ref={heroRef}>
        <div className="green-brushstroke"></div>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-11 col-sm-12">
              <div className="hero-content-wrapper">
                <div className={`kathakali-image-container ${showHero ? 'visible' : ''}`}>
                  <img 
                    src="/assets/kathakali.png" 
                    alt="Kathakali Traditional Art" 
                    className="kathakali-image"
                  />
                </div>
                <div className={`marketing-text-overlay ${showHero ? 'visible' : ''}`} lang={i18n.language}>
                  <h2 className="marketing-heading">
                    <span className="heading-line-1" style={{fontSize: '10px', lineHeight: '1.1'}}>{t('mainContent.elevateProsperity')}</span>
                    <span className={`heading-line-2 ${showHero ? 'visible' : ''}`} style={{fontSize: '10px', lineHeight: '1.1'}}>{t('mainContent.inspiringSavings')}</span>
                  </h2>
                  <p className={`marketing-subtitle ${showHero ? 'visible' : ''}`} style={{fontSize: '12px', lineHeight: '1.1'}}>{t('mainContent.transformIndia')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Aim Section */}
      <div className="our-aim-section">
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-11 col-sm-12">
              <div className={`our-aim-box ${showHero ? 'visible' : ''}`}>
                <div className="our-aim-content">
                  <div className={`our-aim-text ${showHero ? 'visible' : ''}`}>
                    <h3 className="our-aim-title">{t('mainContent.ourAim')}</h3>
                    <p className="our-aim-description">
                      {t('mainContent.ourAimDesc')}
                    </p>
                  </div>
                  <div className={`our-aim-icon ${showHero ? 'visible' : ''}`}>
                    <img 
                      src="/assets/target.png" 
                      alt="Target Icon" 
                      className="target-icon"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Mission Section */}
      <div className="our-mission-section" ref={missionRef}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-11 col-sm-12">
              <div className={`our-mission-box ${showMission ? 'visible' : ''}`}>
                <div className="our-mission-content">
                  <div className={`our-mission-illustration ${showMission ? 'visible' : ''}`}>
                    <img 
                      src="/assets/leadership.png" 
                      alt="Mission Illustration" 
                      className="mission-illustration"
                    />
                  </div>
                  <div className={`our-mission-text ${showMission ? 'visible' : ''}`}>
                    <h3 className="our-mission-title">{t('mainContent.ourMission')}</h3>
                    <p className="our-mission-description">
                      {t('mainContent.ourMissionDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Vision Section */}
      <div className="our-vision-section" ref={visionRef}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-11 col-sm-12">
              <div className={`our-vision-box ${showVision ? 'visible' : ''}`}>
                <div className="our-vision-content">
                  <div className={`our-vision-illustration ${showVision ? 'visible' : ''}`}>
                    <img 
                      src="/assets/bulb.jpg" 
                      alt="Vision Lightbulb" 
                      className="vision-illustration"
                    />
                  </div>
                  <div className={`our-vision-text ${showVision ? 'visible' : ''}`}>
                    <h3 className="our-vision-title">{t('mainContent.ourVision')}</h3>
                    <p className="our-vision-description">
                      {t('mainContent.ourVisionDesc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Animation GIF Section */}
      <div className="animation-gif-section" ref={animationRef}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-11 col-sm-12">
              <div className={`animation-gif-container ${showAnimation ? 'visible' : ''}`}>
                <img 
                  src="/assets/Animation.gif" 
                  alt="Animation" 
                  className="animation-gif"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Key Attributes Section */}
      <div className="key-attributes-section" ref={attributesRef}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-10 col-md-11 col-sm-12">
              <div className={`key-attributes-box ${showAttributes ? 'visible' : ''}`}>
                <h2 className="key-attributes-title">{t('mainContent.ourKeyAttributes')}</h2>
                <div className="key-attributes-content">
                  <div className="key-attributes-image">
                    <img 
                      src="/assets/Mountain_crest.png" 
                      alt="Mountain Landscape" 
                      className="attributes-image"
                    />
                  </div>
                  <div className="key-attributes-text">
                    <h3 className="crestm-title">{t('mainContent.crestm')}</h3>
                    <div className="attributes-list">
                      <div className="attribute-item">
                        <span className="attribute-label">C</span>{t('mainContent.customerCentric')}
                      </div>
                      <div className="attribute-item">
                        <span className="attribute-label">R</span>{t('mainContent.reliable')}
                      </div>
                      <div className="attribute-item">
                        <span className="attribute-label">E</span>{t('mainContent.efficient')}
                      </div>
                      <div className="attribute-item">
                        <span className="attribute-label">S</span>{t('mainContent.secure')}
                      </div>
                      <div className="attribute-item">
                        <span className="attribute-label">T</span>{t('mainContent.transparent')}
                      </div>
                      <div className="attribute-item">
                        <span className="attribute-label">M</span>{t('mainContent.modest')}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cultural Pride Section */}
      <div className="cultural-pride-section" ref={culturalRef}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className={`cultural-pride-box ${showCultural ? 'visible' : ''}`}>
                <div className="cultural-pride-content">
                  <div className="cultural-pride-text">
                    <h2 className="cultural-pride-title">
                      <span className="title-line-1">{t('mainContent.culturalPride')}</span>
                      <span className="title-line-2">{t('mainContent.economicRise')}</span>
                      <span className="title-line-3">{t('mainContent.lifesHighs')}</span>
                    </h2>
                  </div>
                  <div className="cultural-pride-illustration">
                    <img 
                      src="/assets/traditional-dance.png" 
                      alt="Traditional Dance" 
                      className="dance-illustration"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Milestone Section */}
      <div className="milestone-section" ref={milestoneRef}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className={`milestone-box ${showMilestone ? 'visible' : ''}`}>
                <div className="milestone-content">
                  <div className="milestone-graphic">
                  <h2 className="milestone-title">{t('mainContent.ourMilestone')}</h2>
                    <h3 className="milestone-image-heading">{t('mainContent.wyenfosAds')}</h3>
                    <img 
                      src="/assets/Wyenfos_Ads.png" 
                      alt="Wyenfos Ads" 
                      className="milestone-image"
                    />
                  </div>
                                     <div className="milestone-description">
                     <p>
                       {t('mainContent.milestoneDesc')}
                     </p>
                     <div className="hashtags">
                       <span className="hashtag clickable" onClick={() => window.location.href = '/ads'}>#WyenfosAds</span>
                       <span className="hashtag clickable" onClick={() => window.location.href = '/ads'}>#WatchAdsEarnMoney</span>
                       <span className="hashtag">#ComingSoon</span>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cash Vapase Section */}
      <div className="cash-vapase-section" ref={cashVapaseRef}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className={`cash-vapase-box ${showCashVapase ? 'visible' : ''}`}>
                <div className="cash-vapase-content">
                  <div className="cash-vapase-description">
                    <h4 className="cash-vapase-title">{t('mainContent.cashVapase')}</h4>
                    <p>
                      {t('mainContent.cashVapaseDesc1')}
                    </p>
                    <p>
                      {t('mainContent.cashVapaseDesc2')}
                    </p>
                    <p>
                      {t('mainContent.cashVapaseDesc3')}
                    </p>
                    <div className="hashtags">
                      <span className="hashtag clickable" onClick={() => window.open('https://www.google.com/search?q=%23wyenfos', '_blank')}>#Wyenfos</span>
                      <span className="hashtag clickable" onClick={() => window.open('https://www.google.com/search?q=%23cashvapase', '_blank')}>#Cash Vapase</span>
                      <span className="hashtag">#ComingSoon</span>
                    </div>
                  </div>
                  <div className="cash-vapase-graphic">
                    <h3 className="cash-vapase-image-heading">{t('mainContent.cashVapase')}</h3>
                    <img 
                      src="/assets/Cash-vapase.png" 
                      alt="Cash Vapase" 
                      className="cash-vapase-image"
                    />
                    <p className="cash-vapase-tagline">{t('mainContent.yourSavingsPartner')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wyenfos Ads Promotional Section */}
      <div className="wyenfos-ads-promo-section" ref={wyenfosAdsPromoRef}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className={`wyenfos-ads-promo-box ${showWyenfosAdsPromo ? 'visible' : ''}`}>
                <h2 className="wyenfos-ads-promo-title">
                  {t('mainContent.whyJustWatch')}
                </h2>
                <div className="wyenfos-ads-promo-content">
                  <div className="megaphone-graphic">
                    <img 
                      src="/assets/Ads_new.jpg" 
                      alt="Wyenfos Ads Promotional" 
                      className="megaphone-image"
                      onLoad={() => console.log('✅ Ads_new.jpg loaded successfully')}
                      onError={(e) => console.log('❌ Ads_new.jpg failed to load:', e)}
                    />
                  </div>
                  <div className="wyenfos-ads-promo-description">
                    <h3 className="promo-subtitle">{t('mainContent.wyenfosAdsPutsMoney')}</h3>
                    <p>
                      {t('mainContent.transformViewingTime')}
                    </p>
                    <p>
                      {t('mainContent.joinThousands')}
                    </p>
                    <div className="hashtags">
                      <span className="hashtag clickable" onClick={() => window.location.href = '/ads'}>#WyenfosAds</span>
                      <span className="hashtag clickable" onClick={() => window.location.href = '/ads'}>#EarnWhileYouWatch</span>
                      <span className="hashtag clickable" onClick={() => window.location.href = '/ads'}>#TimeIsMoney</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Wyenfos Charitable Trust Section */}
      <div className="charitable-trust-section" ref={charitableTrustRef}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className={`charitable-trust-box ${showCharitableTrust ? 'visible' : ''}`}>
                <h2 className="charitable-trust-title">
                  Wyenfos Charitable Trust
                </h2>
                <div className="charitable-trust-content">
                  <div className="charitable-trust-graphic">
                    <img 
                      src="/assets/Wyenfoscharity.png" 
                      alt="Wyenfos Charitable Trust" 
                      className="charitable-trust-image"
                    />
                  </div>
                  <div className="charitable-trust-description">
                    <h3 className="charitable-trust-subtitle">Making a Difference</h3>
                    <p>
                      The Wyenfos Charitable Trust is dedicated to creating positive social impact through education, healthcare, and community development initiatives.
                    </p>
                    <p>
                      We believe in empowering communities and fostering sustainable growth through innovative solutions and compassionate action.
                    </p>
                    <p>
                      Join us in making a meaningful difference in the lives of those who need it most.
                    </p>
                    <div className="hashtags">
                      <span className="hashtag clickable" onClick={() => alert('Coming Soon! Wyenfos Charitable Trust will be launched soon.')}>#WyenfosCharitableTrust</span>
                      <span className="hashtag clickable" onClick={() => alert('Coming Soon! Join us in making a difference.')}>#MakingADifference</span>
                      <span className="hashtag clickable" onClick={() => alert('Coming Soon! Together we can create positive change.')}>#ComingSoon</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Careers with us Section */}
      <div className="careers-section" ref={careersRef}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className={`careers-box ${showCareers ? 'visible' : ''}`}>
                <h2 className="careers-title">{t('mainContent.careersWithUs')}</h2>
                <div className="internship-banner">
                  <div className="banner-content">
                    <div className="banner-left">
                      <img 
                        src="/assets/hiring_Internship.png" 
                        alt="Hiring Interns" 
                        className="hiring-image"
                      />
                      <div className="cv-contact-info">
                        <p className="cv-text">{t('mainContent.sendYourCV')}</p>
                        <p className="cv-email">{t('mainContent.cvEmail')}</p>
                      </div>
                    </div>
               
                  </div>
                  <div className="what-we-offer">
                    <h4 className="offer-title">{t('mainContent.whatWeOffer')}</h4>
                    <ul className="offer-list">
                      <li><strong>{t('mainContent.realWorldExperience')}</strong></li>
                      <li><strong>{t('mainContent.skillDevelopment')}</strong></li>
                      <li><strong>{t('mainContent.certification')}</strong></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Certifications Section */}
      <div className="certifications-section" ref={certificationsRef}>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className={`certifications-box ${showCertifications ? 'visible' : ''}`}>
                <div className="certifications-grid">
                  <div className="certification-item">
                    <img 
                      src="/assets/egac.png" 
                      alt="EGAC Certification" 
                      className="certification-logo"
                    />
                  </div>
                  <div className="certification-item">
                    <img 
                      src="/assets/IAF.png" 
                      alt="IAF Certification" 
                      className="certification-logo"
                    />
                  </div>
                  <div className="certification-item">
                    <img 
                      src="/assets/MSME_Certificate.png" 
                      alt="MSME Certificate" 
                      className="certification-logo"
                    />
                  </div>
                  <div className="certification-item">
                    <img 
                      src="/assets/OROlogo.png" 
                      alt="ORO Logo" 
                      className="certification-logo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Apps Download Section */}
      <AppDownload />
    </main>
  );
};

export default MainContent;
