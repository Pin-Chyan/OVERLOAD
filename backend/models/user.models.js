const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  notifications: {
    type: Array,
    default: []
  },
  liked: {
    type: Array,
    default: []
  },
  viewed: {
    type: Array,
    default: []
  },
  chatrooms: {
    type: Array,
    default: []
  },
  location: {
    type: Array,
    required: true,
    default: []
  },
  verified: {
    type: Boolean
  },
  vKey: {
    type: String,
    unique: true
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
  fame: {
    type: Number,
    default: 0
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
