const router = require('express').Router();
var fs = require('fs');
let imgModels = require('../models/image.models.js');

function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}

router.route('/add').post( (req, res) => {
	const user = req.body.name;
	const img = base64_encode(req.body.path);
	if (!img)
		console.log("image not retrieved");
	const imgType = req.body.imgType;
    const newimg = new imgModels({
        user,
        img,
        imgType,
    });

    newimg.save().then( () => res.json(img) )
    .catch( err => res.status(400).json('Error: ' + err));
});

module.exports = router;