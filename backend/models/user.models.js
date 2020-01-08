const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  last: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  gender: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type:  String,
    unique: true,
    required: true
  },
  bio: {
    type: String,
    default: ''
  },
  sexual_pref: {
    type: String,
    required: true
  },
  tags: {
    type: String,
    default: ''
  },
  img: {
    img1:{type: String, default: ''},
    img2:{type: String, default: ''},
    img3:{type: String, default: ''},
    img4:{type: String, default: ''},
    img5:{type: String, default: ''}
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);


module.exports = User;
