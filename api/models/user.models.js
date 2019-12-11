const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  last_name: {
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
      unique: true,
      required: true
  }
}, {
  timestamps: true,
});

const image = new Schema({
  author : { type: String, required: true},
  img: { data: Buffer, contentType: String },
  created : { type: Date, default: Date.now}
});

module.exports = image;
module.exports = userSchema;