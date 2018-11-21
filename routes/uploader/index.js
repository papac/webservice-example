const express = require('express')
const router = express.Router();
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const md5 = require('md5');
const storage = path.resolve(__dirname + '/../../storage');

router.get('/url', (req, res) => {
  const { filename } = req.query
  fs.exists(path.join(storage, filename), (exists, err) => {
    if (!exists) {
      console.log(err);
      return res.status(404).send('File not found');
    }

    res.download(path.join(storage, filename), filename);
  });
});

router.use(fileUpload({
  limits: 1024 * 20
}));

router.post('/upload', (req, res) => {
  if (typeof req.files === 'undefined' || Object.keys(req.files).length == 0) {
    return res.status(500).send({
      message: 'Can not upload file, because file is empty', 
      error: true
    });
  }

  const { file } = req.files;
  const extension = path.parse(file.name).ext;
  const hashname = md5(file.name);

  file.mv(`${storage}/${hashname}${extension}`, (err) => {
    if (err) {
      return res.status(500).send({
        message: err,
        error: true
      });
    }

    res.status(201).send({
      message: 'File uploaded!', 
      error: false,
      filename: `${hashname}${extension}`
    });
  });
});

module.exports = router;