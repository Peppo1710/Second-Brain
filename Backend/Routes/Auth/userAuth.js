const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const {User,VerificationToken} = require('../../Models/userDbSchema.js');
const {userRegisterSchema,userLoginSchema} = require('../../Models/model.js');
const {sendVerificationEmail,sendLoginAlertEmail} = require('./utils/sendVerMail.js')
const authMiddleware = require('../../middleware/userMiddleware.js')

const userAuth = express.Router();

require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || "";

userAuth.post('/register', async (req, res) => {
  try {
    const data = userRegisterSchema.parse(req.body);

    // Check if user exists
    const existingUser = await User.findOne({ username: data.username });

    if (existingUser) {
      if (!existingUser.isVerified) {
        return res.status(400).json({ error: "User already exists but not verified" });
        // Make them send the email again if the old email is not verified . let frontend give them option to get to this page
      }
      if (existingUser.isVerified && existingUser.provider=='local') {
        return res.status(400).json({ error: "User already exists, please try to login" });
      }
      if (existingUser.isVerified && existingUser.provider=='google') {
        return res.status(400).json({ error: "User already exists, please try to login with google" });
      }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(data.password, 10);

    // Create user
    const newUser = new User({
      ...data,
      password: hashedPassword,
      isVerified: false,
      provider: 'local',
      
    });

    await newUser.save();

    const token = crypto.randomBytes(32).toString('hex');
    const createdAt = new Date(); // current date and time
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Save token in VerificationToken collection
    const verificationToken = new VerificationToken({
      userId: newUser._id,
      token,
      createdAt,
      expiresAt,
      used: false,
    });
    
    await verificationToken.save();

    // Send verification email
    await sendVerificationEmail(newUser.username, token);

    res.status(201).json({ message: "User registered successfully , Check mail to verify account " });

  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: err.errors });
    }
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

userAuth.get('/verify', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) return res.status(400).send('Token required');

    const tokenDoc = await VerificationToken.findOne({ token, used: false });
    if (!tokenDoc) return res.status(400).send('Invalid or expired token');

    if (tokenDoc.expiresAt < new Date()) return res.status(400).send('Token expired');

    // Mark token as used
    tokenDoc.used = true;
    await tokenDoc.save();

    // Verify user
    const user = await User.findById(tokenDoc.userId);
    if (!user) return res.status(404).send('User not found');

    user.isVerified = true;
    await user.save();

    res.send('Email verified successfully!');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

userAuth.post('/resend-mail', async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) return res.status(400).send('Email required');

    const user = await User.findOne({ username });
    if (!user) return res.status(404).send('User not found');
    if (user.isVerified) return res.status(400).send('User already verified');

    let tokenDoc = await VerificationToken.findOne({
      userId: user._id,
      used: false,
    }).sort({ createdAt: -1 });

    const now = new Date();

    if (!tokenDoc || tokenDoc.expiresAt < now) {
      // Generate new token if none exists or expired
      const newToken = crypto.randomBytes(32).toString('hex');
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

      // Mark old token as used if exists
      if (tokenDoc) {
        tokenDoc.used = true;
        await tokenDoc.save();
      }

      tokenDoc = new VerificationToken({
        userId: user._id,
        token: newToken,
        expiresAt,
      });
      await tokenDoc.save();
    }

    // Send email with valid token
    await sendVerificationEmail(email, tokenDoc.token);

    res.send('Verification email resent.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


userAuth.post('/login', async (req, res) => {
  try {
    const { username, password } = userLoginSchema.parse(req.body);

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "Invalid username or password" });
    }
    if (!user.isVerified) {
      return res.status(400).json({ error: "Please verify your email before logging in" });
    }

    // Check cooldown lock
    if (user.lockUntil && user.lockUntil > new Date()) {
      return res.status(403).json({ 
        error: `Account locked. Try again after ${user.lockUntil.toLocaleTimeString()}` 
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      // Increase login attempts
      user.loginAttempts = (user.loginAttempts || 0) + 1;

      if (user.loginAttempts >= 3) {
        // Lock for 10 minutes
        user.lockUntil = new Date(Date.now() + 10 * 60 * 1000);

        // Send alert email (make sure sendLoginAlertEmail is imported)
        await sendLoginAlertEmail(user.username);

        await user.save();
        return res.status(403).json({ error: "Too many failed attempts. Account locked for 10 minutes." });
      }

      await user.save();
      return res.status(401).json({ error: "Invalid username or password" });
    }

    // Successful login: reset attempts and lock
    user.loginAttempts = 0;
    user.lockUntil = null;
    await user.save();

    // Generate token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ message: "Login successful", token, username: user.username });
    // Frontend will take this and store this in the localstorage acting as a session. 

  } catch (err) {
    if (err.name === 'ZodError') {
      return res.status(400).json({ error: err.errors });
    }
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


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
