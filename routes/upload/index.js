const express = require('express')
const router = express.Router;
const expressFileUpload = require('express-fileupload');

router.use(expressFileUpload({
  limits: 1024 * 20
}));

router.get('/', (req, res) => {
  
});