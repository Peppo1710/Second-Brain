const mongoose = require('mongoose');

const LinkSchema = new mongoose.Schema({
  platform: { 
    type: String, 
    enum: ['youtube', 'instagram', 'linkedin', 'other'], 
    default: 'other' 
  },
  url: { type: String, required: true },
  title: { type: String },
  thumbnail: { type: String },
  authorName: { type: String }
}, { _id: false });

const ContentSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['text', 'link'], 
    required: true 
  },
  value: { 
    type: String, 
    required: true 
  },
  linkMeta: { 
    type: LinkSchema,
    required: function() { return this.type === 'link'; } 
  }
}, { _id: false });

/** Division (Page) Schema */
const DivisionSchema = new mongoose.Schema({
  notebookId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Notebook', 
    required: true, 
    index: true 
  },
  title: { type: String, required: true, trim: true },
  subTitle: { type: String, trim: true },
  content: [ContentSchema],
  order: { type: Number, default: 0 }
}, { timestamps: true });

/** Notebook Schema */
const NotebookSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: { type: String, required: true },
  description: { type: String },
  divisions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Division' }]
}, { timestamps: true });

/** Models */
const Division = mongoose.model('Division', DivisionSchema);
const Notebook = mongoose.model('Notebook', NotebookSchema);

module.exports = { Division, Notebook };
