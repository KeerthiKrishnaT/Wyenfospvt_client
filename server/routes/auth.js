const express = require('express');
const { body, validationResult } = require('express-validator');
const { auth, db } = require('../config/firebase');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Validation middleware
const validateUserData = [
  body('displayName')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Display name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address')
];

// POST /api/auth/register - Register new user
router.post('/register', validateUserData, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { email, password, displayName } = req.body;

    // Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName
    });

    // Create user profile in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      displayName,
      email,
      role: 'user',
      createdAt: new Date(),
      updatedAt: new Date()
    });

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName
      }
    });

  } catch (error) {
    console.error('User registration error:', error);
    
    if (error.code === 'auth/email-already-exists') {
      return res.status(400).json({
        error: 'Registration failed',
        message: 'Email already exists'
      });
    }

    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to register user'
    });
  }
});

// POST /api/auth/login - User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Note: Firebase Auth handles login on the client side
    // This endpoint is for additional server-side logic if needed
    res.json({
      success: true,
      message: 'Login successful'
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Login failed'
    });
  }
});

// GET /api/auth/profile - Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const { uid } = req.user;

    const userDoc = await db.collection('users').doc(uid).get();

    if (!userDoc.exists) {
      return res.status(404).json({
        error: 'User not found',
        message: 'User profile does not exist'
      });
    }

    const userData = userDoc.data();

    res.json({
      success: true,
      user: {
        uid,
        ...userData
      }
    });

  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch user profile'
    });
  }
});

// PUT /api/auth/profile - Update user profile
router.put('/profile', authenticateToken, validateUserData, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { uid } = req.user;
    const { displayName, email } = req.body;

    // Update user in Firebase Auth
    await auth.updateUser(uid, {
      displayName,
      email
    });

    // Update user profile in Firestore
    await db.collection('users').doc(uid).update({
      displayName,
      email,
      updatedAt: new Date()
    });

    res.json({
      success: true,
      message: 'Profile updated successfully'
    });

  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update user profile'
    });
  }
});

// DELETE /api/auth/profile - Delete user account
router.delete('/profile', authenticateToken, async (req, res) => {
  try {
    const { uid } = req.user;

    // Delete user from Firebase Auth
    await auth.deleteUser(uid);

    // Delete user profile from Firestore
    await db.collection('users').doc(uid).delete();

    res.json({
      success: true,
      message: 'User account deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting user account:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to delete user account'
    });
  }
});

// POST /api/auth/logout - User logout
router.post('/logout', authenticateToken, async (req, res) => {
  try {
    // Note: Firebase Auth handles logout on the client side
    // This endpoint is for additional server-side logic if needed
    res.json({
      success: true,
      message: 'Logout successful'
    });

  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Logout failed'
    });
  }
});

module.exports = router;
