const express = require('express');
const { body, validationResult } = require('express-validator');
const { db, auth } = require('../config/firebase');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Get user profile
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const userDoc = await db.collection('users').doc(userId).get();

    if (!userDoc.exists) {
      // Create user profile if doesn't exist
      const userData = {
        uid: userId,
        email: req.user.email,
        displayName: req.user.name || req.user.email.split('@')[0],
        earnings: 0,
        totalAdsWatched: 0,
        totalVouchersPurchased: 0,
        joinDate: new Date(),
        lastActivity: new Date(),
        status: 'active'
      };

      await db.collection('users').doc(userId).set(userData);

      return res.status(200).json({
        success: true,
        data: userData
      });
    }

    const userData = userDoc.data();
    res.status(200).json({
      success: true,
      data: {
        ...userData,
        joinDate: userData.joinDate.toDate(),
        lastActivity: userData.lastActivity.toDate()
      }
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user profile',
      error: error.message
    });
  }
});

// Update user profile
router.put('/profile', 
  authenticateToken,
  [
    body('displayName').optional().isLength({ min: 2 }).withMessage('Display name must be at least 2 characters'),
    body('phoneNumber').optional().isMobilePhone().withMessage('Invalid phone number'),
    body('dateOfBirth').optional().isISO8601().withMessage('Invalid date format')
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const userId = req.user.uid;
      const { displayName, phoneNumber, dateOfBirth, preferences } = req.body;

      const updateData = {
        lastActivity: new Date()
      };

      if (displayName) updateData.displayName = displayName;
      if (phoneNumber) updateData.phoneNumber = phoneNumber;
      if (dateOfBirth) updateData.dateOfBirth = new Date(dateOfBirth);
      if (preferences) updateData.preferences = preferences;

      await db.collection('users').doc(userId).update(updateData);

      // Get updated user data
      const userDoc = await db.collection('users').doc(userId).get();
      const userData = userDoc.data();

      res.status(200).json({
        success: true,
        message: 'Profile updated successfully',
        data: {
          ...userData,
          joinDate: userData.joinDate.toDate(),
          lastActivity: userData.lastActivity.toDate()
        }
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update profile',
        error: error.message
      });
    }
  }
);

// Get user earnings summary
router.get('/earnings', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.uid;

    // Get user's basic earnings info
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.exists ? userDoc.data() : {};

    // Get detailed earnings from ad interactions
    const interactionsSnapshot = await db.collection('ad_interactions')
      .where('userId', '==', userId)
      .where('type', '==', 'view')
      .orderBy('timestamp', 'desc')
      .limit(50)
      .get();

    const recentEarnings = [];
    let totalEarnings = 0;

    interactionsSnapshot.forEach(doc => {
      const data = doc.data();
      recentEarnings.push({
        id: doc.id,
        adId: data.adId,
        reward: data.reward,
        timestamp: data.timestamp.toDate()
      });
      totalEarnings += data.reward || 0;
    });

    // Get spending from voucher purchases
    const purchasesSnapshot = await db.collection('voucher_purchases')
      .where('userId', '==', userId)
      .where('paymentMethod', '==', 'cash_vapase_balance')
      .get();

    let totalSpent = 0;
    purchasesSnapshot.forEach(doc => {
      totalSpent += doc.data().totalAmount || 0;
    });

    res.status(200).json({
      success: true,
      data: {
        currentBalance: userData.earnings || 0,
        totalEarned: totalEarnings,
        totalSpent,
        recentEarnings,
        totalAdsWatched: userData.totalAdsWatched || 0,
        totalVouchersPurchased: userData.totalVouchersPurchased || 0
      }
    });
  } catch (error) {
    console.error('Error fetching user earnings:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch earnings data',
      error: error.message
    });
  }
});

// Get user activity history
router.get('/activity', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const { limit = 20, offset = 0 } = req.query;

    // Get ad interactions
    const adInteractionsSnapshot = await db.collection('ad_interactions')
      .where('userId', '==', userId)
      .orderBy('timestamp', 'desc')
      .limit(parseInt(limit))
      .offset(parseInt(offset))
      .get();

    const adInteractions = [];
    adInteractionsSnapshot.forEach(doc => {
      const data = doc.data();
      adInteractions.push({
        id: doc.id,
        type: 'ad_interaction',
        subType: data.type,
        timestamp: data.timestamp.toDate(),
        reward: data.reward || 0,
        adId: data.adId
      });
    });

    // Get voucher purchases
    const voucherPurchasesSnapshot = await db.collection('voucher_purchases')
      .where('userId', '==', userId)
      .orderBy('purchaseDate', 'desc')
      .limit(parseInt(limit))
      .offset(parseInt(offset))
      .get();

    const voucherPurchases = [];
    voucherPurchasesSnapshot.forEach(doc => {
      const data = doc.data();
      voucherPurchases.push({
        id: doc.id,
        type: 'voucher_purchase',
        timestamp: data.purchaseDate.toDate(),
        amount: -data.totalAmount,
        voucherId: data.voucherId,
        status: data.status
      });
    });

    // Combine and sort activities
    const allActivities = [...adInteractions, ...voucherPurchases]
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, parseInt(limit));

    res.status(200).json({
      success: true,
      data: allActivities,
      count: allActivities.length,
      hasMore: allActivities.length === parseInt(limit)
    });
  } catch (error) {
    console.error('Error fetching user activity:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activity history',
      error: error.message
    });
  }
});

// Get user statistics for dashboard
router.get('/stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.uid;

    // Get user data
    const userDoc = await db.collection('users').doc(userId).get();
    const userData = userDoc.exists ? userDoc.data() : {};

    // Get today's earnings
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayInteractionsSnapshot = await db.collection('ad_interactions')
      .where('userId', '==', userId)
      .where('type', '==', 'view')
      .where('timestamp', '>=', today)
      .where('timestamp', '<', tomorrow)
      .get();

    let todayEarnings = 0;
    let todayAdsWatched = 0;

    todayInteractionsSnapshot.forEach(doc => {
      const data = doc.data();
      todayEarnings += data.reward || 0;
      todayAdsWatched++;
    });

    // Get this week's stats
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - today.getDay());

    const weekInteractionsSnapshot = await db.collection('ad_interactions')
      .where('userId', '==', userId)
      .where('type', '==', 'view')
      .where('timestamp', '>=', weekStart)
      .get();

    let weekEarnings = 0;
    let weekAdsWatched = 0;

    weekInteractionsSnapshot.forEach(doc => {
      const data = doc.data();
      weekEarnings += data.reward || 0;
      weekAdsWatched++;
    });

    res.status(200).json({
      success: true,
      data: {
        currentBalance: userData.earnings || 0,
        todayEarnings,
        todayAdsWatched,
        weekEarnings,
        weekAdsWatched,
        totalEarnings: userData.totalEarnings || 0,
        totalAdsWatched: userData.totalAdsWatched || 0,
        totalVouchersPurchased: userData.totalVouchersPurchased || 0,
        memberSince: userData.joinDate ? userData.joinDate.toDate() : null,
        lastActivity: userData.lastActivity ? userData.lastActivity.toDate() : null
      }
    });
  } catch (error) {
    console.error('Error fetching user stats:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user statistics',
      error: error.message
    });
  }
});

// Delete user account
router.delete('/account', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.uid;

    // Delete user data from Firestore
    await db.collection('users').doc(userId).delete();

    // Delete user's interactions
    const interactionsSnapshot = await db.collection('ad_interactions')
      .where('userId', '==', userId)
      .get();

    const batch = db.batch();
    interactionsSnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });

    // Delete user's voucher purchases
    const purchasesSnapshot = await db.collection('voucher_purchases')
      .where('userId', '==', userId)
      .get();

    purchasesSnapshot.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    // Delete user from Firebase Auth
    await auth.deleteUser(userId);

    res.status(200).json({
      success: true,
      message: 'Account deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting user account:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete account',
      error: error.message
    });
  }
});

module.exports = router;
