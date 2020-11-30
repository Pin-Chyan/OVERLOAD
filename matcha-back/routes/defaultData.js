const router = require('express').Router();
const test_data = require('../test/default.json');
require('dotenv').config();


router.route('/hi').post( (req, res) => {
    console.log("HI");
    res.json("yes");
})


router.route('/testdata').post( (req, res) => {
    console.log("HI");
    res.json(test_data);
})

module.exports = router;