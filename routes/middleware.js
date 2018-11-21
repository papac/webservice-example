const axios = require('axios');

module.exports = (User) => (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (typeof token === 'undefined') {
    return res.send({message: 'Token is invalid', error: true});
  }

  axios({
    url: 'http://localhost:3003/verify', 
    headers: {'x-access-token': token},
    method:'post',
  }).then(function (res) {
    console.log(res.data, 'Hello world')
  }).catch(err => {
    return res.send({message: 'Token is invalid', error: true});
  });
};