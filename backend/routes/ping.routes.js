const router = require('express').Router();

router.route('/ms').post( (req, res) => {
    res.json('eve online');
})

module.exports = router;