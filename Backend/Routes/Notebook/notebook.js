// routes/notebooks.js
const express = require('express');
const notebookRouter = express.Router();
const {Notebook} = require('../../models/notebookSchema');
// const { requireAuth } = require('../middlewares/auth');
const mongoose = require('mongoose');
const authMiddleware = require('../../middleware/userMiddleware')

// Helpers
function clampOrder(arr) {
  // ensure orders are 0..n-1 continuous (optional)
  arr.sort((a,b) => a.order - b.order);
  for (let i=0;i<arr.length;i++) arr[i].order = i;
}

// Create notebook
notebookRouter.post('/create', authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ error: 'title required' });
    console.log();
    

    const nb = new Notebook({ userId: req.user.id, title, description });
    await nb.save();
    res.status(201).json(nb);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all notebooks for user
notebookRouter.get('/',authMiddleware, async (req, res) => {
  try {
    const notebooks = await Notebook.find({ userId: req.user.id }).sort({ updatedAt: -1 });
    res.json(notebooks);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single notebook (with divs) --- note required for now 
notebookRouter.get('/:id',authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) return res.status(400).json({ error: 'Invalid id' });

    const nb = await Notebook.findOne({ _id: id, userId: req.user._id });
    if (!nb) return res.status(404).json({ error: 'Notebook not found' });
    res.json(nb);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update notebook meta
/*Here we can face issue while having intergration , since the way we are sending query param is different so check if faced any issue */
notebookRouter.put('/:id',authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const nb = await Notebook.findOneAndUpdate(
      { _id: id, userId: req.user.id },
      { $set: { title, description, updatedAt: new Date() } },
      { new: true }
    );
    if (!nb) return res.status(404).json({ error: 'Notebook not found' });
    res.json(nb);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete notebook
notebookRouter.delete('/:id',authMiddleware, async (req, res) => {
  try {
    const nb = await Notebook.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!nb) return res.status(404).json({ error: 'Notebook not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

/* ---------------- Div routes inside a notebook ---------------- */

// // Add a new div
// router.post('/:id/divs', requireAuth, async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { type, content, embed } = req.body; // embed = { url, platform, title, thumbnail }
//     if (!['text','embed'].includes(type)) return res.status(400).json({ error: 'invalid type' });

//     const nb = await Notebook.findOne({ _id: id, userId: req.user._id });
//     if (!nb) return res.status(404).json({ error: 'Notebook not found' });

//     const nextOrder = nb.divs.length;
//     const newDiv = { type, content: content || '', embed: embed || undefined, order: nextOrder };
//     nb.divs.push(newDiv);
//     clampOrder(nb.divs);

//     await nb.save();
//     res.status(201).json(nb);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Update a div (content, embed, or re-order)
// router.put('/:id/divs/:divId', requireAuth, async (req, res) => {
//   try {
//     const { id, divId } = req.params;
//     const { content, embed, order } = req.body;

//     const nb = await Notebook.findOne({ _id: id, userId: req.user._id });
//     if (!nb) return res.status(404).json({ error: 'Notebook not found' });

//     const div = nb.divs.id(divId);
//     if (!div) return res.status(404).json({ error: 'Div not found' });

//     if (typeof content !== 'undefined') div.content = content;
//     if (typeof embed !== 'undefined') div.embed = embed;
//     if (typeof order !== 'undefined') div.order = order;

//     div.updatedAt = new Date();
//     clampOrder(nb.divs);
//     await nb.save();

//     res.json(nb);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Delete a div
// router.delete('/:id/divs/:divId', requireAuth, async (req, res) => {
//   try {
//     const { id, divId } = req.params;
//     const nb = await Notebook.findOne({ _id: id, userId: req.user._id });
//     if (!nb) return res.status(404).json({ error: 'Notebook not found' });

//     const div = nb.divs.id(divId);
//     if (!div) return res.status(404).json({ error: 'Div not found' });

//     div.remove();
//     clampOrder(nb.divs);
//     await nb.save();

//     res.json(nb);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

module.exports = notebookRouter;
