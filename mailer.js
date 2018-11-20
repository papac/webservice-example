const express = require('express');
const logger = require('morgan');
const mailerRouter = require('./routes/mailer');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', mailerRouter);

module.exports = app;