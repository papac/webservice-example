const express = require('express');
const logger = require('morgan');
const nodemailer = require('nodemailer');
const config = require('../config');
const mongoose = require('mongoose');
const reEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const verifyToken = require('../middleware/verify-token');

const app = express();

// Connect mongo db
mongoose.connect(config.mongodb, {
  useNewUrlParser: true,
  useCreateIndex: true
});

// Load verifiy token middleware
app.use(verifyToken(
  require('../model/user')
));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const checkEmail = (email) => reEmail.test(email);

app.post('/verify', (req, res) => {
  const { email } = req.body;

  if (typeof email === 'undefined') {
    res.send({
      message: 'Please add email for verification', 
      error: true
    });
  }

  if (checkEmail(email)) {
    return res.send({
      message: "Email is valide", 
      error: false
    });
  }

  return res.send({
    message: 'Email is not valide', 
    error: true
  });
});

app.post('/process', (req, res) => {
  
  const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: 1025,
    ignoreTLS: true,
    secure: false
  });

  let validation = [];

  // Make validation
  for (field of ['subject', 'to', 'text']) {
    if (typeof req.body[field] === 'undefined') {
      validation.push(field);
    }
  }

  // Check validation
  if (validation.length > 0) {
    return res.send({
      message: 'You have omit ' + validation.join(', '), 
      error: true
    });
  }
  
  // Destructurate body 
  const { subject, to, text } = req.body;
  const form = req.body.form || process.env.EMAIL_FROM || 'mailer@test.dev';
  
  // Formatage message
  const message = {
    from: form,
    to: to,
    subject: subject,
    html: text
  };

  // Send email
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.error(err);
      return res.send({message: "An error occured", error: true});
    }

    res.send({message: 'Message sent', error: false});
  });
});

module.exports = app;