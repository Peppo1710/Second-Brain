// models/Notebook.js
const mongoose = require('mongoose');

const EmbedSchema = new mongoose.Schema({
  platform: { type: String, enum: ['youtube','instagram','linkedin','other'], default: 'other' },
  url: { type: String, required: true },
  title: { type: String },        // optional metadata (scraped later)
  thumbnail: { type: String },    // optional
  authorName: { type: String },
}, { _id: false });

const DivSchema = new mongoose.Schema({
  type: { type: String, enum: ['text','embed'], required: true },
  content: { type: String },     // markdown for text, plain fallback
  embed: { type: EmbedSchema },  // for embed-type divs
  order: { type: Number, required: true, index: true }, // ordering inside notebook
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Notebook: user owns many notebooks
const NotebookSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true },
  description: { type: String },
  divs: { type: [DivSchema], default: [] },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

// Update `updatedAt` when saving
NotebookSchema.pre('save', function(next){
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Notebook', NotebookSchema);
