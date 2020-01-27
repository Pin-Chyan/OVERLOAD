const router = require('express').Router();
let UserModels = require('../models/user.models.js');
require('dotenv').config();

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                  <<<< Search / Mactching Routes >>>>
//

router.route('/engine').post( (req, res) => {
    if (!req.body.token || !req.body.email)
        res.status(400).send('missing fields');
    console.log(req.body.email);
    UserModels.find({"email":req.body.email}, "token location email gender tag").exec().then(auth => {
        console.log(auth[0]);
        console.log(req.body.token);
        if (auth[0].token === req.body.token || req.body.token === "admin")
            UserModels.find({}, "email name last gender age sexual_pref tag fame likes img location").exec().then(docs => {
                var request = searchHandler(docs,auth[0],req.body.search_req);
                if (request === 'no result'){
                    res.json('no_res')
                } else {
                    res.json(request);
                }
            }).catch(err => {res.status(500).send(err)})
    }).catch(err => {res.status(400).send('forbidden')})
})

router.route('/test_search').post( (req, res) => {
    UserModels.find({}, "email name last gender age sexual_pref tag fame likes img location").exec().then(docs => {
        res.json(docs);
    })
})

function searchHandler(docs,user,search_req){
    var res = [];
    var i = docs.length;
    while (i--){
        if (!targHandler(docs[i],user,search_req).toString().includes('0')){
            docs[i].location = hell(docs[i].location[4],docs[i].location[5],user.location[4],user.location[5]);
            res.push(docs[i]);
        }
    }
    if (res.length > 0){
        var sorted = res.sort(function (a,b){ return a.location[0] - b.location[0]})
        return (sorted);
    }
    return ('no result'); 
}

function targHandler(doc,user,search_req){
    var res = [];
    if (doc.email === user.email)
        return ([0]);
    res.push((doc.age >= search_req.targ[0][0] && doc.age <= search_req.targ[0][1]) ? 1 : 0)
    res.push((doc.fame >= search_req.targ[1][0] && doc.fame <= search_req.targ[1][1]) ? 1 : 0);
    var dist = hell(doc.location[4],doc.location[5],user.location[4],user.location[5]);
    res.push((dist <= search_req.targ[2] ? 1 : search_req.targ[2] === -2 ? 1 : 0));
    res.push((displacement(doc.gender,search_req.targ[3]) === 0) ? 1 : search_req.targ[3] === -2 ? 1 : 0);
    res.push((displacement(doc.sexual_pref,search_req.targ[4]) === 0) ? 1 : search_req.targ[4] === -2 ? 1 : 0);
    res.push((doc.name.toLowerCase().includes(search_req.in.toLowerCase()) || doc.last.toLowerCase().includes(search_req.in.toLowerCase())) ? 1 : search_req.targ[5] === 1 ? 0 : 1);
    res.push((doc.email.toLowerCase().includes(search_req.in.toLowerCase()) || doc.email.toLowerCase().includes(search_req.in.toLowerCase())) ? 1 : search_req.targ[6] === 1 ? 0 : 1);
    return (res);
}

function match(doc,user){ 
    var ret = [];
    if (doc.email === user.email)
        return ([0]);
    ret.push(displacement(user.gender,doc.sexual_pref) ? 0 : 1);
    return (ret);
}

function tags(tag,search_req){
    var i = search_req.length;
    var tagstr = tag.toString();
    var ret = 0;
    if (tagstr !== '')
        while(i--){
            if (!tag.toString().includes(search_req[i]))
                ret = 1;
        }
    return (ret);
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
function displacement(x1,x2){
    return (x2 - x1);
}

// function handler(limit)
module.exports = router;
