const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chats = new Schema({
  name: { type: String},
  message: { type: String},
  }, {
    timestamps: true,
  });

const chats_model = mongoose.model('chats', chats, 'chats');
module.exports = chats_model;