const express = require('express');
const { body, validationResult } = require('express-validator');
const { db, storage } = require('../config/firebase');
const { authenticateToken, requireRole } = require('../middleware/auth');
const router = express.Router();

// Validation middleware
const validateProject = [
  body('title')
    .trim()
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('description')
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('category')
    .isIn(['web-development', 'mobile-apps', 'ui-ux-design', 'digital-marketing'])
    .withMessage('Please select a valid category'),
  body('technologies')
    .isArray({ min: 1 })
    .withMessage('At least one technology must be specified'),
  body('client')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Client name must be less than 100 characters'),
  body('projectUrl')
    .optional()
    .isURL()
    .withMessage('Please provide a valid project URL'),
  body('githubUrl')
    .optional()
    .isURL()
    .withMessage('Please provide a valid GitHub URL')
];

// GET /api/projects - Get all projects
router.get('/', async (req, res) => {
  try {
    const { category, limit = 10, page = 1 } = req.query;
    
    let query = db.collection('projects').where('published', '==', true);
    
    if (category) {
      query = query.where('category', '==', category);
    }
    
    const projectsSnapshot = await query
      .orderBy('createdAt', 'desc')
      .limit(parseInt(limit))
      .offset((parseInt(page) - 1) * parseInt(limit))
      .get();

    const projects = [];
    projectsSnapshot.forEach(doc => {
      projects.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({
      success: true,
      projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total: projects.length
      }
    });

  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch projects'
    });
  }
});

// GET /api/projects/:id - Get single project
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const projectDoc = await db.collection('projects').doc(id).get();

    if (!projectDoc.exists) {
      return res.status(404).json({
        error: 'Project not found',
        message: 'The requested project does not exist'
      });
    }

    const projectData = projectDoc.data();

    // Only return published projects to public
    if (!projectData.published && !req.user) {
      return res.status(404).json({
        error: 'Project not found',
        message: 'The requested project does not exist'
      });
    }

    res.json({
      success: true,
      project: {
        id,
        ...projectData
      }
    });

  } catch (error) {
    console.error('Error fetching project:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch project'
    });
  }
});

// POST /api/projects - Create new project (admin only)
router.post('/', authenticateToken, requireRole('admin'), validateProject, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const {
      title,
      description,
      category,
      technologies,
      client,
      projectUrl,
      githubUrl,
      images,
      featured
    } = req.body;

    const projectData = {
      title,
      description,
      category,
      technologies,
      client: client || null,
      projectUrl: projectUrl || null,
      githubUrl: githubUrl || null,
      images: images || [],
      featured: featured || false,
      published: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: req.user.uid
    };

    const projectRef = await db.collection('projects').add(projectData);

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      projectId: projectRef.id
    });

  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to create project'
    });
  }
});

// PUT /api/projects/:id - Update project (admin only)
router.put('/:id', authenticateToken, requireRole('admin'), validateProject, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Validation failed',
        details: errors.array()
      });
    }

    const { id } = req.params;
    const {
      title,
      description,
      category,
      technologies,
      client,
      projectUrl,
      githubUrl,
      images,
      featured,
      published
    } = req.body;

    const updateData = {
      title,
      description,
      category,
      technologies,
      client: client || null,
      projectUrl: projectUrl || null,
      githubUrl: githubUrl || null,
      images: images || [],
      featured: featured || false,
      published: published || false,
      updatedAt: new Date()
    };

    await db.collection('projects').doc(id).update(updateData);

    res.json({
      success: true,
      message: 'Project updated successfully'
    });

  } catch (error) {
    console.error('Error updating project:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to update project'
    });
  }
});

// DELETE /api/projects/:id - Delete project (admin only)
router.delete('/:id', authenticateToken, requireRole('admin'), async (req, res) => {
  try {
    const { id } = req.params;

    // Get project data to delete associated images
    const projectDoc = await db.collection('projects').doc(id).get();
    
    if (!projectDoc.exists) {
      return res.status(404).json({
        error: 'Project not found',
        message: 'The project does not exist'
      });
    }

    const projectData = projectDoc.data();

    // Delete associated images from storage
    if (projectData.images && projectData.images.length > 0) {
      for (const imageUrl of projectData.images) {
        try {
          const imagePath = imageUrl.split('/o/')[1]?.split('?')[0];
          if (imagePath) {
            const decodedPath = decodeURIComponent(imagePath);
            await storage.bucket().file(decodedPath).delete();
          }
        } catch (imageError) {
          console.error('Error deleting image:', imageError);
        }
      }
    }

    // Delete project document
    await db.collection('projects').doc(id).delete();

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to delete project'
    });
  }
});

// GET /api/projects/featured - Get featured projects
router.get('/featured/featured', async (req, res) => {
  try {
    const projectsSnapshot = await db.collection('projects')
      .where('featured', '==', true)
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(6)
      .get();

    const projects = [];
    projectsSnapshot.forEach(doc => {
      projects.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json({
      success: true,
      projects
    });

  } catch (error) {
    console.error('Error fetching featured projects:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: 'Failed to fetch featured projects'
    });
  }
});

module.exports = router;
