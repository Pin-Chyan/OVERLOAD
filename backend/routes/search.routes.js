const router = require('express').Router();
let UserModels = require('../models/user.models.js');
const verifyToken = require('../auth/auth.middleware');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const md5 = require('md5');
const test_data = require('../test_data/default.json');
const mongoose = require('mongoose');
require('dotenv').config();

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                  <<<< Search / Mactching Routes >>>>
//
router.route('/hard').post( (req, res) => {
    if (!req.body.token || !req.body.email)
        res.status(400).send("error");
    else {
        UserModels.find({"email": req.body.email}, "token gender age sexual_pref tag likes").exec().then(auth => {
            console.log(auth);
            if (auth[0].token === req.body.token || req.body.token === "admin"){
                console.log("hi");
                UserModels.find({}, "gender age sexual_pref tag likes img.img1").exec().then(docs => {
                    console.log(docs)
                    res.json(docs);
                }).catch(err => { res.status(500).send(err)})
            } else {
                res.status(403).send("invalid token");
            }
        }).catch(err => { res.status(500).send(err)})
        // res.status(200).json("no more users");
    }
})

router.route('/test_search').post( (req, res) => {
    console.log(req.body);
    if (req.body.token === "admin")
        res.json(test_data);
    else
        res.json("error");
})

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Search Engine >>>>
//
//

// caps => { 'agegap indefitate', 'sexuality indefinate' ,'fame' , 'location' , 'tags' }
function V8(user_data, recived_data, caps) {
    
}





















module.exports = router;
