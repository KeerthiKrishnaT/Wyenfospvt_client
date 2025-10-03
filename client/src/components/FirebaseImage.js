import React, { useState, useEffect } from 'react';

const FirebaseImage = ({ 
  src, 
  alt, 
  style, 
  onLoad, 
  onError, 
  fallbackStyle,
  className 
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;

  useEffect(() => {
    if (!src) {
      setHasError(true);
      return;
    }

    setImageLoaded(false);
    setHasError(false);

    // Create a new image element for preloading
    const img = new Image();
    
    const handleLoad = () => {
      setImageLoaded(true);
      setHasError(false);
      if (onLoad) onLoad();
    };

    const handleError = () => {
      console.warn(`Failed to load image: ${src}`);
      
      // Retry logic
      if (retryCount < maxRetries) {
        console.log(`Retrying image load (${retryCount + 1}/${maxRetries})`);
        setTimeout(() => {
          setRetryCount(prev => prev + 1);
        }, 1000 * (retryCount + 1)); // Exponential backoff
        return;
      }

      setHasError(true);
      setImageLoaded(true);
      if (onError) onError();
    };

    img.onload = handleLoad;
    img.onerror = handleError;
    
    // Add timestamp to bypass cache if retrying
    const imageUrl = retryCount > 0 ? `${src}?retry=${retryCount}&t=${Date.now()}` : src;
    img.src = imageUrl;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, retryCount, onLoad, onError, maxRetries]);

  // Reset retry count when src changes
  useEffect(() => {
    setRetryCount(0);
  }, [src]);

  if (!src) {
    return null;
  }

  if (hasError) {
    return (
      <div 
        style={{
          ...style,
          ...fallbackStyle,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#f0f0f0',
          color: '#666',
          fontSize: '14px'
        }}
        className={className}
      >
        Image unavailable
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      style={{
        ...style,
        opacity: imageLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out'
      }}
      className={className}
      onLoad={() => {
        setImageLoaded(true);
        if (onLoad) onLoad();
      }}
      onError={() => {
        setHasError(true);
        if (onError) onError();
      }}
    />
  );
};

export default FirebaseImage;
