const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../db.js');
const { userRegisterSchema, userLoginSchema } = require('../../Models/model.js');

const userAuth = express.Router();

const JWT_SECRET = "secret_key";

userAuth.post('/register', async (req, res) => {
  try {
    const data = userRegisterSchema.parse(req.body);

    // Check if user exists
    const existingUser = await User.findOne({ username: data.username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const newUser = new User({
      ...data,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: err.errors });
    }
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userAuth.post('/login', async (req, res) => {
  try {
    const { username, password } = userLoginSchema.parse(req.body);

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: "Login successful", token });

  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token" });
  }
}

userAuth.get('/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userAuth.put('/update', authMiddleware, async (req, res) => {
  try {
    const allowedUpdates = ['firstName', 'lastName', 'age', 'phone'];
    const updates = {};

    for (let key of allowedUpdates) {
      if (req.body[key]) {
        updates[key] = req.body[key];
      }
    }

    const user = await User.findByIdAndUpdate(req.userId, updates, { new: true }).select('-password');
    res.json({ message: "User updated", user });

  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = userAuth;
