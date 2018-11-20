const jwt = require('jsonwebtoken');
const config = require('./config');
const router = require('express').Router();
const mongoose = require('mongoose');
const expiresIn = 86400;
const bcrypt = require('bcryptjs');
const User = mongoose.model('User', require('../../model/user'));

router.post('login', (req, res) => {
  const { email, password } = req.body;
  
  User.find({email}, (err, user) => {
    if (err || !bcrypt.compareSync(password, user.password)) {
      return res.status(500).send({
        message: 'email or password is not valide !',
        error: true
      });
    }

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn // expires in 24 hours
    });

    res.send({
      message: 'authenticated',
      error: false, 
      token,
      expiresIn
    });
  });
});

router.post('/register', (req, res) => {
  const { email, password, name } = req.body;
  
  User.create({email, password: bcrypt.hashSync(password)}, (err, user) => {
    if (err || !bcrypt.compareSync(password, user.password)) {
      return res.status(500).send({
        message: 'email or password is not valide !',
        error: true
      });
    }

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn // expires in 24 hours
    });

    res.send({
      message: 'authenticated',
      error: false, 
      token,
      expiresIn
    });
  });
});

router.post('check', (req, res) => {
  const [, token] = req.headers['authorization'].split(/Bearer\s+?/i);

  jwt.verify(token, config.secret, (err, decode) => {
    if (err) {
      return res.status(500).send({message: 'Token is not valide', error: true});
    }

    return res.send({message: "Ok", error: false, decode});
  });
});

