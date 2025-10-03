import React, { useEffect, useState } from "react";
import LazyImage from "./LazyImage";
import "./FestivalAnimation.css";

export default function FestivalAnimation({ festivalData, onComplete }) {
  const [show, setShow] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [particlesTriggered, setParticlesTriggered] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [hasError, setHasError] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);

  const {
    imageUrl,
    festivalName,
    description,
    particleEffect,
    descriptionColor = "#ffffff",
    descriptionFontSize = "48",
    descriptionFontFamily = "Arial, sans-serif"
  } = festivalData || {};

  // Fallback image URL if Firebase image fails to load
  const fallbackImageUrl = "https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";

  // Debug logging to check if styling values are being received (only on initial load)
  useEffect(() => {
    if (festivalData && festivalName) {
      console.log('=== FESTIVAL STYLING DEBUG ===');
      console.log('Description Color:', descriptionColor);
      console.log('Description Font Size:', descriptionFontSize);
      console.log('Description Font Family:', descriptionFontFamily);
      console.log('Festival Name:', festivalName);
      console.log('Full Festival Data:', festivalData);
      console.log('================================');
    }
  }, [festivalData, festivalName, descriptionColor, descriptionFontSize, descriptionFontFamily]);

  const wishText = description || `Happy ${festivalName}!`;

  // Smooth scroll detection with debouncing
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const scrollDifference = Math.abs(currentScrollY - lastScrollY);
          
          // Only trigger visibility changes for significant scroll movements
          if (scrollDifference > 10) {
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
              // Scrolling down and past 200px - hide festival with smooth transition
              setIsVisible(false);
            } else if (currentScrollY < lastScrollY || currentScrollY <= 100) {
              // Scrolling up or near top - show festival with smooth transition
              setIsVisible(true);
            }
            
            lastScrollY = currentScrollY;
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  // Handle festival data changes and deactivation
  useEffect(() => {
    if (festivalData) {
      console.log('Festival data received:', festivalData);
      setShow(true);
      setIsDeactivating(false);
      
      // Enhanced image preloading with progress tracking and better error handling
      if (imageUrl) {
        // Check if image is already cached
        const img = new Image();
        // Remove crossOrigin to avoid CORS issues in development
        // img.crossOrigin = 'anonymous'; // This can cause CORS issues
        img.src = imageUrl;
        
        // Simulate progress for better UX
        const progressInterval = setInterval(() => {
          setLoadingProgress(prev => {
            if (prev >= 90) return prev; // Don't go to 100% until actually loaded
            return prev + Math.random() * 15;
          });
        }, 200);
        
        // Set loading timeout
        const loadingTimeout = setTimeout(() => {
          console.log('Image loading timeout, showing content anyway');
          clearInterval(progressInterval);
          setLoadingProgress(100);
          setImageLoaded(true);
          setHasError(true); // Mark as error state
        }, 15000); // 15 second timeout
        
        img.onload = () => {
          clearTimeout(loadingTimeout);
          clearInterval(progressInterval);
          console.log('Festival image preloaded successfully');
          setLoadingProgress(100);
          setImageLoaded(true);
          setHasError(false);
        };
        
        img.onerror = () => {
          clearTimeout(loadingTimeout);
          clearInterval(progressInterval);
          console.log('Festival image failed to preload, showing content anyway');
          setLoadingProgress(100);
          setImageLoaded(true);
          setHasError(true);
        };
      } else {
        // No image URL, show content immediately
        setImageLoaded(true);
        setLoadingProgress(100);
      }
    } else {
      // Festival data is null/undefined - festival was deactivated
      console.log('Festival deactivated - starting cleanup');
      setIsDeactivating(true);
      setShow(false);
      
      // Clean up particles immediately
      const existingParticles = document.querySelectorAll('.festival-particles-container');
      existingParticles.forEach(container => {
        if (container.parentNode) {
          container.parentNode.removeChild(container);
        }
      });
      
      // Call onComplete after a short delay to allow for smooth transition
      setTimeout(() => {
        if (onComplete) {
          onComplete();
        }
      }, 500);
    }
  }, [festivalData, onComplete, imageUrl]);

  // ✨ Typewriter Effect for wishes - ENABLED (letter by letter)
  useEffect(() => {
    if (!wishText || !show) return;
    
    setDisplayedText(''); // Start with empty text
    let currentIndex = 0;
    
    const typewriterInterval = setInterval(() => {
      if (currentIndex < wishText.length) {
        setDisplayedText(wishText.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typewriterInterval);
      }
    }, 80); // 80ms delay between each letter for smoother animation
    
    return () => clearInterval(typewriterInterval);
  }, [wishText, show]);

  // 🎉 Admin-Selected Particle Effects - ENABLED with cleanup
  useEffect(() => {
    if (festivalData && !particlesTriggered && show && imageLoaded && !isDeactivating) {
      setParticlesTriggered(true);
      
      const selectedEffect = particleEffect || 'falling-stars'; // Default to falling stars
      let particleHTML = '';
      
      // Create particle effects based on admin selection
      switch (selectedEffect) {
        case 'flower-petals':
          // Flower petals falling
          for (let i = 0; i < 25; i++) {
            particleHTML += `<div class="flower-petal flower-${i + 1}">🌸</div>`;
          }
          break;
          
        case 'falling-stars':
          // Stars falling
          for (let i = 0; i < 20; i++) {
            particleHTML += `<div class="star star-${i + 1}">⭐</div>`;
          }
          break;
          
        case 'moon-lights':
          // Moon and lights
          for (let i = 0; i < 15; i++) {
            particleHTML += `<div class="moon-light moon-${i + 1}">🌙</div>`;
            particleHTML += `<div class="moon-light light-${i + 1}">✨</div>`;
          }
          break;
          
        case 'firecrackers':
          // Firecrackers
          for (let i = 0; i < 22; i++) {
            particleHTML += `<div class="firecracker firecracker-${i + 1}">💥</div>`;
          }
          break;
          
        case 'color-powder':
          // Color powders
          for (let i = 0; i < 30; i++) {
            particleHTML += `<div class="holi-color holi-${i + 1}">🎨</div>`;
          }
          break;
          
        case 'lamp-vilakku':
          // Navarathri: Floating oil lamps (vilakku)
          for (let i = 0; i < 18; i++) {
            particleHTML += `<div class="lamp-vilakku lamp-vilakku-${i + 1}">🪔</div>`;
          }
          break;
          
        case 'golden-sparkles':
          // Golden sparkles
          for (let i = 0; i < 25; i++) {
            particleHTML += `<div class="golden-sparkle sparkle-${i + 1}">✨</div>`;
          }
          break;
          
        case 'hearts':
          // Floating hearts
          for (let i = 0; i < 20; i++) {
            particleHTML += `<div class="floating-heart heart-${i + 1}">💖</div>`;
          }
          break;
          
        case 'snowflakes':
          // Snowflakes
          for (let i = 0; i < 30; i++) {
            particleHTML += `<div class="snowflake snow-${i + 1}">❄️</div>`;
          }
          break;
          
        case 'confetti':
          // Confetti
          for (let i = 0; i < 35; i++) {
            const confettiTypes = ['🎊', '🎉', '🎈', '🎁', '🌟'];
            const randomConfetti = confettiTypes[Math.floor(Math.random() * confettiTypes.length)];
            particleHTML += `<div class="confetti confetti-${i + 1}">${randomConfetti}</div>`;
          }
          break;
          
        case 'none':
          // No particles
          particleHTML = '';
          break;
          
        default:
          // Default: Stars as rain
          for (let i = 0; i < 18; i++) {
            particleHTML += `<div class="star star-${i + 1}">⭐</div>`;
          }
      }
      
      // Create particle container
      const particleContainer = document.createElement('div');
      particleContainer.className = 'festival-particles-container';
      particleContainer.innerHTML = particleHTML;
      document.body.appendChild(particleContainer);
      
      // Remove particles after animation
      setTimeout(() => {
        if (particleContainer.parentNode) {
          particleContainer.parentNode.removeChild(particleContainer);
        }
      }, 5000);
    }
    
    // Cleanup particles when festival is deactivated
    if (isDeactivating || !festivalData) {
      console.log('Cleaning up festival particles due to deactivation');
      const existingParticles = document.querySelectorAll('.festival-particles-container');
      existingParticles.forEach(container => {
        if (container.parentNode) {
          container.parentNode.removeChild(container);
        }
      });
      setParticlesTriggered(false);
    }
  }, [festivalData, particleEffect, particlesTriggered, show, imageLoaded, isDeactivating]);

  if (!festivalData || !show) return null;

  return (
      <div
        className={`festival-banner-container ${!isVisible ? 'hidden' : ''} ${!imageLoaded ? 'loading' : ''} ${isDeactivating ? 'deactivating' : ''}`}
        style={{
          background: hasError 
            ? `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${fallbackImageUrl})` 
            : `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${imageUrl || fallbackImageUrl})`
        }}
      >
      {/* Optimized image loading with lazy loading */}
      {imageUrl && (
        <LazyImage
          src={imageUrl}
          alt={festivalName}
          className="festival-lazy-image"
          onLoad={() => {
            console.log('Festival image loaded successfully');
            setImageLoaded(true);
            setHasError(false);
          }}
          onError={() => {
            console.log('Festival image failed to load');
            setHasError(true);
            setImageLoaded(true);
          }}
          style={{ 
            position: 'absolute', 
            top: '-9999px', 
            left: '-9999px',
            width: '1px',
            height: '1px',
            opacity: 0
          }}
        />
      )}

      {/* Enhanced Loading indicator with progress */}
      {!imageLoaded && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#ffd700',
            fontSize: '24px',
            fontWeight: 'bold',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            textAlign: 'center',
            zIndex: 20
          }}
        >
          <div style={{ marginBottom: '20px' }}>
            {hasError ? 'Loading Festival (Fallback Mode)...' : 'Loading Festival...'}
          </div>
          <div 
            style={{
              width: '200px',
              height: '4px',
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              borderRadius: '2px',
              overflow: 'hidden',
              margin: '0 auto'
            }}
          >
            <div 
              style={{
                width: `${loadingProgress}%`,
                height: '100%',
                backgroundColor: hasError ? '#ff6b6b' : '#ffd700',
                borderRadius: '2px',
                transition: 'width 0.3s ease-out'
              }}
            />
          </div>
          <div style={{ marginTop: '10px', fontSize: '14px', opacity: 0.8 }}>
            {Math.round(loadingProgress)}%
          </div>
        </div>
      )}

      {/* 📝 Enhanced Typewriter Text - Positioned Lower */}
      {imageLoaded && (
        <div
          className="typewriter-container"
          style={{ 
            textAlign: 'center',
            position: 'absolute',
            top: '75%', // Moved down further to 75%
            left: '55%', // Moved slightly to the right
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: '800px'
          }}
        >
        <h2
          className="festival-description-text"
        >
          {displayedText}
        </h2>
        </div>
      )}



    </div>
  );
}
