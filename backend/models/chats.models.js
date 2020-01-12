const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chat_room = new Schema({
  _id1: {type: String,default:''},
  _id2: {type: String,default:''},
  message: {type: Array,default:[]},
  }, {
    timestamps: true,
  });

const chats_model = mongoose.model('chats', chat_room, 'chats');
module.exports = chats_model;