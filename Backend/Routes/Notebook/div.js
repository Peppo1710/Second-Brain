const express = require('express');
const divRouter = express.Router();
const mongoose = require('mongoose');
const { Division, Notebook } = require('../../models/notebookSchema');
const authMiddleware = require('../../middleware/userMiddleware');

// ---------------- Helpers ----------------
function clampOrder(arr) {
  arr.sort((a, b) => a.order - b.order);
  for (let i = 0; i < arr.length; i++) arr[i].order = i;
}

// ---------------- Routes ----------------

// Create Division (Page)
divRouter.post('/create/:notebookId', authMiddleware, async (req, res) => {
  try {
    const { notebookId } = req.params;
    const { title, subTitle, content, order } = req.body;

    if (!mongoose.isValidObjectId(notebookId)) {
      return res.status(400).json({ error: 'Invalid notebookId' });
    }
    if (!title) return res.status(400).json({ error: 'Title required' });

    // Check notebook belongs to user
    const notebook = await Notebook.findOne({ _id: notebookId, userId: req.user.id });
    if (!notebook) return res.status(404).json({ error: 'Notebook not found' });

    // Create division
    const division = new Division({
      notebookId,
      title,
      subTitle,
      content: content || [],
      order: typeof order === 'number' ? order : notebook.divisions.length
    });

    await division.save();

    // Add reference to notebook
    notebook.divisions.push(division._id);
    await notebook.save();

    res.status(201).json(division);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all divisions of a notebook
divRouter.get('/notebook/:notebookId', authMiddleware, async (req, res) => {
  try {
    const { notebookId } = req.params;
    if (!mongoose.isValidObjectId(notebookId)) {
      return res.status(400).json({ error: 'Invalid notebookId' });
    }

    const notebook = await Notebook.findOne({ _id: notebookId, userId: req.user.id });
    if (!notebook) return res.status(404).json({ error: 'Notebook not found' });

    const divisions = await Division.find({ notebookId }).sort({ order: 1, updatedAt: -1 });
    res.json(divisions);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single division
divRouter.get('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid divisionId' });
    }

    const division = await Division.findById(id).populate('notebookId');
    if (!division) return res.status(404).json({ error: 'Division not found' });

    // Ensure user owns notebook
    if (String(division.notebookId.userId) !== String(req.user.id)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    res.json(division);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update division
divRouter.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, subTitle, content, order } = req.body;

    const division = await Division.findById(id).populate('notebookId');
    if (!division) return res.status(404).json({ error: 'Division not found' });

    if (String(division.notebookId.userId) !== String(req.user.id)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    if (title !== undefined) division.title = title;
    if (subTitle !== undefined) division.subTitle = subTitle;
    if (content !== undefined) division.content = content;
    if (order !== undefined) division.order = order;

    division.updatedAt = new Date();
    await division.save();

    res.json(division);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete division
divRouter.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const division = await Division.findById(id).populate('notebookId');
    if (!division) return res.status(404).json({ error: 'Division not found' });

    if (String(division.notebookId.userId) !== String(req.user.id)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    // Remove reference from notebook
    await Notebook.findByIdAndUpdate(division.notebookId._id, {
      $pull: { divisions: division._id }
    });

    await division.deleteOne();

    res.json({ message: 'Division deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = divRouter;
