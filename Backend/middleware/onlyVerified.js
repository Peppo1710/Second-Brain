const express = require('express');
const { User } = require('../models/userDbSchema');

async function onlyVerified(req, res, next) {
    try {
        const username = req.user?.username;
        if (!username) {
            return res.status(401).json({ success: false, message: 'User not authenticated' });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!user.isVerified) {
            return res.status(403).json({ success: false, message: 'User not verified' });
        }

        next();
    } catch (error) {
        return res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
}