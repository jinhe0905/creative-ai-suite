/**
 * Text Project Model
 * 
 * Schema definition for text-based creative projects
 */

const mongoose = require('mongoose');

const textVersionSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  description: {
    type: String,
    default: '',
  },
});

const textProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    default: '',
  },
  content: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    enum: ['article', 'blog', 'script', 'story', 'copy', 'other'],
    default: 'article',
  },
  tags: [{
    type: String,
    trim: true,
  }],
  userId: {
    type: String,
    required: true,
    index: true,
  },
  status: {
    type: String,
    enum: ['draft', 'in_progress', 'completed', 'archived'],
    default: 'draft',
  },
  versions: [textVersionSchema],
  settings: {
    language: {
      type: String,
      default: 'en',
    },
    tone: {
      type: String,
      default: 'neutral',
    },
    targetAudience: {
      type: String,
      default: '',
    },
    aiModel: {
      type: String,
      default: 'gpt-4',
    },
  },
  stats: {
    wordCount: {
      type: Number,
      default: 0,
    },
    readingTime: {
      type: Number,
      default: 0,
    },
    lastAnalysis: {
      type: Date,
      default: null,
    },
  },
  collaborators: [{
    userId: String,
    role: {
      type: String,
      enum: ['viewer', 'editor', 'admin'],
      default: 'viewer',
    },
  }],
}, {
  timestamps: true,
});

// Middleware to update word count and reading time
textProjectSchema.pre('save', function(next) {
  if (this.isModified('content')) {
    // Calculate word count
    this.stats.wordCount = this.content.split(/\s+/).filter(Boolean).length;
    
    // Estimate reading time (words per minute)
    const wordsPerMinute = 200;
    this.stats.readingTime = Math.ceil(this.stats.wordCount / wordsPerMinute);
  }
  next();
});

// Create a text version before updating content
textProjectSchema.methods.createVersion = async function(description = '') {
  if (!this.content) return;
  
  const newVersion = {
    content: this.content,
    description: description || `Version ${this.versions.length + 1}`,
    timestamp: new Date(),
  };
  
  this.versions.push(newVersion);
  await this.save();
  
  return newVersion;
};

// Factory method to create a new text project
textProjectSchema.statics.createProject = async function(projectData) {
  const project = new this(projectData);
  await project.save();
  return project;
};

const TextProject = mongoose.model('TextProject', textProjectSchema);

module.exports = TextProject; 