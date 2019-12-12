const router = require('express').Router();
var fs = require('fs');
let imgModels = require('../models/image.models.js');

function base64_encode(file) {
    var bitmap = fs.readFileSync(file);
    return bitmap.toString('base64');
}

router.route('/add').post( (req, res) => {
	const username = req.body.username;
	const img = 'data:image/' + req.body.imgType + ';base64, ' + base64_encode(req.body.path);
	const imgType = req.body.imgType;
    const newimg = new imgModels({
        username,
        img,
        imgType,
    });

    newimg.save().then( () => res.json(img) )
    .catch( err => res.status(400).json('Error: ' + err));
});

router.route('/remove').post( (req, res) => {
    if (req.body.id){
        imgModels.findOneAndDelete({ _id: req.body.id }, function (err) {
            if(err) res.json(err);
            res.json("image deleted with id");  
        });
    }
    else{
        imgModels.findOneAndDelete({ username: req.body.username }, function (err) {
            if(err) res.json(err);
            res.json("image deleted using username");  
        });
    }
})

module.exports = router;