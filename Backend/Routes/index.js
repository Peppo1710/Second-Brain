const express = require('express');
const userAuth = require('./Auth/userAuth');
const notebookRouter = require('./Notebook/notebook');
const divRouter = require('./Notebook/div');
const googleAuth = require('./Auth/googleAuth')

const mainRouting = express.Router();


mainRouting.use('/user', userAuth);
mainRouting.use('/', googleAuth);
mainRouting.use('/notebook', notebookRouter);
mainRouting.use('/div', divRouter);
// Auth.get('/admin', adminAuth);

module.exports = mainRouting;