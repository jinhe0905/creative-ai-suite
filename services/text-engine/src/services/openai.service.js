/**
 * OpenAI Service
 * 
 * Handles interaction with OpenAI API for text generation and editing.
 */

const { OpenAI } = require('openai');
const logger = require('../utils/logger');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Generate text based on prompt
 * 
 * @param {string} prompt - The text prompt for generation
 * @param {object} options - Generation options
 * @returns {Promise<string>} - Generated text
 */
async function generateText(prompt, options = {}) {
  try {
    const defaultOptions = {
      model: 'gpt-4',
      max_tokens: 1000,
      temperature: 0.7,
    };

    const response = await openai.chat.completions.create({
      model: options.model || defaultOptions.model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: options.max_tokens || defaultOptions.max_tokens,
      temperature: options.temperature || defaultOptions.temperature,
    });

    return response.choices[0].message.content;
  } catch (error) {
    logger.error(`Text generation error: ${error.message}`);
    throw new Error(`Failed to generate text: ${error.message}`);
  }
}

/**
 * Rewrite or edit existing text
 * 
 * @param {string} text - Original text to edit
 * @param {string} instructions - Instructions for editing
 * @param {object} options - Editing options
 * @returns {Promise<string>} - Edited text
 */
async function editText(text, instructions, options = {}) {
  try {
    const defaultOptions = {
      model: 'gpt-4',
      max_tokens: 1500,
      temperature: 0.5,
    };

    const prompt = `Please edit the following text according to these instructions: "${instructions}"\n\nOriginal text:\n${text}`;

    const response = await openai.chat.completions.create({
      model: options.model || defaultOptions.model,
      messages: [{ role: 'user', content: prompt }],
      max_tokens: options.max_tokens || defaultOptions.max_tokens,
      temperature: options.temperature || defaultOptions.temperature,
    });

    return response.choices[0].message.content;
  } catch (error) {
    logger.error(`Text editing error: ${error.message}`);
    throw new Error(`Failed to edit text: ${error.message}`);
  }
}

/**
 * Analyze text and provide feedback
 * 
 * @param {string} text - Text to analyze
 * @param {string} criteria - Analysis criteria
 * @returns {Promise<object>} - Analysis results
 */
async function analyzeText(text, criteria = 'general') {
  try {
    let prompt;
    
    switch (criteria) {
      case 'seo':
        prompt = `Analyze the following text for SEO optimization. Provide an assessment of keyword usage, readability, and structure. Also suggest improvements:\n\n${text}`;
        break;
      case 'readability':
        prompt = `Analyze the following text for readability. Assess sentence complexity, vocabulary level, and overall clarity. Provide a readability score and suggestions for improvement:\n\n${text}`;
        break;
      case 'sentiment':
        prompt = `Analyze the sentiment of the following text. Identify the overall tone, emotional content, and any notable sentiment patterns:\n\n${text}`;
        break;
      default:
        prompt = `Provide a comprehensive analysis of the following text, including writing quality, clarity, structure, and overall effectiveness. Suggest improvements:\n\n${text}`;
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 1000,
      temperature: 0.3,
    });

    // Parse the analysis results
    const analysisText = response.choices[0].message.content;
    
    return {
      analysis: analysisText,
      criteria,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    logger.error(`Text analysis error: ${error.message}`);
    throw new Error(`Failed to analyze text: ${error.message}`);
  }
}

module.exports = {
  generateText,
  editText,
  analyzeText,
}; 