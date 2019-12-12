const mongoose = require('mongoose');

const schema = mongoose.Schema;

const img = new schema({
	user : { type: String, require: true},
	img: { data: Buffer, contentType: String },
	imgType: { type: String, require: true}
});

const image = mongoose.model('img', img);

module.exports = image;