import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import './AdminLogin.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') || 'wyenfos014@gmail.com';
  
  const [passwordChangeData, setPasswordChangeData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordChangeData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError(''); // Clear error when user starts typing
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validate passwords match
    if (passwordChangeData.newPassword !== passwordChangeData.confirmPassword) {
      setError('New passwords do not match.');
      setIsLoading(false);
      return;
    }

    // Validate password strength
    if (passwordChangeData.newPassword.length < 8) {
      setError('Password must be at least 8 characters long.');
      setIsLoading(false);
      return;
    }

    try {
      // Update password in Firebase Authentication
      const response = await fetch('/api/admin/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          oldPassword: passwordChangeData.oldPassword,
          newPassword: passwordChangeData.newPassword,
          email: email
        }),
      });

      if (response.ok) {
        setMessage('✅ Password updated successfully! Redirecting to login...');
        setPasswordChangeData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        setTimeout(() => {
          navigate('/admin/hvcxyctdsyt/jhguyiu/login');
        }, 3000);
      } else {
        setError('Failed to update password. Please check your old password.');
      }
    } catch (err) {
      setError('Failed to update password. Please try again.');
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
          <h2 className="form-title">Reset Password</h2>
          <p className="forgot-description">
            Enter your current password and choose a new secure password for your admin account.
          </p>

          {error && <div className="error-message">{error}</div>}
          {message && <div className="success-message">{message}</div>}

          <form onSubmit={handlePasswordChange} className="login-form">
            <div className="form-group">
              <label className="form-label">
                <i className="fas fa-lock"></i>
                Current Password
              </label>
              <input
                type="password"
                name="oldPassword"
                className="form-input"
                placeholder="Enter your current password"
                value={passwordChangeData.oldPassword}
                onChange={handlePasswordInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <i className="fas fa-key"></i>
                New Password
              </label>
              <input
                type="password"
                name="newPassword"
                className="form-input"
                placeholder="Enter new password (min 8 characters)"
                value={passwordChangeData.newPassword}
                onChange={handlePasswordInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <i className="fas fa-check-circle"></i>
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="form-input"
                placeholder="Confirm your new password"
                value={passwordChangeData.confirmPassword}
                onChange={handlePasswordInputChange}
                required
              />
            </div>

            <button 
              type="submit" 
              className={`login-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner">⏳ Updating Password...</span>
              ) : (
                <span>🔑 Update Password</span>
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

export default ResetPassword;
