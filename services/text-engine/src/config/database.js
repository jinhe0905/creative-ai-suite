/**
 * Database Connection Configuration
 */

const mongoose = require('mongoose');
const logger = require('../utils/logger');

/**
 * Connect to MongoDB database
 */
async function connectDatabase() {
  try {
    const connectionString = process.env.DB_CONNECTION_STRING || 'mongodb://localhost:27017/text_engine';
    
    // Configure mongoose connection
    mongoose.set('strictQuery', false);
    
    // Connect to MongoDB
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    logger.info('Connected to MongoDB');
  } catch (error) {
    logger.error(`MongoDB connection error: ${error.message}`);
    throw error;
  }
}

/**
 * Disconnect from MongoDB database
 */
async function disconnectDatabase() {
  try {
    await mongoose.disconnect();
    logger.info('Disconnected from MongoDB');
  } catch (error) {
    logger.error(`MongoDB disconnection error: ${error.message}`);
    throw error;
  }
}

module.exports = {
  connectDatabase,
  disconnectDatabase,
}; 