const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chat_room = new Schema({
  _id1: {type: String,default:''}, //sender
  _id2: {type: String,default:''}, //target
  email: {type: String,default: ''}, //search id
  message: {type: Array,default:['start']},
  }, {
    timestamps: true,
  });

const chats_model = mongoose.model('chats', chat_room, 'chats');
module.exports = chats_model;

