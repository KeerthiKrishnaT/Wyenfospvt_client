import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import './LogoSlideshow.css';

const LogoSlideshow = () => {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  // Logo slideshow data
  const logoSlides = useMemo(() => [
    {
      id: 1,
      logo: "/assets/wyenfos.jpeg",
      title: "Wyenfos",
      description: t('mainContent.isoCertified'),
      backgroundColor: "#ffffff"
    },
    {
      id: 2,
      logo: "/assets/White_text_Wyenfos.png",
      title: "WYENFOS PRIVATE LIMITED",
      description: t('mainContent.aboutUsDesc'),
      backgroundColor: "#77bdbd"
    },
    {
      id: 3,
      logo: "/assets/wyenfosblack.png",
      title: "Innovation & Excellence",
      description: "Transforming India through technology and savings",
      backgroundColor: "#f8f9fa"
    }
  ], [t]);

  useEffect(() => {
    // Start logo animation immediately
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 500);

    // Start description animation after logo
    const descTimer = setTimeout(() => {
      setShowDescription(true);
    }, 1000);

    // Auto-advance slideshow every 5 seconds
    const slideshowInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % logoSlides.length);
    }, 5000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(descTimer);
      clearInterval(slideshowInterval);
    };
  }, [logoSlides]);

  const handleSlideChange = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  return (
    <div className="logo-slideshow-container">
      <div className="logo-slideshow-wrapper">
        {/* Main Logo Slide */}
        <div className={`logo-slide ${showLogo ? 'slide-down' : ''}`}>
          <div className="logo-container">
            <img 
              src={logoSlides[currentSlide].logo}
              alt={logoSlides[currentSlide].title}
              className="main-logo-image"
            />
          </div>
        </div>

        {/* Description Slide */}
        <div className={`description-slide ${showDescription ? 'slide-left' : ''}`}>
          <div className="description-container">
            <h2 className="logo-title">{logoSlides[currentSlide].title}</h2>
            <p className="logo-description">{logoSlides[currentSlide].description}</p>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="slide-indicators">
          {logoSlides.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => handleSlideChange(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Arrows */}
        <button 
          className="nav-arrow nav-arrow-left"
          onClick={() => setCurrentSlide((prevSlide) => 
            prevSlide === 0 ? logoSlides.length - 1 : prevSlide - 1
          )}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button 
          className="nav-arrow nav-arrow-right"
          onClick={() => setCurrentSlide((prevSlide) => 
            (prevSlide + 1) % logoSlides.length
          )}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default LogoSlideshow;
