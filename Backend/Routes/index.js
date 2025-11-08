const express = require('express');
const userAuth = require('./Auth/userAuth');
const notebookRouter = require('./Notebook/notebook');
const divRouter = require('./Notebook/div');
const googleAuth = require('./Auth/googleAuth')
const paymentRouter = require('./payment/create-order')

const mainRouting = express.Router();


mainRouting.use('/user', userAuth);
mainRouting.use('/', googleAuth);
mainRouting.use('/notebook', notebookRouter);
mainRouting.use('/div', divRouter);
mainRouting.use('/payments', paymentRouter);
// Auth.get('/admin', adminAuth);

module.exports = mainRouting;