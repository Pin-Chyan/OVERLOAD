const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyToken = require('../auth/auth.middleware');
let UserModels = require('../models/user.models.js');
require('dotenv').config();

router.post('/getToken', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.send({ resCode: 2 });
    }

    UserModels.find({ "email" : email }, ["verified", "password"]).exec().then(data => {
        if (data.length === 0) {
            return res.send({ resCode: 1});
        }
        if (data[0].verified === false) {
            return res.send({ resCode: 3 });
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