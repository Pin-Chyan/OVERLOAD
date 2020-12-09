require('dotenv').config();
const router = require('express').Router();

router.use('/auth', require('./routes/auth.js'));
router.use('/msg', require('./routes/msg.js'));
router.use('/usr', require('./routes/user.js'));
router.use('/search', require('./routes/search.js'));
router.use('/likes', require('./routes/likes.js'));

module.exports = router;