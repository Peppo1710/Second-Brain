const express = require('express');
const userAuth = require('./userAuth');
const adminAuth = require('./adminAuth')

const Auth = express.Router();

Auth.get('/user', userAuth);
// Auth.get('/admin', adminAuth);

module.exports = Auth;