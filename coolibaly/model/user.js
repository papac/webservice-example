var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({ 
  name: {
    type: String, 
    required: true
  },
  email: {
    type: String, 
    required: true,
    unique: true
  },
  password: {
    type: String, 
    required: true
  },
  avatar: String,
  contacts: [{
    email: String, 
    name: String
  }],
  compagns: [{
    title: String, 
    description: String
  }],
  date: {
    type: Date, 
    default: Date.now
  }
}));