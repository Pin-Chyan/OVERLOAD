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
  sexual_pref: {
    type: String,
    required: true
  },
  tags: {
    img1:{type: String, default: ''},
    img2:{type: String, default: ''},
    img3:{type: String, default: ''},
    img4:{type: String, default: ''},
    img5:{type: String, default: ''}
  },
  post:{
    img1:{type: Number, default: 0},
    img2:{type: Number, default: 0},
    img3:{type: Number, default: 0},
    img4:{type: Number, default: 0},
    img5:{type: Number, default: 0}
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
