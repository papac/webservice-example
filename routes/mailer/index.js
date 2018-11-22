const express = require('express')
const router = express.Router();
const nodemailer = require('nodemailer');
const config = require('../../config');
const mongoose = require('mongoose');
const reEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const checkToken = require('../middleware');

// Connect mongo db
mongoose.connect(config.mongodb, { useNewUrlParser: true, useCreateIndex: true });

router.use(checkToken(require('../../model/user')));

const checkEmail = (email) => reEmail.test(email);

router.post('/verify', (req, res) => {
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

router.post('/process', (req, res) => {
  
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

module.exports = router;