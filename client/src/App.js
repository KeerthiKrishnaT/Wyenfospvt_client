import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import './components/MainContent.css';
import MainContent from './components/MainContent';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import OurAim from './pages/OurAim';
import OurMission from './pages/OurMission';
import OurVision from './pages/OurVision';
import WyenfosAds from './pages/WyenfosAds';
import CashVapase from './pages/CashVapase';
import WyenfosCharitableTrust from './pages/WyenfosCharitableTrust';
import OurKeyAttributes from './pages/OurKeyAttributes';
import LegalDocs from './pages/LegalDocs';
import OurCompanies from './pages/OurCompanies';
import Footer from './components/Footer';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ResetPassword from './pages/admin/ResetPassword';
import ChangeEmail from './pages/admin/ChangeEmail';
import ProtectedRoute from './components/ProtectedRoute';

// Layout wrapper to conditionally render Header/Footer
const LayoutWrapper = () => {
  const location = useLocation();
  const [isMenuOpen] = useState(false);
  
  
  // Prevent body scroll when mobile menu is open
  React.useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);
  
  // Check if current route is admin route
  const isAdminRoute = location.pathname.includes('/admin/hvcxyctdsyt/jhguyiu');
  
  if (isAdminRoute) {
    return (
      <Routes>
        <Route path="/admin/hvcxyctdsyt/jhguyiu/login" element={<AdminLogin />} />
        <Route path="/admin/hvcxyctdsyt/jhguyiu/reset-password" element={<ResetPassword />} />
        <Route path="/admin/hvcxyctdsyt/jhguyiu/change-email" element={<ChangeEmail />} />
        <Route
          path="/admin/hvcxyctdsyt/jhguyiu/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    );
  }
  
  return (
    <div className="App">
      {/* Main Wrapper - Similar to #wpwrap in WordPress admin */}
      <div id="app-wrap" className="app-wrap">
        
        {/* Header Section - Matching the design */}
        <Header />

        {/* Content Wrapper - Similar to #wpcontent in WordPress admin */}
        <div id="app-content" className="app-content">
          
          {/* Body Section - Similar to #wpbody in WordPress admin */}
          <div id="app-body" className="app-body" role="main">
            
            {/* Body Content - Similar to #wpbody-content in WordPress admin */}
            <div id="app-body-content" className="app-body-content">
              
              {/* Routes */}
              <Routes>
                <Route path="/" element={<MainContent />} />
                <Route path="/about" element={<About />} />
                <Route path="/service" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/aim" element={<OurAim />} />
                <Route path="/mission" element={<OurMission />} />
                <Route path="/vision" element={<OurVision />} />
                <Route path="/wyenfos-ads" element={<WyenfosAds />} />
                <Route path="/cash-vapase" element={<CashVapase />} />
                <Route path="/charitable-trust" element={<WyenfosCharitableTrust />} />
                <Route path="/attributes" element={<OurKeyAttributes />} />
                <Route path="/legal" element={<LegalDocs />} />
                <Route path="/companies" element={<OurCompanies />} />
                <Route path="/future" element={<div className="future-page"><h1>Future Outlook</h1><p>Coming Soon...</p></div>} />
                <Route path="/more" element={<div className="more-page"><h1>More</h1><p>Coming Soon...</p></div>} />
              </Routes>

            </div>
          </div>
        </div>

        {/* Footer Section - Similar to #wpfooter in WordPress admin */}
        <div id="app-footer" className="app-footer" role="contentinfo">
          <Footer />
        </div>

      </div>
    </div>
  );
};

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/*" element={<LayoutWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;