import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './AdminLogin.css';

const ChangeEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const currentEmail = searchParams.get('email') || 'admin@wyenfos.com';
  
  const [emailChangeData, setEmailChangeData] = useState({
    oldEmail: currentEmail,
    newEmail: '',
    confirmNewEmail: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailInputChange = (e) => {
    const { name, value } = e.target;
    setEmailChangeData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError(''); // Clear error when user starts typing
  };

  const handleEmailChange = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate emails match
    if (emailChangeData.newEmail !== emailChangeData.confirmNewEmail) {
      setError('New emails do not match.');
      setIsLoading(false);
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailChangeData.newEmail)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    try {
      // Update email in Firebase Authentication
      const response = await fetch('/api/admin/change-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldEmail: emailChangeData.oldEmail,
          newEmail: emailChangeData.newEmail,
        }),
      });

      if (response.ok) {
        setMessage('✅ Email updated successfully! Please login with your new email. Redirecting...');
        setEmailChangeData({ oldEmail: '', newEmail: '', confirmNewEmail: '' });
        setTimeout(() => {
          navigate('/admin/hvcxyctdsyt/jhguyiu/login');
        }, 3000);
      } else {
        setError('Failed to update email. Please check your current email.');
      }
    } catch (err) {
      setError('Failed to update email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <div className="login-header">
          <div className="admin-logo">
            <img src="/assets/wyenfos.jpeg" alt="Wyenfos" className="logo-img" />
            <h1 className="admin-title">WYENFOS Admin</h1>
            <p className="login-subtitle">Secure Administrative Access</p>
          </div>
        </div>

        <div className="forgot-password-container">
          <h2 className="form-title">Change Email</h2>
          <p className="forgot-description">
            Update your admin email address. You'll need to login with the new email after the change.
          </p>

          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}

          <form onSubmit={handleEmailChange} className="login-form">
            <div className="form-group">
              <label className="form-label">
                <i className="fas fa-envelope"></i>
                Current Email
              </label>
              <input
                type="email"
                name="oldEmail"
                className="form-input"
                placeholder="Your current email address"
                value={emailChangeData.oldEmail}
                onChange={handleEmailInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <i className="fas fa-envelope-open"></i>
                New Email
              </label>
              <input
                type="email"
                name="newEmail"
                className="form-input"
                placeholder="Enter your new email address"
                value={emailChangeData.newEmail}
                onChange={handleEmailInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <i className="fas fa-check-circle"></i>
                Confirm New Email
              </label>
              <input
                type="email"
                name="confirmNewEmail"
                className="form-input"
                placeholder="Confirm your new email address"
                value={emailChangeData.confirmNewEmail}
                onChange={handleEmailInputChange}
                required
              />
            </div>

            <button 
              type="submit" 
              className={`login-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner">⏳ Updating Email...</span>
              ) : (
                <span>📧 Update Email</span>
              )}
            </button>
          </form>

          <div className="form-footer">
            <button 
              type="button"
              className="back-to-login-btn"
              onClick={() => navigate('/admin/hvcxyctdsyt/jhguyiu/login')}
            >
              ← Back to Login
            </button>
          </div>
        </div>

        <div className="security-notice">
          <p>🔒 This is a secure administrative area. All access attempts are logged and monitored.</p>
        </div>
      </div>
    </div>
  );
};

export default ChangeEmail;
