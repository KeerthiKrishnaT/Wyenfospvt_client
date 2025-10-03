import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { refreshBranches } from '../services/branchLoader';
import { branchEvents } from '../services/branchEvents';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    const loadBranches = async () => {
      try {
        // Clear any cached data to ensure fresh data
        localStorage.removeItem('wyenfos_branches');
        console.log('Footer: Cleared cached branch data');
        
        // Always get fresh data from Firebase, don't use cache
        console.log('Footer: Loading fresh branches from Firebase...');
        const branchesData = await refreshBranches();
        console.log('Footer: Loaded fresh branches:', branchesData);
        setBranches(branchesData);
        
        // Set default branch (main branch or first branch)
        if (branchesData.length > 0) {
          const mainBranch = branchesData.find(branch => branch.isMain) || branchesData[0];
          console.log('Footer: Selected main branch:', mainBranch);
          console.log('Footer: Branch email:', mainBranch.email);
          console.log('Footer: Branch address:', mainBranch.address);
          console.log('Footer: Branch map embed:', mainBranch.mapEmbed);
          setSelectedBranch(mainBranch.id);
        } else {
          console.log('Footer: No branches found, using default data');
          // Set default Wyenfos data if no branches found
          const defaultBranch = {
            id: 'default',
            name: 'WYENFOS Private Limited',
            address: '1st Floor, Thekkekkara Arcade, Chelakkottukara, Uday Nagar, Junction, Thrissur, Kerala 680005',
            phone: '+91 70124 78846',
            email: 'wyenfosmd@gmail.com',
            mapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245.17636199732152!2d76.23604226857425!3d10.514698337632911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7ef81d26ffad5%3A0xecef079f3e336768!2sWYENFOS%20PVT%20LTD!5e0!3m2!1sen!2sin!4v1759068277438!5m2!1sen!2sin',
            mapLink: 'https://maps.app.goo.gl/pU37WgwaoThZ9EPz5',
            pinName: 'WYENFOS Private Limited',
            isMain: true
          };
          setBranches([defaultBranch]);
          setSelectedBranch('default');
        }
      } catch (error) {
        console.error('Error loading branches in Footer:', error);
        setBranches([]);
      }
    };

    loadBranches();

    // Listen for branch updates from admin dashboard
    const unsubscribe = branchEvents.subscribe(async () => {
      console.log('Footer: Received branch update event');
      // Refresh branches from Firebase to get latest data
      try {
        const refreshedBranches = await refreshBranches();
        console.log('Footer: Refreshed branches from Firebase:', refreshedBranches);
        setBranches(refreshedBranches);
        
        // Update selected branch if it still exists
        if (refreshedBranches.length > 0) {
          const mainBranch = refreshedBranches.find(branch => branch.isMain) || refreshedBranches[0];
          setSelectedBranch(mainBranch.id);
        }
      } catch (error) {
        console.error('Footer: Error refreshing branches:', error);
        // Fallback to regular load
        loadBranches();
      }
    });

    // Cleanup subscription on unmount
    return unsubscribe;
  }, []);

  // Convert branches array to object for easier access
  const branchesObj = branches.reduce((acc, branch) => {
    acc[branch.id] = branch;
    return acc;
  }, {});

  const currentBranch = selectedBranch ? branchesObj[selectedBranch] : null;
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          {/* Left Column - WYENFOS Branding */}
          <div className="footer-section footer-branding">
            <div className="footer-logo">
              <img 
                src="/assets/wyenfosblack.png" 
                alt="WYENFOS" 
                className="wyenfos-logo"
              />
              <p className="company-name">PRIVATE LIMITED</p>
            </div>
            <p className="company-tagline">
              WIPE YOUR EXPENDITURE NEW FORMULA OF SAVINGS
            </p>
                         <div className="social-media-icons">
               <a href="https://www.facebook.com/profile.php?id=100076123527082" target="_blank" rel="noopener noreferrer" className="social-icon facebook" aria-label="Visit our Facebook page">
                 <span><i className="fa-brands fa-square-facebook"></i></span>
               </a>
               <a href="https://www.instagram.com/wyenfosthrissur/?igsh=MWdlNmRueGx6c2sxZA%3D%3D#" target="_blank" rel="noopener noreferrer" className="social-icon instagram" aria-label="Visit our Instagram page">
                 <span><i className="fa-brands fa-instagram"></i></span>
               </a>
               <a href="https://youtube.com/@wyenfos" target="_blank" rel="noopener noreferrer" className="social-icon youtube" aria-label="Visit our YouTube channel">
                 <span><i className="fa-brands fa-youtube"></i></span>
               </a>
             </div>
          </div>

          {/* Middle Column - Quick Links */}
          <div className="footer-section footer-links">
            <h3 className="footer-heading">{t('footer.quickLinks')}</h3>
                         <ul className="footer-links-list">
               <li><Link to="/">Home</Link></li>
               <li><Link to="/about">About Us</Link></li>
               <li><Link to="/service">Services</Link></li>
               <li><Link to="/aim">Our Aim</Link></li>
               <li><Link to="/mission">Our Mission</Link></li>
               <li><Link to="/vision">Our Vision</Link></li>
               <li><Link to="/attributes">Our Key Attributes</Link></li>
               <li><Link to="/future">Our Milestone</Link></li>
               <li><Link to="/contact">Contact Us</Link></li>
               <li><Link to="/legal">Legal document</Link></li>
               <li><Link to="/companies">Our companies</Link></li>
             </ul>
          </div>

          {/* Right Column - Get in Touch */}
          <div className="footer-section footer-contact">
            <h3 className="footer-heading">{t('footer.getInTouch')}</h3>
            
            {/* Branch Selector */}
            {branches.length > 0 && (
              <div className="branch-selector">
                <label htmlFor="branch-select" className="branch-label">Select Branch</label>
                <select 
                  id="branch-select"
                  value={selectedBranch || ''} 
                  onChange={(e) => setSelectedBranch(parseInt(e.target.value))}
                  className="branch-dropdown"
                >
                  {branches.map((branch) => (
                    <option key={branch.id} value={branch.id}>
                      {branch.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {currentBranch ? (
              <>
                <div className="contact-info">
                  <p className="contact-item">
                    <strong>WYENFOS Private Limited</strong>
                  </p>
                  <p className="contact-item branch-name">
                    <strong>{currentBranch.name}</strong>
                  </p>
                  <p className="contact-item">
                    {currentBranch.address}
                  </p>
                  <p className="contact-item">
                    <strong>Phone:</strong> {currentBranch.phone}
                  </p>
                  <p className="contact-item">
                    <strong>Email:</strong> {currentBranch.email}
                  </p>
                </div>
                
                <div className="map-container">
                  <div className="google-map">
                    <iframe
                      src={currentBranch.mapEmbed}
                      width="100%"
                      height="200"
                      style={{ border: 0, borderRadius: '8px' }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={currentBranch.address}
                    ></iframe>
                    <div className="map-overlay">
                      <div className="map-pin">📍</div>
                      <p>{currentBranch.pinName}</p>
                      <a 
                        href={currentBranch.mapLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="view-map-btn"
                      >
                        View larger map
                      </a>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="no-branches">
                <p>{t('noBranches')}</p>
              </div>
            )}
          </div>
        </div>

       
        <div className="footer-bottom">
          <p className="copyright-text">
            {t('footer.copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
