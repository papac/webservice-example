const express = require('express');
const logger = require('morgan');
const jwt = require('jsonwebtoken');
const config = require('../config');
const mongoose = require('mongoose');
const expiresIn = 86400;
const bcrypt = require('bcryptjs');
const User = require('../model/user');

const app = express();

// Connect mongo db
mongoose.connect(config.mongodb, {
  useNewUrlParser: true, 
  useCreateIndex: true
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (typeof email === 'undefined') {
    return res.send({
      message: 'email or password is not valide !',
      error: true
    });
  }

  if (typeof password === 'undefined') {
    return res.send({
      message: 'email or password is not valide !',
      error: true
    });
  }
  
  User.findOne({ email }, (err, user) => {
    if (err || !bcrypt.compareSync(password, user.password)) {
      return res.status(500).send({
        message: 'email or password is not valide !',
        error: true
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email, 
        exp: expiresIn
      }, 
      config.secret
    );

    res.send({
      message: 'authenticated',
      error: false, 
      token,
      expiresIn
    });
  });
});

app.post('/register', (req, res) => {
  const { email, password, name } = req.body;

  const data = {
    name: name,
    email: email, 
    password: bcrypt.hashSync(password)
  };

  User.create(data, (err, user) => {
    if (err) {
      return res.status(500).send({
        message: 'email or password is invalide !',
        error: true
      });
    }

    const token = jwt.sign(      {
      id: user._id,
      name: user.name,
      email: user.email, 
      exp: expiresIn
    }, config.secret);

    res.send({
      message: 'authenticated',
      error: false, 
      token,
      expiresIn
    });
  })
});

app.post('/verify', (req, res) => {
  const token = req.headers['x-access-token'];

  if (typeof token === 'undefined') {
    return res.send({
      message: 'Token is undefined', 
      error: false
    });
  }

  jwt.verify(token.trim(), config.secret, (err, decode) => {
    if (err) {
      switch (err.name) {
        case 'TokenExpiredError': {
          return res.status(500).send({
            message: 'Token is expirated', 
            error: true
          })
        }
        case 'JsonWebTokenError': {
          return res.status(500).send({
            message: 'An error in your Token ', 
            error: true
          })
        }
        default: {
          return res.status(500).send({
            message: 'Token is invalide', 
            error: true
          });
        }
      }
    }

    User.findById(decode._id, err => {
      if (err) {
        return res.status(500).send({
          message: 'Token is invalide', 
          error: true
        });
      }

      return res.send({
        message: "Ok", 
        error: false, 
        token, 
        decode
      });
    });
  });
});

module.exports = app;