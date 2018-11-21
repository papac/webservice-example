const express = require('express');
const logger = require('morgan');
const uploaderRouter = require('../routes/uploader');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', uploaderRouter);

module.exports = app;