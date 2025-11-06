const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../../Models/userDbSchema.js');

const router = express.Router();

require('dotenv').config()



// Tell passport how to talk to Google
passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback",
}, 
async (accessToken, refreshToken, profile, done) => {
  try {
    // console.log('Full Google Profile:', JSON.stringify(profile, null, 2));
    const email = profile.emails?.[0]?.value;
    const firstName = profile.name?.givenName || 'User';
    const lastName  = profile.name?.familyName || 'Google';
    // console.log('Extracted Info:', { email, firstName, lastName });

    let existingUser = await User.findOne({ username: email });

    // Your case 3A rule: if manual & unverified, delete
    if (existingUser && existingUser.provider === 'local' && !existingUser.isVerified) {
      await User.deleteOne({ _id: existingUser._id });
      existingUser = null;
    }
    if (existingUser && existingUser.provider === 'local' && existingUser.isVerified) {
      return done(null, false, { message: "Account exists, login via email" });
      
    }

    if (!existingUser) {
      const newUser = new User({
        username: email,
        firstName,
        lastName,
        provider: 'google',
        isVerified: true,
        // password stays null because provider is 'google'
      });
      await newUser.save();
      return done(null, newUser);
    }

    // if exists (local or google) and verified → login
    return done(null, existingUser);

  } catch (err) {
    return done(err);
  }
}));


// Save user in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Get user from session
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

// Route 1: Start Google Login
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Route 2: Google Callback
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login-failed' }),
  (req, res) => {
    // res.send("Google login successful");
    const username = encodeURIComponent(req.user.username || req.user.email || '');
        return res.redirect(`http://127.0.0.1:5500/temp.html?username=${username}`);
  }

  
);

module.exports = router;
