const jwt = require('jsonwebtoken');
const config = require('../../config');
const router = require('express').Router();

const mongoose = require('mongoose');
const expiresIn = 86400;
const bcrypt = require('bcryptjs');
const User = require('../../model/user');

// Connect mongo db
mongoose.connect(config.mongodb, { useNewUrlParser: true });

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  User.findOne({ email }, (err, user) => {
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
  const data = {
    name: name,
    email: email, 
    password: bcrypt.hashSync(password),
    contacts: [],
    compagns: []
  };

  User.create(data, (err, user) => {
    if (err) {
      return res.status(500).send({
        message: 'email or password is not valide !',
        error: true
      });
    }

    const token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn
    });

    res.send({
      message: 'authenticated',
      error: false, 
      token,
      expiresIn
    });
  })
});

router.post('/check', (req, res) => {
  const token = req.headers['x-access-token'];

  if (typeof token === 'undefined') {
    return res.send({message: 'Token is not valide', error: false});
  }

  jwt.verify(token, config.secret, (err, decode) => {
    if (err) {
      return res.status(500).send({message: 'Token is not valide', error: true});
    }

    User.findById(decode._id, err => {
      if (err) {
        return res.status(500).send({message: 'Token is not valide', error: true});
      }

      return res.send({message: "Ok", error: false, token});
    });
  });
});

module.exports = router;