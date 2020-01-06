const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

const User = require('../models/user.models.js');

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        // successRedirect: '/',
        // failureRedirect: 'login'
    })(req, res, mext);
});

module.exports = router;
