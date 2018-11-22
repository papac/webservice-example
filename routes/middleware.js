const axios = require('axios');

module.exports = (User) => (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (typeof token === 'undefined') {
    return res.send({message: 'Token is invalide', error: true});
  }

  axios({
    url: 'http://localhost:3000/verify', 
    headers: {'x-access-token': token},
    method:'post',
  }).then(function (res) {
    const {message, error} = res.data;
    if (!error) {
      req.decode = res.data['decode'];
      return next(req);
    }
    res.send(res.data);
  }).catch(() => {
    return res.send({
      message: 'Token is invalide', 
      error: true
    });
  });
};