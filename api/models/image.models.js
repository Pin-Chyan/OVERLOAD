const mongoose = require('mongoose');

const schema = mongoose.Schema;

const img = new schema({
	username : { type: String, require: true},
	img: {type: String, require: true},//{ data: Buffer, contentType: String },
	imgType: { type: String, require: true},
});

const image = mongoose.model('img', img);

module.exports = image;