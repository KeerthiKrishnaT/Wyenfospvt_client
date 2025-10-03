import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './AdminLogin.css';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showEmailChange, setShowEmailChange] = useState(false);
  const [forgotEmail] = useState('wyenfos014@gmail.com'); // Fixed admin email
  const [passwordChangeData, setPasswordChangeData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [emailChangeData, setEmailChangeData] = useState({
    oldEmail: '',
    newEmail: '',
    confirmNewEmail: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    setError(''); // Clear error when user starts typing
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simulate API call - Replace with actual authentication
    try {
      // Demo credentials - Replace with real authentication
      if (formData.email === 'admin@wyenfos.com' && formData.password === 'WyenfosAdmin@2024') {
        // Send login alert email to admin using EmailJS
        try {
          const loginTime = new Date().toLocaleString('en-IN', {
            timeZone: 'Asia/Kolkata',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
          });

          // EmailJS configuration
          const serviceId = 'service_o5gaybe';
          const templateId = 'template_login_alert';
          const publicKey = 'znSzj40oYrrNtXa2Q'; // Replace with your actual public key

          const templateParams = {
            to_email: 'wyenfos014@gmail.com',
            from_email: formData.email,
            login_time: loginTime,
            user_agent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            ip_address: 'Auto-detected',
            message: `Admin login detected from ${formData.email} at ${loginTime}`
          };

          // Send email using EmailJS
          await emailjs.send(serviceId, templateId, templateParams, publicKey);
          console.log('✅ Login alert email sent successfully via EmailJS');
          
        } catch (emailError) {
          console.warn('⚠️ Login alert email failed:', emailError);
          console.log('📧 To enable real emails, set up EmailJS at https://www.emailjs.com/');
          // Don't block login if email fails
        }

        // Store auth token (replace with real token)
        localStorage.setItem('wyenfos_admin_token', 'demo_token_' + Date.now());
        localStorage.setItem('wyenfos_admin_user', JSON.stringify({
          email: formData.email,
          name: 'Admin User',
          role: 'administrator'
        }));
        
        setMessage('✅ Login successful! Security alert sent to wy****@g***l.com. Redirecting...');
        setTimeout(() => {
          navigate('/admin/hvcxyctdsyt/jhguyiu/dashboard');
        }, 2000);
      } else {
        setError('Invalid email or password. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Send email using EmailJS (client-side email service)
      const serviceId = 'service_o5gaybe';
      const templateId = 'template_reset_password';
      const publicKey = 'znSzj40oYrrNtXa2Q'; // Replace with your actual public key

      const templateParams = {
        to_email: forgotEmail,
        from_email: 'wyenfos014@gmail.com',
        subject: 'Admin Password Reset Request',
        message: `Password reset requested for admin account. Please contact system administrator.`,
        reset_link: `${window.location.origin}/admin/hvcxyctdsyt/jhguyiu/reset-password?email=${encodeURIComponent(forgotEmail)}`
      };

      // Send email using EmailJS
      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      console.log('✅ Reset email sent successfully via EmailJS');
      
      setMessage('✅ Reset email sent successfully!');
      setTimeout(() => {
        setShowForgotPassword(false);
        setMessage('');
      }, 3000);
      
    } catch (err) {
      console.warn('⚠️ Reset email failed:', err);
      console.log('📧 To enable real emails, set up EmailJS at https://www.emailjs.com/');
      setError('Failed to send reset email. Please check your connection.');
    } finally {
      setIsLoading(false);
    }
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
      setError('New password must be at least 8 characters long.');
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
          email: 'wyenfos014@gmail.com'
        }),
      });

      if (response.ok) {
        setMessage('✅ Password updated successfully!');
        setPasswordChangeData({ oldPassword: '', newPassword: '', confirmPassword: '' });
        setShowPasswordChange(false);
      } else {
        setError('Failed to update password. Please check your old password.');
      }
    } catch (err) {
      setError('Failed to update password. Please try again.');
    } finally {
      setIsLoading(false);
    }
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
          newEmail: emailChangeData.newEmail
        }),
      });

      if (response.ok) {
        setMessage('✅ Email updated successfully! Please login with your new email.');
        setEmailChangeData({ oldEmail: '', newEmail: '', confirmNewEmail: '' });
        setShowEmailChange(false);
      } else {
        setError('Failed to update email. Please check your old email.');
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
            <img src="/assets/wyenfos.jpeg" alt="Wyenfos Logo" className="logo-img" />
            <h1 className="admin-title">WYENFOS Admin</h1>
          </div>
          <p className="login-subtitle">Secure Administrative Access</p>
        </div>

        {!showForgotPassword ? (
          <div className="login-form-container">
            <h2 className="form-title">Administrator Login</h2>
            
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}

            <form onSubmit={handleLogin} className="login-form">
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  <i className="icon-email">📧</i>
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="form-input"
                  placeholder="Enter your admin email"
                  autoComplete="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  <i className="icon-password">🔒</i>
                  Password
                </label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="form-input password-input"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="password-toggle-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <i className="icon-eye">👁️</i>
                    ) : (
                      <i className="icon-eye-off">🙈</i>
                    )}
                  </button>
                </div>
              </div>

              <button 
                type="submit" 
                className={`login-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="loading-spinner">⏳ Authenticating...</span>
                ) : (
                  <span>🚀 Login to Dashboard</span>
                )}
              </button>
            </form>

            <div className="login-footer">
              <button 
                type="button" 
                className="forgot-password-btn"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot your password?
              </button>
            </div>
          </div>
        ) : showForgotPassword ? (
          <div className="simple-reset-container">
            <h2 className="form-title">Reset Password</h2>
            
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}

            <p className="reset-info">
              Click the button below to send reset instructions to the admin email.
            </p>

            <button 
              type="button"
              className={`simple-reset-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
              onClick={handleForgotPassword}
            >
              {isLoading ? (
                <span className="loading-spinner">⏳ Sending...</span>
              ) : (
                <span>📤 Send Reset Email</span>
              )}
            </button>

            <button 
              type="button" 
              className="back-to-login-btn"
              onClick={() => {
                setShowForgotPassword(false);
                setError('');
                setMessage('');
              }}
            >
              ← Back to Login
            </button>
          </div>
        ) : showPasswordChange ? (
          <div className="password-change-container">
            <h2 className="form-title">Change Password</h2>
            
            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}

            <form onSubmit={handlePasswordChange} className="password-change-form">
              <div className="form-group">
                <label htmlFor="oldPassword" className="form-label">
                  <i className="icon-password">🔒</i>
                  Current Password
                </label>
                <input
                  type="password"
                  id="oldPassword"
                  value={passwordChangeData.oldPassword}
                  onChange={(e) => setPasswordChangeData(prev => ({...prev, oldPassword: e.target.value}))}
                  required
                  className="form-input"
                  placeholder="Enter your current password"
                />
              </div>

              <div className="form-group">
                <label htmlFor="newPassword" className="form-label">
                  <i className="icon-password">🔑</i>
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  value={passwordChangeData.newPassword}
                  onChange={(e) => setPasswordChangeData(prev => ({...prev, newPassword: e.target.value}))}
                  required
                  className="form-input"
                  placeholder="Enter new password (min 8 characters)"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">
                  <i className="icon-password">✅</i>
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={passwordChangeData.confirmPassword}
                  onChange={(e) => setPasswordChangeData(prev => ({...prev, confirmPassword: e.target.value}))}
                  required
                  className="form-input"
                  placeholder="Confirm your new password"
                />
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className={`change-btn ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading-spinner">⏳ Updating...</span>
                  ) : (
                    <span>🔑 Update Password</span>
                  )}
                </button>

                <button 
                  type="button" 
                  className="back-btn"
                  onClick={() => {
                    setShowPasswordChange(false);
                    setShowForgotPassword(true);
                    setError('');
                    setMessage('');
                  }}
                >
                  ← Back to Options
                </button>
              </div>
            </form>
          </div>
        ) : showEmailChange ? (
          <div className="email-change-container">
            <h2 className="form-title">Change Email</h2>

            {error && <div className="error-message">{error}</div>}
            {message && <div className="success-message">{message}</div>}

            <form onSubmit={handleEmailChange} className="email-change-form">
              <div className="form-group">
                <label htmlFor="oldEmail" className="form-label">
                  <i className="icon-email">📧</i>
                  Current Email
                </label>
                <input
                  type="email"
                  id="oldEmail"
                  value={emailChangeData.oldEmail}
                  onChange={(e) => setEmailChangeData(prev => ({...prev, oldEmail: e.target.value}))}
                  required
                  className="form-input"
                  placeholder="Enter your current email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="newEmail" className="form-label">
                  <i className="icon-email">📨</i>
                  New Email
                </label>
                <input
                  type="email"
                  id="newEmail"
                  value={emailChangeData.newEmail}
                  onChange={(e) => setEmailChangeData(prev => ({...prev, newEmail: e.target.value}))}
                  required
                  className="form-input"
                  placeholder="Enter new email address"
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmNewEmail" className="form-label">
                  <i className="icon-email">✅</i>
                  Confirm New Email
                </label>
                <input
                  type="email"
                  id="confirmNewEmail"
                  value={emailChangeData.confirmNewEmail}
                  onChange={(e) => setEmailChangeData(prev => ({...prev, confirmNewEmail: e.target.value}))}
                  required
                  className="form-input"
                  placeholder="Confirm your new email"
                />
              </div>

              <div className="form-actions">
                <button 
                  type="submit" 
                  className={`change-btn ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="loading-spinner">⏳ Updating...</span>
                  ) : (
                    <span>📧 Update Email</span>
                  )}
                </button>

                <button 
                  type="button" 
                  className="back-btn"
                  onClick={() => {
                    setShowEmailChange(false);
                    setShowForgotPassword(true);
                    setError('');
                    setMessage('');
                  }}
                >
                  ← Back to Options
                </button>
              </div>
            </form>
          </div>
        ) : null}

        <div className="security-notice">
          <p>🔐 This is a secure administrative area. All access attempts are logged and monitored.</p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
