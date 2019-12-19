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
  verif: {
      type:  Number
  },
  sexual_pref: {
      type: String,
      required: true
  }
}, {
  timestamps: true,
});

// const message = new Schema({
//   room: room,
//   user: user,
//   room_id: ,
//   message_body: String,
//   message_status:{ type: Boolean, default: false},
//   created_at: { type: Date, default: Date.now },
// });

// const image = new Schema({
//   author : { type: String, required: true},
//   img: { data: Buffer, contentType: String },
//   created : { type: Date, default: Date.now}
// });

const User = mongoose.model('User', userSchema);

// const Message = mongoose.model('Message', message);


module.exports = User;
// module.exports = Message;
//module.exports = image;
// module.exports = userSchema;
