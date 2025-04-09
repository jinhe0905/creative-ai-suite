/**
 * API Routes
 */

const express = require('express');
const textGenerationRoutes = require('./textGeneration.routes');
const projectRoutes = require('./project.routes');

const router = express.Router();

// Health check route
router.get('/', (req, res) => {
  res.status(200).json({
    service: 'text-engine',
    status: 'active',
    version: '1.0.0',
  });
});

// Mount API routes
router.use('/generate', textGenerationRoutes);
router.use('/projects', projectRoutes);

module.exports = router; 