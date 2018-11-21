var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('Material', new Schema({ 
  filename: String, 
  hashname: String, 
  size: Number,
  path: String,
  url: String
}));