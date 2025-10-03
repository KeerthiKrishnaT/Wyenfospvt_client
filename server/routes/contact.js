const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const { db } = require('../config/firebase');
const router = express.Router();

// Email transporter configuration
let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

// Validation middleware
const validateContactForm = [
  body('name')
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Please provide a valid email address'),
  body('phone')
    .optional()
    .isMobilePhone()
    .withMessage('Please provide a valid phone number'),
  body('service')
    .optional()
    .isIn(['web-development', 'mobile-apps', 'ui-ux-design', 'digital-marketing', 'cloud-solutions', 'maintenance'])
    .withMessage('Please select a valid service'),
  body('message')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters')
];

// POST /api/contact - Submit contact form
router.post('/', validateContactForm, async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { name, email, phone, service, message } = req.body;

    // Save to Firestore if configured
    let contactId = null;
    if (process.env.FIREBASE_PROJECT_ID) {
      const contactRef = await db.collection('contacts').add({
        name,
        email,
        phone: phone || null,
        service: service || null,
        message,
        timestamp: new Date(),
        status: 'new'
      });
      contactId = contactRef.id;
    }

    // Send email notification if configured
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const mailOptions = {
          from: process.env.EMAIL_USER,
          to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
          subject: `New Contact Form Submission - ${name}`,
          html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
            <p><strong>Service:</strong> ${service || 'Not specified'}</p>
            <p><strong>Message:</strong></p>
            <p>${message}</p>
            <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
          `
        };

        await transporter.sendMail(mailOptions);

        // Send confirmation email to user
        const confirmationMailOptions = {
          from: process.env.EMAIL_USER,
          to: email,
          subject: 'Thank you for contacting Wyenfos',
          html: `
            <h2>Thank you for contacting us!</h2>
            <p>Dear ${name},</p>
            <p>We have received your message and will get back to you within 24 hours.</p>
            <p><strong>Your message:</strong></p>
            <p>${message}</p>
            <p>Best regards,<br>The Wyenfos Team</p>
          `
        };

        await transporter.sendMail(confirmationMailOptions);
      } catch (emailError) {
        console.error('Email sending error:', emailError);
      }
    }

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      contactId: contactId
    });

  } catch (error) {
    console.error('Contact form submission error:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to submit contact form'
    });
  }
});

// GET /api/contact - Get all contact submissions (admin only)
router.get('/', async (req, res) => {
  try {
    const contactsSnapshot = await db.collection('contacts')
      .orderBy('timestamp', 'desc')
      .get();

    const contacts = [];
    contactsSnapshot.forEach(doc => {
      contacts.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({
      success: true,
      contacts
    });

  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch contacts'
    });
  }
});

// PUT /api/contact/:id - Update contact status (admin only)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    await db.collection('contacts').doc(id).update({
      status,
      notes: notes || null,
      updatedAt: new Date()
    });

    res.json({
      success: true,
      message: 'Contact updated successfully'
    });

  } catch (error) {
    console.error('Error updating contact:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update contact'
    });
  }
});

module.exports = router;
