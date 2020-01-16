const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  verified: {
    type: Boolean
  },
  vKey: {
    type: String
  },
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
  token:{
    type: String,
    default: ''
  },
  gender: {
    type: Number,
    required: true
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
    type: Number,
    default: 0
  },
  tag: {
    type: Array,
    default: ["start"]
  },
  notify: {
    type: Array,
    default: ["start"]
  },
  likes: {
    type: Array,
    default: []
  },
  img: {
    img1:{type: String, default: 'null'},
    img2:{type: String, default: 'null'},
    img3:{type: String, default: 'null'},
    img4:{type: String, default: 'null'},
    img5:{type: String, default: 'null'}
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);


module.exports = User;
