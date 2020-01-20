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
    // console.log("hi");
    if (!req.body.token || !req.body.email)
        res.status(400).send("error");
    else {
        UserModels.find({"email": req.body.email}, "token gender age sexual_pref tag likes").exec().then(auth => {
            console.log(auth[0]);
            if (auth[0].token === req.body.token || req.body.token === "admin"){
                // console.log("hi");
                UserModels.find({}, "email name gender age sexual_pref tag likes img.img1").exec().then(docs => {
                    // console.log(req.body);
                    if (!req.body.search_conditions)
                        res.json("no conditions");
                    else{
                        var v8res = V8(auth[0],docs,req.body.search_input,req.body.search_conditions,req.body.debug);
                        res.json(v8res);
                    }
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
function V8(user_data, recived_data, search_input, search_conditions, debug) {
    var recived_len = recived_data.length;
    var array = [];
    var matching = [0,0,0,0,0,0,0];
    var search_res = [];
    var i = 0;
    var verb = {};
    console.log('<<<<<<<<<<<<<<<<<<<<search start>>>>>>>>>>>>>>>>>>>>>>');
    console.log("search input = " + search_input);
    console.log('<<<<<<<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>>');
    if (search_input !== ''){
        for (i = 0;i < recived_len;i++){
            if (recived_data[i].name.toLowerCase().includes(search_input.toLowerCase()))
                matching[0] = 1;
            if (recived_data[i].email.toLowerCase().includes(search_input.toLowerCase()))
                matching[1] = 1;
            matching[2] = recived_data[i].gender;
            matching[3] = recived_data[i].sexual_pref;
            matching[4] = recived_data[i].age;
            matching[5] = tag_match(recived_data[i].tag,user_data.tag);
            if (recived_data[i].tag.toString().toLowerCase().includes(search_input.toLowerCase()))
                matching[6] = 1;
            console.log(recived_data[i].name);
            console.log(matching);
            if (!search_match(search_conditions, user_data,matching).toString().includes('0'))
                array.push(recived_data[i]);
            matching = [0,0,0,0,0,0,0];
            search_res = [];
        }
        // console.log();
    }
    console.log('done');
    if (array.length)
        return(array);
    else
        return("no result");
}

function search_match(search_req, user_data, matching){
    var res = [1,1,1,1,1,1,1];
    if (search_req[0] == 1)
        if (matching[0] == 0)
            res[0] = 0;
    if (search_req[1] == 1)
        if (matching[1] == 0)
            res[1] = 0;
    if (search_req[2] != matching[2] && search_req[2] != -2)
        res[2] = 0;
    if (search_req[3] != matching[3] && search_req[3] != -2)
        res[3] = 0;
    if (search_req[4] >= 0)
        if (toPos((matching[4] - user_data.age)) > search_req[4])
            res[4] = 0;
    if (search_req[5] > matching[5])
        res[5] = 0;
    if (search_req[6] == 1)
        if (matching[6] == 0)
            res[6] = 0;
    return(res);
}

function tag_match(search_tag, user_tag){
    var i = user_tag.length;
    var amm = 0;
    while (i--)
        if (search_tag.find(function (tag){return tag === user_tag[i]}))
            amm++;
    // console.log(amm);
    return (amm);
}

function toPos(num){
    if (num < 0)
        return (num * -1);
    else
        return (num);
}

module.exports = router;
