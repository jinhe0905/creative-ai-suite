/**
 * Text Generation Controller
 * 
 * Handles requests for text generation and manipulation
 */

const { generateText, editText, analyzeText } = require('../services/openai.service');
const TextProject = require('../models/textProject.model');
const logger = require('../utils/logger');

/**
 * Generate text based on a prompt
 */
async function generateTextContent(req, res) {
  try {
    const { prompt, options } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    
    const generatedText = await generateText(prompt, options);
    
    res.status(200).json({
      success: true,
      data: {
        text: generatedText,
        prompt,
        timestamp: new Date().toISOString(),
      }
    });
  } catch (error) {
    logger.error(`Text generation error: ${error.message}`);
    res.status(500).json({ error: 'Failed to generate text', details: error.message });
  }
}

/**
 * Edit or refine existing text
 */
async function editTextContent(req, res) {
  try {
    const { text, instructions, options } = req.body;
    
    if (!text || !instructions) {
      return res.status(400).json({ error: 'Text and instructions are required' });
    }
    
    const editedText = await editText(text, instructions, options);
    
    res.status(200).json({
      success: true,
      data: {
        originalText: text,
        editedText,
        instructions,
        timestamp: new Date().toISOString(),
      }
    });
  } catch (error) {
    logger.error(`Text editing error: ${error.message}`);
    res.status(500).json({ error: 'Failed to edit text', details: error.message });
  }
}

/**
 * Analyze text and provide feedback
 */
async function analyzeTextContent(req, res) {
  try {
    const { text, criteria } = req.body;
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }
    
    const analysis = await analyzeText(text, criteria);
    
    res.status(200).json({
      success: true,
      data: analysis
    });
  } catch (error) {
    logger.error(`Text analysis error: ${error.message}`);
    res.status(500).json({ error: 'Failed to analyze text', details: error.message });
  }
}

/**
 * Generate content for an existing project
 */
async function generateProjectContent(req, res) {
  try {
    const { projectId } = req.params;
    const { prompt, options } = req.body;
    
    // Find the project
    const project = await TextProject.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Check user authorization (simplified for now)
    if (project.userId !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to modify this project' });
    }
    
    // Generate new content
    const newContent = await generateText(prompt, options);
    
    // Create a version of the current content before updating
    if (project.content) {
      await project.createVersion('Pre-generation save');
    }
    
    // Update the project
    project.content = newContent;
    await project.save();
    
    res.status(200).json({
      success: true,
      data: {
        projectId,
        title: project.title,
        content: project.content,
        stats: project.stats,
      }
    });
  } catch (error) {
    logger.error(`Project content generation error: ${error.message}`);
    res.status(500).json({ error: 'Failed to generate project content', details: error.message });
  }
}

module.exports = {
  generateTextContent,
  editTextContent,
  analyzeTextContent,
  generateProjectContent,
}; 