const express = require('express');
const userAuth = require('./Auth/userAuth');
const notebookRouter = require('./Notebook/notebook');
const divRouter = require('./Notebook/div');

const mainRouting = express.Router();


mainRouting.use('/user', userAuth);
mainRouting.use('/notebook', notebookRouter);
mainRouting.use('/div', divRouter);
// Auth.get('/admin', adminAuth);

module.exports = mainRouting;