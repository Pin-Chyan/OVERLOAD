const router = require('express').Router();
const { ensureAuthenticated } = require('./config/auth');

router.use('/auth', require('./routes/auth.js'));
router.use('/msg', require('./routes/msg.js'));
router.use('/usr', require('./routes/user.js'));
router.use('/search', require('./routes/search.js'));
router.use('/likes', require('./routes/likes.js'));
router.use('/notifications', require('./routes/notifications.js'));
// router.use('/msg',  ensureAuthenticated, require('./routes/msg.js'));
// router.use('/usr',  ensureAuthenticated, require('./routes/user.js'));
// router.use('/search',   ensureAuthenticated, require('./routes/search.js'));
// router.use('/likes',    ensureAuthenticated, require('./routes/likes.js'));

module.exports = router;