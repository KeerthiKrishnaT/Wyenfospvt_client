const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// Email configuration - use existing EMAIL_USER and EMAIL_PASS
const isEmailConfigured = () => {
  return process.env.EMAIL_PASS && process.env.EMAIL_USER;
};

const createEmailTransporter = () => {
  if (!isEmailConfigured()) {
    console.log('📧 Demo mode: No email configuration found');
    return null; 
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
};

// Send login alert email
router.post('/send-login-alert', async (req, res) => {
  try {
    const { adminEmail, loginEmail, loginTime, userAgent, ipAddress, deviceInfo } = req.body;

    // Get client IP address
    const clientIP = req.headers['x-forwarded-for'] || 
                    req.connection.remoteAddress || 
                    req.socket.remoteAddress ||
                    (req.connection.socket ? req.connection.socket.remoteAddress : null) ||
                    'Unknown';

    const transporter = createEmailTransporter();

    // For demo purposes, simulate email sending if no real config
    if (!transporter) {
      console.log('📧 DEMO: Would send login alert email to:', adminEmail);
      console.log('📧 Login details:', { loginEmail, loginTime });
      console.log('📧 To enable real emails, set EMAIL_USER and EMAIL_PASS in server/.env');
      
      res.status(200).json({ 
        success: true, 
        message: 'Login alert email sent successfully (demo mode - configure EMAIL_USER and EMAIL_PASS for real emails)' 
      });
      return;
    }

    const emailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Wyenfos Admin Login Alert</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .alert-box { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .info-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          .info-table th, .info-table td { padding: 10px; text-align: left; border-bottom: 1px solid #ddd; }
          .info-table th { background-color: #f8f9fa; font-weight: bold; }
          .security-note { background: #d1ecf1; border: 1px solid #bee5eb; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Wyenfos Admin Login Alert</h1>
            <p>Security notification for administrator access</p>
          </div>
          
          <div class="content">
            <div class="alert-box">
              <h2>🚨 Admin Login Detected</h2>
              <p>Someone has successfully logged into the Wyenfos admin panel. Please review the details below:</p>
            </div>

            <table class="info-table">
              <tr>
                <th>📧 Login Email</th>
                <td>${loginEmail}</td>
              </tr>
              <tr>
                <th>🕐 Login Time</th>
                <td>${loginTime}</td>
              </tr>
              <tr>
                <th>🌐 IP Address</th>
                <td>${clientIP}</td>
              </tr>
              <tr>
                <th>💻 Platform</th>
                <td>${deviceInfo?.platform || 'Unknown'}</td>
              </tr>
              <tr>
                <th>🌍 Language</th>
                <td>${deviceInfo?.language || 'Unknown'}</td>
              </tr>
              <tr>
                <th>🍪 Cookies Enabled</th>
                <td>${deviceInfo?.cookieEnabled ? 'Yes' : 'No'}</td>
              </tr>
            </table>

            <div class="security-note">
              <h3>🛡️ Security Information</h3>
              <p><strong>User Agent:</strong> ${userAgent}</p>
              <p><strong>If this wasn't you:</strong></p>
              <ul>
                <li>Immediately change your admin password</li>
                <li>Check for any unauthorized changes</li>
                <li>Review recent admin activities</li>
                <li>Contact your system administrator</li>
              </ul>
            </div>

            <div class="alert-box">
              <p><strong>⚠️ Important:</strong> This is an automated security alert. If you recognize this login, no action is required. If you don't recognize this activity, please secure your account immediately.</p>
            </div>
          </div>

          <div class="footer">
            <p>This is an automated message from Wyenfos Security System</p>
            <p>© ${new Date().getFullYear()} Wyenfos Private Limited. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"Wyenfos Security" <${process.env.EMAIL_USER || 'wyenfos014@gmail.com'}>`,
      to: adminEmail,
      subject: `🔐 Admin Login Alert - ${loginTime}`,
      html: emailTemplate
    };

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true, 
      message: 'Login alert email sent successfully' 
    });

  } catch (error) {
    console.error('Login alert email error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send login alert email' 
    });
  }
});

// Send password reset email
router.post('/send-reset-email', async (req, res) => {
  try {
    const { email, type } = req.body;

    const transporter = await createEmailTransporter();

    const resetEmailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Wyenfos Admin Password Reset</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .reset-box { background: #fff3cd; border: 1px solid #ffeaa7; padding: 20px; border-radius: 5px; margin: 20px 0; text-align: center; }
          .button { display: inline-block; padding: 12px 24px; margin: 10px; background: #007bff; color: white; text-decoration: none; border-radius: 5px; font-weight: bold; }
          .button:hover { background: #0056b3; }
          .security-note { background: #d1ecf1; border: 1px solid #bee5eb; padding: 15px; border-radius: 5px; margin: 20px 0; }
          .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔐 Wyenfos Admin Account Management</h1>
            <p>Password and Email Reset Options</p>
          </div>
          
          <div class="content">
            <div class="reset-box">
              <h2>🔑 Account Reset Request</h2>
              <p>You have requested to reset your admin account credentials. Choose an option below:</p>
              
              <div style="margin: 30px 0;">
                <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/admin/hvcxyctdsyt/jhguyiu/reset-password?email=${encodeURIComponent(email)}" class="button">🔑 Reset Password</a>
                <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/admin/hvcxyctdsyt/jhguyiu/change-email?email=${encodeURIComponent(email)}" class="button">📧 Change Email</a>
              </div>
              
              <p><strong>Note:</strong> These links will take you to secure forms where you can update your credentials.</p>
            </div>

            <div class="security-note">
              <h3>🛡️ Security Guidelines</h3>
              <ul>
                <li>Never share your admin credentials with anyone</li>
                <li>Use a strong password with at least 8 characters</li>
                <li>Include uppercase, lowercase, numbers, and symbols</li>
                <li>Enable two-factor authentication if available</li>
              </ul>
            </div>

            <div class="reset-box">
              <p><strong>⚠️ Important:</strong> If you didn't request this reset, please ignore this email and contact your system administrator immediately.</p>
            </div>
          </div>

          <div class="footer">
            <p>This is an automated message from Wyenfos Security System</p>
            <p>© ${new Date().getFullYear()} Wyenfos Private Limited. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: `"Wyenfos Security" <${process.env.EMAIL_USER || 'wyenfos014@gmail.com'}>`,
      to: email,
      subject: '🔐 Wyenfos Admin Account Reset Options',
      html: resetEmailTemplate
    };

    // For demo purposes, simulate email sending if no real config
    if (!transporter) {
      console.log('📧 DEMO: Would send reset email to:', email);
      
      res.status(200).json({ 
        success: true, 
        message: 'Reset email sent successfully (demo mode)' 
      });
      return;
    }

    await transporter.sendMail(mailOptions);
    
    res.status(200).json({ 
      success: true, 
      message: 'Reset email sent successfully' 
    });

  } catch (error) {
    console.error('Reset email error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send reset email' 
    });
  }
});

// Change password endpoint
router.post('/change-password', async (req, res) => {
  try {
    const { oldPassword, newPassword, email } = req.body;
    const { auth } = require('../config/firebase');

    // For now, we'll verify against the current hardcoded password
    // In a full production setup, you'd verify against Firebase Auth
    const currentAdminPassword = 'WyenfosAdmin@2024';
    const currentAdminEmail = 'admin@wyenfos.com';

    if (oldPassword !== currentAdminPassword) {
      return res.status(400).json({ 
        success: false, 
        message: 'Current password is incorrect' 
      });
    }

    try {
      // Try to get or create the admin user in Firebase Auth
      let userRecord;
      try {
        userRecord = await auth.getUserByEmail(currentAdminEmail);
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          // Create the admin user if it doesn't exist
          userRecord = await auth.createUser({
            email: currentAdminEmail,
            password: currentAdminPassword,
            displayName: 'Wyenfos Admin'
          });
          console.log('✅ Created admin user in Firebase Auth:', userRecord.uid);
        } else {
          throw error;
        }
      }

      // Update the password in Firebase Auth
      await auth.updateUser(userRecord.uid, {
        password: newPassword
      });

      console.log('✅ Password updated in Firebase Auth for user:', userRecord.uid);
      
      res.status(200).json({ 
        success: true, 
        message: 'Password updated successfully in Firebase Authentication' 
      });

    } catch (firebaseError) {
      console.error('Firebase Auth error:', firebaseError);
      
      // If Firebase isn't configured, fall back to demo mode
      if (firebaseError.code === 'app/invalid-credential' || !auth) {
        console.log('📧 DEMO MODE: Password change simulated (Firebase not configured)');
        res.status(200).json({ 
          success: true, 
          message: 'Password updated successfully (demo mode - Firebase not configured)' 
        });
      } else {
        throw firebaseError;
      }
    }

  } catch (error) {
    console.error('Password change error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update password: ' + error.message 
    });
  }
});

// Change email endpoint
router.post('/change-email', async (req, res) => {
  try {
    const { oldEmail, newEmail } = req.body;
    const { auth } = require('../config/firebase');

    // For now, we'll verify against the current hardcoded email
    const currentAdminEmail = 'admin@wyenfos.com';

    if (oldEmail !== currentAdminEmail) {
      return res.status(400).json({ 
        success: false, 
        message: 'Current email is incorrect' 
      });
    }

    // Validate new email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newEmail)) {
      return res.status(400).json({ 
        success: false, 
        message: 'Please enter a valid email address' 
      });
    }

    try {
      // Try to get the admin user in Firebase Auth
      let userRecord;
      try {
        userRecord = await auth.getUserByEmail(currentAdminEmail);
      } catch (error) {
        if (error.code === 'auth/user-not-found') {
          // Create the admin user if it doesn't exist
          userRecord = await auth.createUser({
            email: currentAdminEmail,
            password: 'WyenfosAdmin@2024', // Default password
            displayName: 'Wyenfos Admin'
          });
          console.log('✅ Created admin user in Firebase Auth:', userRecord.uid);
        } else {
          throw error;
        }
      }

      // Check if new email already exists
      try {
        await auth.getUserByEmail(newEmail);
        return res.status(400).json({ 
          success: false, 
          message: 'Email address is already in use' 
        });
      } catch (error) {
        if (error.code !== 'auth/user-not-found') {
          throw error;
        }
        // Email doesn't exist, which is good - we can proceed
      }

      // Update the email in Firebase Auth
      await auth.updateUser(userRecord.uid, {
        email: newEmail
      });

      console.log('✅ Email updated in Firebase Auth for user:', userRecord.uid);
      console.log('📧 Email changed from:', currentAdminEmail, 'to:', newEmail);
      
      res.status(200).json({ 
        success: true, 
        message: 'Email updated successfully in Firebase Authentication. Please use the new email for login.' 
      });

    } catch (firebaseError) {
      console.error('Firebase Auth error:', firebaseError);
      
      // If Firebase isn't configured, fall back to demo mode
      if (firebaseError.code === 'app/invalid-credential' || !auth) {
        console.log('📧 DEMO MODE: Email change simulated (Firebase not configured)');
        res.status(200).json({ 
          success: true, 
          message: 'Email updated successfully (demo mode - Firebase not configured)' 
        });
      } else {
        throw firebaseError;
      }
    }

  } catch (error) {
    console.error('Email change error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update email: ' + error.message 
    });
  }
});

// Get current admin credentials (for updating frontend after changes)
router.get('/current-admin', async (req, res) => {
  try {
    const { auth } = require('../config/firebase');
    
    // For now, return the current hardcoded credentials
    // In a full production setup, you'd get this from Firebase Auth or a secure database
    const currentAdminEmail = 'admin@wyenfos.com';
    
    try {
      // Try to get the admin user from Firebase Auth
      const userRecord = await auth.getUserByEmail(currentAdminEmail);
      
      res.status(200).json({ 
        success: true, 
        email: userRecord.email,
        displayName: userRecord.displayName || 'Wyenfos Admin',
        lastSignInTime: userRecord.metadata.lastSignInTime,
        creationTime: userRecord.metadata.creationTime
      });
      
    } catch (firebaseError) {
      console.error('Firebase Auth error:', firebaseError);
      
      // If Firebase isn't configured or user not found, return default
      res.status(200).json({ 
        success: true, 
        email: currentAdminEmail,
        displayName: 'Wyenfos Admin',
        note: 'Demo mode - Firebase not configured'
      });
    }

  } catch (error) {
    console.error('Get admin error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to get admin info: ' + error.message 
    });
  }
});

module.exports = router;
