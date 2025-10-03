import React, { useState } from 'react';
import './AppDownload.css';

const AppDownload = () => {
  const [activeTab, setActiveTab] = useState('wyenfos-ads');

  const apps = {
    'wyenfos-ads': {
      name: 'Wyenfos Ads',
      tagline: 'Watch Ads, Earn Money',
      description: 'Transform your viewing time into earning time with Wyenfos Ads. Watch ads and earn real money instantly.',
      features: [
        'Earn money by watching ads',
        'Instant payment system',
        'User-friendly interface',
        'Daily earning opportunities',
        'Multiple ad categories',
        'Real-time earnings tracking'
      ],
      downloadUrl: 'https://play.google.com/store/apps/details?id=com.infotech.wyenfosads', // Wyenfos Ads Play Store URL
      qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://play.google.com/store/apps/details?id=com.infotech.wyenfosads', // QR code for Play Store
      screenshots: [
        '/assets/adsscreenshot.webp',
        '/assets/adsscreenshot1.webp',
        '/assets/adsscreenshot2.webp'
      ],
      version: '1.0.0',
      size: '25 MB',
      rating: '4.8',
      downloads: '10K+'
    },
    'cash-vapase': {
      name: 'Cash Vapase',
      tagline: 'Your Savings Partner',
      description: 'Convert your expenses into savings with our revolutionary Voucher Queue Bill Reimbursement System.',
      features: [
        'Voucher-based savings system',
        'Bill reimbursement tracking',
        'Expense to savings conversion',
        'Smart spending analytics',
        'Merchant partnerships',
        'Cashback opportunities'
      ],
      downloadUrl: '#', // Replace with actual Play Store URL
      qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NzNhMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNvbWluZyBTb29uPC90ZXh0Pgo8L3N2Zz4=', // Placeholder QR code
      screenshots: [
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIiBzdHJva2U9IiNkZGQiIHN0cm9rZS13aWR0aD0iMSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BcHAgU2NyZWVuc2hvdDwvdGV4dD4KPC9zdmc+',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIiBzdHJva2U9IiNkZGQiIHN0cm9rZS13aWR0aD0iMSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BcHAgU2NyZWVuc2hvdDwvdGV4dD4KPC9zdmc+',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIiBzdHJva2U9IiNkZGQiIHN0cm9rZS13aWR0aD0iMSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5BcHAgU2NyZWVuc2hvdDwvdGV4dD4KPC9zdmc+'
      ], // Placeholder screenshots - add real Cash Vapase screenshots when available
      version: '1.0.0',
      size: '28 MB',
      rating: '4.7',
      downloads: '5K+'
    },
    'charitable-trust': {
      name: 'Wyenfos Charitable Trust',
      tagline: 'Making a Difference',
      description: 'Join us in creating positive social impact through education, healthcare, and community development initiatives.',
      features: [
        'Support education initiatives',
        'Healthcare assistance programs',
        'Community development projects',
        'Environmental conservation efforts',
        'Transparent donation tracking',
        'Impact reporting system'
      ],
      downloadUrl: '#', // Will be updated when the trust website is created
      qrCode: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzY2NzNhMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNvbWluZyBTb29uPC90ZXh0Pgo8L3N2Zz4=', // Placeholder QR code
      screenshots: [
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIiBzdHJva2U9IiNkZGQiIHN0cm9rZS13aWR0aD0iMSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5UcnVzdCBTY3JlZW5zaG90PC90ZXh0Pgo8L3N2Zz4=',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIiBzdHJva2U9IiNkZGQiIHN0cm9rZS13aWR0aD0iMSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5UcnVzdCBTY3JlZW5zaG90PC90ZXh0Pgo8L3N2Zz4=',
        'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjhmOWZhIiBzdHJva2U9IiNkZGQiIHN0cm9rZS13aWR0aD0iMSIvPgogIDx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5UcnVzdCBTY3JlZW5zaG90PC90ZXh0Pgo8L3N2Zz4='
      ], // Placeholder screenshots - add real Charitable Trust screenshots when available
      version: '1.0.0',
      size: '30 MB',
      rating: '4.9',
      downloads: 'Coming Soon'
    }
  };

  const currentApp = apps[activeTab];

  return (
    <div className="app-download-section">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-12">
            <div className="app-download-header">
              <h2 className="section-title">Download Our Mobile Apps</h2>
              <p className="section-subtitle">
                Experience the full power of Wyenfos ecosystem on your mobile device
              </p>
            </div>

            {/* App Selection Tabs */}
            <div className="app-tabs">
              <button 
                className={`app-tab ${activeTab === 'wyenfos-ads' ? 'active' : ''}`}
                onClick={() => setActiveTab('wyenfos-ads')}
              >
                <img src="/assets/Wyenfos_Ads.png" alt="Wyenfos Ads" className="tab-icon" />
                <span>Wyenfos Ads</span>
              </button>
              <button 
                className={`app-tab ${activeTab === 'cash-vapase' ? 'active' : ''}`}
                onClick={() => setActiveTab('cash-vapase')}
              >
                <img src="/assets/Cash-vapase.png" alt="Cash Vapase" className="tab-icon" />
                <span>Cash Vapase</span>
              </button>
              <button 
                className={`app-tab ${activeTab === 'charitable-trust' ? 'active' : ''}`}
                onClick={() => setActiveTab('charitable-trust')}
              >
                <img src="/assets/Wyenfoscharity.png" alt="Wyenfos Charitable Trust" className="tab-icon" />
                <span>Charitable Trust</span>
              </button>
            </div>

            {/* App Details */}
            <div className="app-details">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="app-info">
                    <div className="app-header">
                      <h3 className="app-name">{currentApp.name}</h3>
                      <p className="app-tagline">{currentApp.tagline}</p>
                    </div>
                    
                    <p className="app-description">{currentApp.description}</p>
                    
                    <div className="app-stats">
                      <div className="stat">
                        <span className="stat-value">{currentApp.rating}</span>
                        <span className="stat-label">Rating</span>
                      </div>
                      <div className="stat">
                        <span className="stat-value">{currentApp.downloads}</span>
                        <span className="stat-label">Downloads</span>
                      </div>
                      <div className="stat">
                        <span className="stat-value">{currentApp.size}</span>
                        <span className="stat-label">Size</span>
                      </div>
                      <div className="stat">
                        <span className="stat-value">v{currentApp.version}</span>
                        <span className="stat-label">Version</span>
                      </div>
                    </div>

                    <div className="app-features">
                      <h4>Key Features:</h4>
                      <ul>
                        {currentApp.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="download-buttons">
                      {activeTab === 'charitable-trust' ? (
                        <button 
                          className="download-btn primary"
                          onClick={() => alert('Coming Soon! The Wyenfos Charitable Trust website will be available soon.')}
                          style={{
                            background: 'linear-gradient(135deg, #d32f2f 0%, #b71c1c 100%)',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontWeight: 'bold',
                            fontSize: '16px',
                            border: 'none',
                            cursor: 'pointer'
                          }}
                        >
                          <span>🌐</span>
                          Visit Trust Website
                        </button>
                      ) : (
                        <a 
                          href={currentApp.downloadUrl} 
                          className="download-btn primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div style={{
                            background: 'linear-gradient(135deg, #34a853 0%, #137333 100%)',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '8px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '10px',
                            fontWeight: 'bold',
                            fontSize: '16px'
                          }}>
                            <span>📱</span>
                            Get it on Google Play
                          </div>
                        </a>
                      )}
                      <button className="download-btn secondary">
                        {activeTab === 'charitable-trust' ? 'Website Coming Soon' : 'Coming Soon on App Store'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="col-lg-6">
                  <div className="app-preview">
                    <div className="qr-code-section">
                      <div className="qr-code">
                        <img src={currentApp.qrCode} alt="QR Code" onError={(e) => {
                          e.target.style.display = 'none';
                        }} />
                        <p>Scan to Download</p>
                      </div>
                    </div>

                    <div className="app-screenshots">
                      <h4>App Screenshots</h4>
                      <div className="screenshots-grid">
                        {currentApp.screenshots.map((screenshot, index) => (
                          <div key={index} className="screenshot">
                            <img 
                              src={screenshot} 
                              alt={`${currentApp.name} Screenshot ${index + 1}`}
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'block';
                              }}
                            />
                            <div style={{display: 'none', width: '100%', height: '100%', background: '#f8f9fa', alignItems: 'center', justifyContent: 'center', color: '#999', fontSize: '12px'}}>
                              Screenshot {index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Coming Soon Banner */}
            <div className="coming-soon-banner">
              <div className="banner-content">
                <h3>#ComingSoon</h3>
                <p>Get ready for the ultimate mobile experience! Both apps are currently in final development and will be available soon on Google Play Store.</p>
                <div className="notification-signup">
                  <input 
                    type="email" 
                    placeholder="Enter your email for launch notification" 
                    className="email-input"
                  />
                  <button className="notify-btn">Notify Me</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppDownload;
