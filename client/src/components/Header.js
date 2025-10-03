import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

// WordPress Admin Header Component
// Following WordPress admin header structure and patterns
const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isFutureOutlookOpen, setIsFutureOutlookOpen] = useState(false);
  const [isMilestoneOpen, setIsMilestoneOpen] = useState(false);
  const [isMobileFutureOutlookOpen, setIsMobileFutureOutlookOpen] = useState(false);
  const [isMobileMilestoneOpen, setIsMobileMilestoneOpen] = useState(false);
  const dropdownRef = useRef(null);
  const milestoneRef = useRef(null);

  const toggleMenu = () => {
    console.log('🔴 Toggle menu clicked, current state:', isMenuOpen);
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    console.log('🟢 Menu state should be:', newMenuState);
    console.log('🟡 Mobile menu toggle button should be visible on screens ≤1024px');
    
    // Prevent body scroll when mobile menu is open
    if (newMenuState) {
      document.body.classList.add('mobile-menu-open');
      console.log('🟢 Mobile menu opened - body scroll locked');
      // Close all dropdowns when opening mobile menu
      setIsFutureOutlookOpen(false);
      setIsMilestoneOpen(false);
      setIsMobileFutureOutlookOpen(false);
      setIsMobileMilestoneOpen(false);
    } else {
      document.body.classList.remove('mobile-menu-open');
      console.log('🔴 Mobile menu closed - body scroll restored');
      // Close mobile dropdowns when closing menu
      setIsMobileFutureOutlookOpen(false);
      setIsMobileMilestoneOpen(false);
    }
  };


  const toggleFutureOutlook = () => {
    console.log('🟢 Toggle Future Outlook clicked, current state:', isFutureOutlookOpen);
    setIsFutureOutlookOpen(!isFutureOutlookOpen);
    setIsMilestoneOpen(false); // Close milestone when opening future outlook
  };

  const toggleMilestone = () => {
    setIsMilestoneOpen(!isMilestoneOpen);
  };


  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFutureOutlookOpen(false);
      }
      if (milestoneRef.current && !milestoneRef.current.contains(event.target)) {
        setIsMilestoneOpen(false);
      }
    };

    const handleResize = () => {
      // Close mobile menu on resize to desktop
      if (window.innerWidth > 1024) {
        setIsMenuOpen(false);
      }
    };

    // Suppress ResizeObserver loop warnings
    const originalError = console.error;
    console.error = (...args) => {
      if (typeof args[0] === 'string' && args[0].includes('ResizeObserver loop completed with undelivered notifications')) {
        return;
      }
      originalError.apply(console, args);
    };

    document.addEventListener('mousedown', handleClickOutside);
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
      // Clean up body class on unmount
      document.body.classList.remove('mobile-menu-open');
      // Restore original console.error
      console.error = originalError;
    };
  }, []);

  // Simplified dropdown management - only close on navigation

  // Simulate WordPress admin functionality
  useEffect(() => {
    // You can integrate with your AuthContext here
    // setCurrentUser(auth.currentUser);
    
    // Simulate notifications (replace with real data)
    setNotifications([
      { id: 1, type: 'success', message: 'Welcome to Wyenfos Admin' },
      { id: 2, type: 'info', message: 'System is running smoothly' }
    ]);
  }, []);

  return (
    <>
      {/* WordPress-style admin notices */}
      <div id="wpbody-content" className="wpbody-content">
        {notifications.map(notice => (
          <div key={notice.id} className={`notice notice-${notice.type}`}>
            <p>{notice.message}</p>
          </div>
        ))}
      </div>

      {/* Main Header - Similar to WordPress admin header */}
      <header className="header wp-header" id="header">
        <div className="header-container">
          
          {/* Logo Section - Similar to WordPress admin logo */}
          <div className="logo wp-logo" onClick={() => window.location.reload()} style={{ cursor: 'pointer' }}>
            <div className="logo-icon">
              <img 
                src="/assets/wyenfos.jpeg"  
                alt="Wyenfos Logo" 
                className="logo-image"
                onLoad={() => console.log('Header logo loaded successfully')}
                onError={(e) => console.error('Header logo failed to load:', e)}
                style={{ 
                  display: 'block',
                  opacity: 1,
                  visibility: 'visible'
                }}
              />
            </div>
            <div className="logo-text">
              <div className="company-name">WYENFOS</div>
              <div className="company-type">PRIVATE LIMITED</div>
            </div>
          </div>

          {/* Navigation - Similar to WordPress admin navigation */}
          <nav className={`navigation wp-navigation ${isMenuOpen ? 'active' : ''}`}>
            <ul className="nav-menu">
              <li><Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>HOME</Link></li>
              <li><Link to="/about" className={`nav-link ${location.pathname === '/about' ? 'active' : ''}`}>ABOUT US</Link></li>
              <li><Link to="/service" className={`nav-link ${location.pathname === '/service' ? 'active' : ''}`}>SERVICES</Link></li>
              <li className="dropdown" ref={dropdownRef}>
                <div 
                  className="nav-link dropdown-toggle"
                  onClick={(e) => {
                    e.preventDefault();
                    toggleFutureOutlook();
                  }}
                >
                  FUTURE OUTLOOK
                  <span className={`dropdown-arrow ${isFutureOutlookOpen ? 'active' : ''}`}>▼</span>
                </div>
                {isFutureOutlookOpen && (
                  <div className="vertical-dropdown">
                    <div className="dropdown-section">
                      <Link 
                        to="/aim" 
                        className="vertical-dropdown-item"
                        onClick={() => {
                          setIsFutureOutlookOpen(false);
                          setIsMilestoneOpen(false);
                        }}
                      >
                        Our Aim
                      </Link>
                      <Link 
                        to="/mission" 
                        className="vertical-dropdown-item"
                        onClick={() => {
                          setIsFutureOutlookOpen(false);
                          setIsMilestoneOpen(false);
                        }}
                      >
                        Our Mission
                      </Link>
                      <Link 
                        to="/vision" 
                        className="vertical-dropdown-item"
                        onClick={() => {
                          setIsFutureOutlookOpen(false);
                          setIsMilestoneOpen(false);
                        }}
                      >
                        Our Vision
                      </Link>
                      <div className="milestone-section">
                        <button 
                          className="milestone-toggle-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleMilestone();
                          }}
                        >
                          Our Milestone
                          <span className={`header-milestone-arrow ${isMilestoneOpen ? 'expanded' : ''}`}>▶</span>
                        </button>
                        {isMilestoneOpen && (
                          <div className="milestone-submenu">
                            <Link 
                              to="/wyenfos-ads" 
                              className="milestone-item"
                              onClick={() => {
                                setIsMilestoneOpen(false);
                                setIsFutureOutlookOpen(false);
                              }}
                            >
                              Wyenfos Ads
                            </Link>
                            <Link 
                              to="/cash-vapase" 
                              className="milestone-item"
                              onClick={() => {
                                setIsMilestoneOpen(false);
                                setIsFutureOutlookOpen(false);
                              }}
                            >
                              Cash Vapase
                            </Link>
                            <Link 
                              to="/charitable-trust" 
                              className="milestone-item"
                              onClick={() => {
                                setIsMilestoneOpen(false);
                                setIsFutureOutlookOpen(false);
                              }}
                            >
                              Charitable Trust
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="dropdown-section">
                      <Link 
                        to="/attributes" 
                        className="vertical-dropdown-item"
                        onClick={() => {
                          setIsFutureOutlookOpen(false);
                          setIsMilestoneOpen(false);
                        }}
                      >
                        Our Key Attributes
                      </Link>
                      <Link 
                        to="/legal" 
                        className="vertical-dropdown-item"
                        onClick={() => {
                          setIsFutureOutlookOpen(false);
                          setIsMilestoneOpen(false);
                        }}
                      >
                        Legal Docs
                      </Link>
                      <Link 
                        to="/companies" 
                        className="vertical-dropdown-item"
                        onClick={() => {
                          setIsFutureOutlookOpen(false);
                          setIsMilestoneOpen(false);
                        }}
                      >
                        Our Companies
                      </Link>
                    </div>
                  </div>
                )}
              </li>
              <li><Link to="/contact" className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}>CONTACT US</Link></li>
              <li className="language-selector-nav">
                <div id="google_translate_element"></div>
              </li>
            </ul>
          </nav>

          {/* Admin Bar - Similar to WordPress admin bar */}
          <div className="admin-bar">
            {/* Admin bar content can go here in the future */}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className={`mobile-menu-toggle ${isMenuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
            style={{
              display: window.innerWidth <= 1024 ? 'flex' : 'none',
              position: 'absolute',
              right: '15px',
              top: '50%',
              transform: 'translateY(-50%)',
              zIndex: 10001,
              background: 'linear-gradient(135deg, #d32f2f, #b71c1c)',
              border: '3px solid #ffffff',
              borderRadius: '8px',
              width: '48px',
              height: '48px',
              cursor: 'pointer'
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        console.log('🟢 Rendering mobile menu overlay - isMenuOpen:', isMenuOpen),
        <div 
          className="mobile-menu-overlay" 
          onClick={toggleMenu}
          style={{
            display: 'flex',
            visibility: 'visible',
            opacity: 1,
            zIndex: 100000,
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0, 0, 0, 0.5)',
            pointerEvents: 'auto'
          }}
        >
          <div 
            className="mobile-menu-content" 
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              visibility: 'visible',
              opacity: 1,
              zIndex: 100001,
              position: 'relative',
              background: '#ffffff',
              width: '300px',
              height: '100vh',
              transform: 'translateX(0)',
              pointerEvents: 'auto'
            }}
          >
            <div className="mobile-menu-header">
              <div className="mobile-logo">
                <img 
                  src="/assets/wyenfos.jpeg" 
                  alt="Wyenfos Logo"
                  onLoad={() => console.log('Mobile logo loaded successfully')}
                  onError={(e) => console.error('Mobile logo failed to load:', e)}
                  style={{ 
                    display: 'block',
                    opacity: 1,
                    visibility: 'visible'
                  }}
                />
                <span>WYENFOS</span>
              </div>
              <button className="mobile-menu-close" onClick={toggleMenu}>
                ×
              </button>
            </div>
            <nav className="mobile-nav">
              <ul className="mobile-nav-menu">
                <li><Link to="/" className="mobile-nav-link" onClick={toggleMenu}>HOME</Link></li>
                <li><Link to="/about" className="mobile-nav-link" onClick={toggleMenu}>ABOUT US</Link></li>
                <li><Link to="/service" className="mobile-nav-link" onClick={toggleMenu}>SERVICES</Link></li>
                <li>
                  <button 
                    className="mobile-nav-link"
                    onClick={() => {
                      setIsMobileFutureOutlookOpen(!isMobileFutureOutlookOpen);
                    }}
                    style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left' }}
                  >
                    FUTURE OUTLOOK {isMobileFutureOutlookOpen ? '▲' : '▼'}
                  </button>
                  {isMobileFutureOutlookOpen && (
                    <ul className="mobile-dropdown-menu">
                      <li><Link to="/aim" className="mobile-nav-link" onClick={toggleMenu}>Our Aim</Link></li>
                      <li><Link to="/mission" className="mobile-nav-link" onClick={toggleMenu}>Our Mission</Link></li>
                      <li><Link to="/vision" className="mobile-nav-link" onClick={toggleMenu}>Our Vision</Link></li>
                      <li>
                        <button 
                          className="mobile-milestone-button"
                          onClick={() => {
                            setIsMobileMilestoneOpen(!isMobileMilestoneOpen);
                          }}
                        >
                          Our Milestone {isMobileMilestoneOpen ? '▲' : '▼'}
                        </button>
                        {isMobileMilestoneOpen && (
                          <ul className="mobile-submenu">
                            <li><Link to="/wyenfos-ads" className="mobile-nav-link" onClick={toggleMenu}>Wyenfos Ads</Link></li>
                            <li><Link to="/cash-vapase" className="mobile-nav-link" onClick={toggleMenu}>Cash Vapase</Link></li>
                            <li><Link to="/charitable-trust" className="mobile-nav-link" onClick={toggleMenu}>Charitable Trust</Link></li>
                          </ul>
                        )}
                      </li>
                      <li><Link to="/attributes" className="mobile-nav-link" onClick={toggleMenu}>Our Key Attributes</Link></li>
                      <li><Link to="/legal" className="mobile-nav-link" onClick={toggleMenu}>Legal Docs</Link></li>
                      <li><Link to="/companies" className="mobile-nav-link" onClick={toggleMenu}>Our Companies</Link></li>
                    </ul>
                  )}
                </li>
                <li><Link to="/contact" className="mobile-nav-link" onClick={toggleMenu}>CONTACT US</Link></li>
                <li className="mobile-language-selector">
                  <div id="google_translate_element_mobile"></div>
                </li>
              </ul>
            </nav>
            <div className="mobile-menu-footer">
              {/* Language selector moved to navigation */}
            </div>
          </div>
        </div>
      )}

      {/* WordPress-style admin notices container */}
      <div id="wpbody-content" className="wpbody-content">
        <div className="wrap">
          {/* Additional admin content can go here */}
        </div>
      </div>
    </>
  );
};

export default Header;
