const router = require('express').Router();
let UserModels = require('../models/user.models.js');

router.route('/ms').post( (req, res) => {
    res.json('eve online');
})

module.exports = router;