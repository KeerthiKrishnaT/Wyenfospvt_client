const express = require('express');
const { body, validationResult } = require('express-validator');
const { db, auth } = require('../config/firebase');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Get all active ads
router.get('/', async (req, res) => {
  try {
    const adsSnapshot = await db.collection('ads')
      .where('status', '==', 'active')
      .orderBy('createdAt', 'desc')
      .get();

    const ads = [];
    adsSnapshot.forEach(doc => {
      ads.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.status(200).json({
      success: true,
      data: ads,
      count: ads.length
    });
  } catch (error) {
    console.error('Error fetching ads:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch ads',
      error: error.message
    });
  }
});

// Get ads by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const adsSnapshot = await db.collection('ads')
      .where('category', '==', category)
      .where('status', '==', 'active')
      .orderBy('createdAt', 'desc')
      .get();

    const ads = [];
    adsSnapshot.forEach(doc => {
      ads.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.status(200).json({
      success: true,
      data: ads,
      category,
      count: ads.length
    });
  } catch (error) {
    console.error('Error fetching ads by category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch ads by category',
      error: error.message
    });
  }
});

// Create new ad (authenticated users only)
router.post('/', 
  authenticateToken,
  [
    body('title').notEmpty().withMessage('Title is required'),
    body('description').notEmpty().withMessage('Description is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('reward').isNumeric().withMessage('Reward must be a number'),
    body('duration').isNumeric().withMessage('Duration must be a number')
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

      const { title, description, category, imageUrl, videoUrl, reward, duration, targetAudience } = req.body;
      const userId = req.user.uid;

      const adData = {
        title,
        description,
        category,
        imageUrl: imageUrl || '',
        videoUrl: videoUrl || '',
        reward: parseFloat(reward),
        duration: parseInt(duration),
        targetAudience: targetAudience || 'all',
        status: 'pending', // Admin approval required
        createdBy: userId,
        createdAt: new Date(),
        updatedAt: new Date(),
        views: 0,
        clicks: 0
      };

      const docRef = await db.collection('ads').add(adData);

      res.status(201).json({
        success: true,
        message: 'Ad created successfully',
        data: {
          id: docRef.id,
          ...adData
        }
      });
    } catch (error) {
      console.error('Error creating ad:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create ad',
        error: error.message
      });
    }
  }
);

// Record ad view/click (for earning tracking)
router.post('/:adId/interaction', 
  authenticateToken,
  [
    body('type').isIn(['view', 'click']).withMessage('Type must be view or click'),
    body('duration').optional().isNumeric().withMessage('Duration must be a number')
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

      const { adId } = req.params;
      const { type, duration } = req.body;
      const userId = req.user.uid;

      // Get ad details
      const adDoc = await db.collection('ads').doc(adId).get();
      if (!adDoc.exists) {
        return res.status(404).json({
          success: false,
          message: 'Ad not found'
        });
      }

      const adData = adDoc.data();

      // Record interaction
      const interactionData = {
        adId,
        userId,
        type,
        duration: duration || 0,
        reward: type === 'view' ? adData.reward : 0,
        timestamp: new Date()
      };

      await db.collection('ad_interactions').add(interactionData);

      // Update ad statistics
      const updateData = {};
      if (type === 'view') {
        updateData.views = (adData.views || 0) + 1;
      } else if (type === 'click') {
        updateData.clicks = (adData.clicks || 0) + 1;
      }

      if (Object.keys(updateData).length > 0) {
        await db.collection('ads').doc(adId).update(updateData);
      }

      // Update user earnings if it's a view
      if (type === 'view' && adData.reward > 0) {
        const userRef = db.collection('users').doc(userId);
        await db.runTransaction(async (transaction) => {
          const userDoc = await transaction.get(userRef);
          const currentEarnings = userDoc.exists ? (userDoc.data().earnings || 0) : 0;
          transaction.set(userRef, {
            earnings: currentEarnings + adData.reward,
            lastActivity: new Date()
          }, { merge: true });
        });
      }

      res.status(200).json({
        success: true,
        message: 'Interaction recorded successfully',
        data: {
          reward: type === 'view' ? adData.reward : 0,
          totalViews: updateData.views || adData.views,
          totalClicks: updateData.clicks || adData.clicks
        }
      });
    } catch (error) {
      console.error('Error recording interaction:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to record interaction',
        error: error.message
      });
    }
  }
);

// Get user's ad statistics
router.get('/user/stats', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.uid;

    // Get user's interactions
    const interactionsSnapshot = await db.collection('ad_interactions')
      .where('userId', '==', userId)
      .get();

    let totalViews = 0;
    let totalEarnings = 0;
    const dailyStats = {};

    interactionsSnapshot.forEach(doc => {
      const data = doc.data();
      if (data.type === 'view') {
        totalViews++;
        totalEarnings += data.reward || 0;

        // Group by date for daily stats
        const date = data.timestamp.toDate().toDateString();
        if (!dailyStats[date]) {
          dailyStats[date] = { views: 0, earnings: 0 };
        }
        dailyStats[date].views++;
        dailyStats[date].earnings += data.reward || 0;
      }
    });

    res.status(200).json({
      success: true,
      data: {
        totalViews,
        totalEarnings,
        dailyStats: Object.entries(dailyStats).map(([date, stats]) => ({
          date,
          ...stats
        }))
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

module.exports = router;
