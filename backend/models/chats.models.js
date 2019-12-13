const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chats = new Schema({
	name: { type: String},
	messages: { type: String}
  });

  const chats_model = mongoose.model('chats', chats);
  module.exports = chats_model;