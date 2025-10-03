const express = require('express');
const { body, validationResult } = require('express-validator');
const { db, auth } = require('../config/firebase');
const { authenticateToken } = require('../middleware/auth');
const router = express.Router();

// Get all available vouchers
router.get('/', async (req, res) => {
  try {
    const vouchersSnapshot = await db.collection('vouchers')
      .where('status', '==', 'active')
      .where('expiryDate', '>', new Date())
      .orderBy('expiryDate')
      .orderBy('createdAt', 'desc')
      .get();

    const vouchers = [];
    vouchersSnapshot.forEach(doc => {
      const data = doc.data();
      vouchers.push({
        id: doc.id,
        ...data,
        expiryDate: data.expiryDate.toDate(),
        createdAt: data.createdAt.toDate()
      });
    });

    res.status(200).json({
      success: true,
      data: vouchers,
      count: vouchers.length
    });
  } catch (error) {
    console.error('Error fetching vouchers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch vouchers',
      error: error.message
    });
  }
});

// Get vouchers by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const vouchersSnapshot = await db.collection('vouchers')
      .where('category', '==', category)
      .where('status', '==', 'active')
      .where('expiryDate', '>', new Date())
      .orderBy('expiryDate')
      .orderBy('createdAt', 'desc')
      .get();

    const vouchers = [];
    vouchersSnapshot.forEach(doc => {
      const data = doc.data();
      vouchers.push({
        id: doc.id,
        ...data,
        expiryDate: data.expiryDate.toDate(),
        createdAt: data.createdAt.toDate()
      });
    });

    res.status(200).json({
      success: true,
      data: vouchers,
      category,
      count: vouchers.length
    });
  } catch (error) {
    console.error('Error fetching vouchers by category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch vouchers by category',
      error: error.message
    });
  }
});

// Get user's purchased vouchers
router.get('/user/purchased', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.uid;
    const purchasesSnapshot = await db.collection('voucher_purchases')
      .where('userId', '==', userId)
      .orderBy('purchaseDate', 'desc')
      .get();

    const purchases = [];
    for (const doc of purchasesSnapshot.docs) {
      const purchaseData = doc.data();
      
      // Get voucher details
      const voucherDoc = await db.collection('vouchers').doc(purchaseData.voucherId).get();
      const voucherData = voucherDoc.exists ? voucherDoc.data() : null;

      purchases.push({
        id: doc.id,
        ...purchaseData,
        purchaseDate: purchaseData.purchaseDate.toDate(),
        voucher: voucherData ? {
          id: voucherDoc.id,
          ...voucherData,
          expiryDate: voucherData.expiryDate.toDate()
        } : null
      });
    }

    res.status(200).json({
      success: true,
      data: purchases,
      count: purchases.length
    });
  } catch (error) {
    console.error('Error fetching user vouchers:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch user vouchers',
      error: error.message
    });
  }
});

// Purchase a voucher
router.post('/:voucherId/purchase', 
  authenticateToken,
  [
    body('paymentMethod').notEmpty().withMessage('Payment method is required'),
    body('quantity').optional().isInt({ min: 1 }).withMessage('Quantity must be a positive integer')
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

      const { voucherId } = req.params;
      const { paymentMethod, quantity = 1 } = req.body;
      const userId = req.user.uid;

      // Get voucher details
      const voucherDoc = await db.collection('vouchers').doc(voucherId).get();
      if (!voucherDoc.exists) {
        return res.status(404).json({
          success: false,
          message: 'Voucher not found'
        });
      }

      const voucherData = voucherDoc.data();

      // Check if voucher is still active and not expired
      if (voucherData.status !== 'active' || voucherData.expiryDate.toDate() < new Date()) {
        return res.status(400).json({
          success: false,
          message: 'Voucher is no longer available'
        });
      }

      // Check stock availability
      if (voucherData.stock !== undefined && voucherData.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient stock available'
        });
      }

      const totalAmount = voucherData.price * quantity;

      // Get user's current balance (from ad earnings)
      const userDoc = await db.collection('users').doc(userId).get();
      const userBalance = userDoc.exists ? (userDoc.data().earnings || 0) : 0;

      // Check if user has enough balance for cash payment
      if (paymentMethod === 'cash_vapase_balance' && userBalance < totalAmount) {
        return res.status(400).json({
          success: false,
          message: 'Insufficient balance in Cash Vapase account',
          currentBalance: userBalance,
          requiredAmount: totalAmount
        });
      }

      // Create purchase record
      const purchaseData = {
        userId,
        voucherId,
        quantity,
        totalAmount,
        paymentMethod,
        status: 'completed',
        purchaseDate: new Date(),
        voucherCode: generateVoucherCode(),
        usageStatus: 'unused'
      };

      const purchaseRef = await db.collection('voucher_purchases').add(purchaseData);

      // Update user balance if paid with Cash Vapase balance
      if (paymentMethod === 'cash_vapase_balance') {
        await db.collection('users').doc(userId).update({
          earnings: userBalance - totalAmount,
          lastActivity: new Date()
        });
      }

      // Update voucher stock if applicable
      if (voucherData.stock !== undefined) {
        await db.collection('vouchers').doc(voucherId).update({
          stock: voucherData.stock - quantity,
          soldCount: (voucherData.soldCount || 0) + quantity
        });
      }

      res.status(201).json({
        success: true,
        message: 'Voucher purchased successfully',
        data: {
          purchaseId: purchaseRef.id,
          voucherCode: purchaseData.voucherCode,
          totalAmount,
          remainingBalance: paymentMethod === 'cash_vapase_balance' ? userBalance - totalAmount : userBalance
        }
      });
    } catch (error) {
      console.error('Error purchasing voucher:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to purchase voucher',
        error: error.message
      });
    }
  }
);

// Redeem a voucher
router.post('/redeem', 
  authenticateToken,
  [
    body('voucherCode').notEmpty().withMessage('Voucher code is required')
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

      const { voucherCode } = req.body;
      const userId = req.user.uid;

      // Find the voucher purchase
      const purchaseSnapshot = await db.collection('voucher_purchases')
        .where('voucherCode', '==', voucherCode)
        .where('userId', '==', userId)
        .limit(1)
        .get();

      if (purchaseSnapshot.empty) {
        return res.status(404).json({
          success: false,
          message: 'Invalid voucher code or voucher not found'
        });
      }

      const purchaseDoc = purchaseSnapshot.docs[0];
      const purchaseData = purchaseDoc.data();

      // Check if voucher is already used
      if (purchaseData.usageStatus === 'used') {
        return res.status(400).json({
          success: false,
          message: 'Voucher has already been redeemed',
          redeemedAt: purchaseData.redeemedAt.toDate()
        });
      }

      // Get voucher details
      const voucherDoc = await db.collection('vouchers').doc(purchaseData.voucherId).get();
      const voucherData = voucherDoc.data();

      // Check if voucher is expired
      if (voucherData.expiryDate.toDate() < new Date()) {
        return res.status(400).json({
          success: false,
          message: 'Voucher has expired'
        });
      }

      // Mark voucher as used
      await db.collection('voucher_purchases').doc(purchaseDoc.id).update({
        usageStatus: 'used',
        redeemedAt: new Date()
      });

      res.status(200).json({
        success: true,
        message: 'Voucher redeemed successfully',
        data: {
          voucher: {
            title: voucherData.title,
            description: voucherData.description,
            value: voucherData.value,
            merchant: voucherData.merchant
          },
          redeemedAt: new Date(),
          instructions: voucherData.redemptionInstructions || 'Present this confirmation to the merchant'
        }
      });
    } catch (error) {
      console.error('Error redeeming voucher:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to redeem voucher',
        error: error.message
      });
    }
  }
);

// Get voucher categories
router.get('/categories', async (req, res) => {
  try {
    const categoriesSnapshot = await db.collection('voucher_categories')
      .where('status', '==', 'active')
      .orderBy('name')
      .get();

    const categories = [];
    categoriesSnapshot.forEach(doc => {
      categories.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.status(200).json({
      success: true,
      data: categories,
      count: categories.length
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categories',
      error: error.message
    });
  }
});

// Helper function to generate voucher code
function generateVoucherCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = 'WYE-';
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
    if (i === 3) result += '-';
  }
  return result;
}

module.exports = router;
