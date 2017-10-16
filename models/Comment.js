const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  username: {type: String, default: ''},
  author: {type: mongoose.Schema.Types.Mixed, default:{}},
  zone: {type: String, default: ''},
  body: {type: String, default: ''},
  timestamp: {type: Date, default: Date.now()}
});

module.exports = mongoose.model('CommentSchema', CommentSchema);