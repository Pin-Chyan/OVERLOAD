const router = require('express').Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user.models.js');
let UserModels = require('../models/user.models.js');
const bcrypt = require('bcryptjs');
require('dotenv').config();

//TODO: Add protection to check if user is logged in
router.post('/getUser', (req, res) => {
    res.send(req.user);
});

router.post('/getToken', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.send({ resCode: 2 });
    }

    User.find({ "email" : email }, ["verif", "password"]).exec().then(data => {
        if (data.length === 0) {
            return res.send({ resCode: 1});
        }
        // TODO: replace false with result[0].verif === 0 when email verification works
        if (false) {
            return res.send('not verified');
        }

        bcrypt.compare(password, data[0].password, function(err, result) {
            if(!result) {
                return res.send({ resCode: 1 });
            }
            jwt.sign({email, password}, process.env.SECRET, (err, token) => {
                UserModels.findOne({'email':email},"token").then(docs => {
                    docs.token = token;
                    docs.save();
                })
                res.json({
                    token,
                    resCode: 0
                });
            });
        });
    });
})

module.exports = router;