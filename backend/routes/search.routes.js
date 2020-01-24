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

// router.route('/engine').post( (req, res) => {
//     if (!req.body.token || !req.body.email || !req.body.search_conditions)
//         res.status(400).send('missing fields');
//     console.log(req.body);
//     UserModels.find({"email": req.body.email}, "token gender age sexual_pref tag likes").exec().then(auth => {
//         if (auth[0].token === req.body.token || req.body.token === "admin")
//             UserModels.find({}, "email name gender age sexual_pref tag likes img").exec().then(docs => {
//                     var v8res = V8(auth[0],docs,req.body.search_input,req.body.search_conditions,req.body.debug);
//                     console.log(v8res.length);
//                     res.json(v8res);
//             }).catch(err => {res.status(500).send(err)})
//     }).catch(err => {res.status(400).send('forbidden')})
// })

router.route('/test_search').post( (req, res) => {
    if (!req.body.token || !req.body.email || !req.body.search_conditions)
        res.status(400).send('missing fields');
    console.log(req.body);
    UserModels.find({"email": req.body.email}, "token gender age sexual_pref tag likes").exec().then(auth => {
        if (auth[0].token === req.body.token || req.body.token === "admin")
            UserModels.find({}, "email name gender age sexual_pref tag likes img").exec().then(docs => {
                    res.json(docs);
            }).catch(err => {res.status(500).send(err)})
    }).catch(err => {res.status(400).send('forbidden')})
})

// ///////////////////////////////////////////////////////////////////////////////////////////////////
// //
// //                      <<<< Search Engine >>>>
// //
// //

// // caps => { 'agegap indefitate', 'sexuality indefinate' ,'fame' , 'location' , 'tags' }
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
            if (!search_match(search_conditions, user_data, matching, search_input).toString().includes('0'))
                array.push(recived_data[i]);
            matching = [0,0,0,0,0,0,0];
            search_res = [];
        }
    }
    console.log('done');
    if (array.length)
        return(array);
    else
        return("no result");
}

function search_match(search_req, user_data, matching, search_input){
    var res = [1,1,1,1,1,1,1];
    if (search_input === 'its over 9000')
        return res;
    if (search_input === 'omae wa mou shindeiru'){
        if (matching[2] == 1)
            return (res);
        else
            return ([0]);
    }
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


function searchHandler(docs,search_req,user_locale){
    var res = [];
    var i = docs.length - 1;
    console.log(validate(docs[0],search_req,user_locale));
    // while (i--){
    //     console.log('begin validate');
    //     if (validate(docs[i],search_req,user_locale))
    //        res.push(docs[i]);
    // }
}

function validate(docs,search_req,user_locale){
    console.log(docs);
    console.log(search_req);
    console.log(user_locale);
    //      <<<< restictions >>>>
    var age_res = agegap(docs.age,search_req.age) ? 1 : 0;
    console.log(age_res + " " + docs.age);
    var fame_res = famegap(docs.fame,search_req.fame) ? 1 : 0;
    console.log(fame_res + " " + docs.fame);
    var dist_res = distance(docs.location,user_locale,search_req.max_dist);
    if (dist_res > search_req.distance)
        dist_res = -1;
    console.log(dist_res + " " + distance(docs.location,user_locale,search_req.max_dist) + " " + search_req.distance);
    //      <<<< modes >>>>
    var name_res = name(docs.name,docs.last,search_req.in) ? 1 : 0;
    console.log(name_res + " " + docs.name + " " + search_req.in);
    var email_res = email(docs.email,search_req.in) ? 1 : 0;
    console.log(email_res + " " + docs.email + " " + search_req.in)
    if (search_req.mode === 'any')
        return subvalidation(search_req.mode, age_res, dist_res, fame_res);
    else if (search_req.mode === 'name' && name_res)
        return subvalidation(search_req.mode, age_res, dist_res, fame_res);
    else if (search_req.mode === 'email' && email_res)
        return subvalidation(search_req.mode, age_res, dist_res, fame_res);
}

function subvalidation(mode, age_res, dist_res, fame_res){
    if (mode === 'any')
        return 1
    if (mode === 'restrict' && (age_res && dist_res && fame_res)){
        return 1
    }
    return 0;
}

// constraints min age max age 

function agegap(target,age){
    // console.log('agegap ' + target);
    // console.log(age);
    if (target >= age[0] && target <= age[1])
        return (1);
    return (0);
}

// constraints min fame min age

function famegap(target,fame){
    // console.log('famegap '+target);
    // console.log(fame);
    if (target >= fame[0] && target <= fame[1])
        return (1);
    return (0);
}
// constraints max distance

function distance(target_locale,user_locale,max){
    console.log('distance');
    var distance = hell(target_locale[4],target_locale[5],user_locale[4],user_locale[5])
    if (distance > max)
        return -1;
    // console.log(distance);
    return distance;
}
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

// by name 
function name(target_name, target_last, search_input){
    console.log(target_name);
    console.log(target_last);
    console.log(search_input);
    if (target_name.toLowerCase().includes(search_input.toLowerCase()) || target_last.toLowerCase().includes(search_input.toLowerCase()))
        return(1);
    return(0);
}

// by email

function email(target_email, search_input){
    if (target_email.toLowerCase().includes(search_input.toLowerCase()) || target_email.toLowerCase().includes(search_input.toLowerCase()))
        return(1);
    return(0);
}

module.exports = router;
