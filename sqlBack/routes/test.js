const router = require('express').Router();
// const 
router.route('/test').get( (req, res) => {
    res.json('up and running');
})

module.exports = router;