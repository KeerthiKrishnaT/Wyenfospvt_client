import React, { useState, useRef, useEffect } from 'react';

const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholder = null,
  onLoad = null,
  onError = null,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px'
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };

  const handleError = () => {
    setHasError(true);
    if (onError) onError();
  };

  return (
    <div ref={imgRef} className={`lazy-image-container ${className}`} {...props}>
      {isInView && (
        <>
          {!isLoaded && !hasError && (
            <div className="lazy-image-placeholder">
              {placeholder || (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <span>Loading...</span>
                </div>
              )}
            </div>
          )}
          
          {hasError ? (
            <div className="lazy-image-error">
              <div className="error-icon">⚠️</div>
              <span>Failed to load image</span>
            </div>
          ) : (
            <img
              src={src}
              alt={alt}
              className={`lazy-image ${isLoaded ? 'loaded' : 'loading'}`}
              onLoad={handleLoad}
              onError={handleError}
              style={{
                opacity: isLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out'
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default LazyImage;
