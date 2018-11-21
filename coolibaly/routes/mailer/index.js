const express = require('express')
const router = express.Router();
const nodemailer = require('nodemailer');
const code = {
  VALIDATION: 1000,
  EMAIL_INVALID: 10001,
  ERROR: 1002,
  SUCCESS: 1003
}

const reEmail = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

const checkEmail = (email) => reEmail.test(email);

router.post('/check', (req, res) => {
  const { email } = req.body;

  if (typeof email === 'undefined') {
    res.send({
      message: 'Please add email for verification', 
      error: true, 
      code: code.ERROR
    });
  }

  if (checkEmail(email)) {
    return res.send({
      message: "Email is valide", 
      error: false, 
      code: code.EMAIL_INVALID
    });
  }

  return res.send({
    message: 'Email is not valide', 
    error: true, 
    code: code.SUCCESS
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
  for (field of ['subject', 'to', 'from', 'text']) {
    if (typeof req.body[field] === 'undefined') {
      validation.push(field);
    }
  }

  // Check validation
  if (validation.length > 0) {
    return res.send({
      message: 'You have omit ' + validation.join(', '), 
      error: true, 
      code: code.VALIDATION
    });
  }
  
  // Destructurate body 
  const { subject, to, from, text } = req.body;
  
  // Formatage message
  const message = {
    from: process.env.EMAIL_FROM || from,
    to: to,
    subject: subject,
    html: text
  };

  // Send email
  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.error(err);
      return res.send({message: "An error occured", error: true, code: code.ERROR});
    }

    res.send({message: 'Message sent', error: false, code: code.SUCCESS});
  });
});

module.exports = router;