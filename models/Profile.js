const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  username: {type: String, default: ''},
  city: {type: String, default: ''},
  image: {type: String, default: ''},
  gender: {type: String, default: ''},
  password: {type: String, default: ''},  
  timestamp: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('ProfileSchema', ProfileSchema);