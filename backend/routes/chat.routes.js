const router = require('express').Router();
let chatModels = require('../models/chats.models.js');

router.route('/add').post( (req, res) => {
    const name = req.body.name;
	const message = req.body.message;

    const newChat = new chatModels({
        name,
        message
    });

    newChat.save().then( () => res.json('Chat added') )
    .catch( err => res.status(400).json('Error: ' + err));
});

router.route('/:id').post( (req, res) => {
    
})

module.exports = router;
