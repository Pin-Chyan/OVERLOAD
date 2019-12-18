const router = require('express').Router();
const mongoose = require('mongoose');

router.route('/').get( (req, res) => {
	res.json('<h>hello<h>');
});

module.exports = router;