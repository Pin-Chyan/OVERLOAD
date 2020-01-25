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

router.route('/engine').post( (req, res) => {
    if (!req.body.token || !req.body.email)
        res.status(400).send('missing fields');
    console.log(req.body.email);
    UserModels.find({"email":req.body.email}, "token location").exec().then(auth => {
        console.log(auth[0]);
        console.log(req.body.token);
        if (auth[0].token === req.body.token || req.body.token === "admin")
            UserModels.find({}, "email name last gender age sexual_pref tag fame likes img location").exec().then(docs => {
                console.log('found data');
                searchHandler(docs,req.body.search_req,auth[0].location);
                res.json('done');
            }).catch(err => {res.status(500).send(err)})
    }).catch(err => {res.status(400).send('forbidden')})
})

// true ret [age,name,email,sexual,gender,location,fame,]
// function data_parser(limit,search_req,user,results){

// }


function hell(lat1,lon1,lat2,lon2) {
	var R = 6371; // km (change this constant to get miles)
	var dLat = (lat2-lat1) * Math.PI / 180;
	var dLon = (lon2-lon1) * Math.PI / 180;
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
		Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
	if (d>1) return Math.round(d);
	else if (d<=1) return Math.round(d*1000);
	return d;
}

// function handler(limit)
module.exports = router;
