const router = require('express').Router();
let ChatModels = require('../models/chats.models.js');
let UserModels = require('../models/user.models.js');
const mongoose = require('mongoose');
///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Message Routes >>>>
//
router.route('/newroom').post( (req, res) => {
    // console.log(req);
    UserModels.findOne({'email':req.body.email}, "_id token").exec().then(doc => {
        console.log(doc);
        if (req.body.token == "admin"){
            UserModels.findOne({'email':req.body.target}, "_id").exec().then(data => {
                console.log(data);
                const _id1 = doc._id;
                const _id2 = data._id;
                // var message = ['start'];
                // message.author = req.body.email;
                // message.target = req.body.target;
                // message.chat = req.body.message;
            
                const newChat = new ChatModels({
                    _id1,
                    _id2
                });
            
                newChat.save().then( () => res.json(newChat) )
                .catch( err => res.status(400).json('Error: ' + err));
            });
        }
        else
            res.json("done first!");
    })
})

router.route('/msg').post( (req, res) => {
    if (!req.body.token && req.body.target && req.body.msg)
        req.json("error");
    UserModels.findOne({'email':req.body.target},"_id").exec().then(target => {
        if (!target)
            res.json("error");
        UserModels.findOne({'email':req.body.email},"_id token").exec().then(doc => {
            if (req.body.token == "admin" || doc.token == req.body.token) {
                ChatModels.findOne({ $or:[
                    { _id1 : doc._id , _id2 : target._id},
                    { _id2 : doc._id , _id1 : target._id}
                ]}, "message").exec().then(ret => {
                    if (ret){
                    var what = ret.message;
                    var msg = {};
                    var d = new Date();
                    msg.author = req.body.email;
                    msg.target = req.body.target;
                    msg.msg = "["+d.toLocaleString("en-GB")+"] "+req.body.msg;
                    what.push(msg);
                    ret.message = what;
                    ret.save().then(r => {res.json("saved")}).catch(err => {res.json(err)});
                    }
                    else {
                        res.json("Error");
                    }
                })
            }
            else
                res.json("error");
        })
    }).catch(err => {res.json(err)})
})

router.route('/get_msg').post( (req, res) => {
    UserModels.findOne({'email':req.body.target},"_id").exec().then(target => {
        if (!target)
            res.json("error");
        UserModels.findOne({'email':req.body.email},"_id token").exec().then(doc => {
            if (req.body.token == "admin" || doc.token == req.body.token) {
                ChatModels.findOne({ $or:[
                    { _id1 : doc._id , _id2 : target._id},
                    { _id2 : doc._id , _id1 : target._id}
                ]}, "message").exec().then(ret => {
                   res.json(ret);
                })
            }
            else
                res.json("error");
        })
    }).catch(err => {res.json(err)})
})

router.route('/msg_del').post( (req, res) => {
    if (!req.body.token && req.body.target && req.body.msg && req.body.notify)
        req.json("error");
    UserModels.findOne({'email':req.body.email},"token _id").exec().then(doc => {
        console.log(doc)
        if (req.body.token == "admin" || doc.token == req.body.token) {
            UserModels.findOne({'email':req.body.target}, "_id").exec().then(ret => {
                ChatModels.findOne({ $or:[
                    { _id1 : doc._id , _id2 : ret._id},
                    { _id2 : doc._id , _id1 : ret._id}
                ]}, "message").exec().then(ret => {
                var pos = ret.message.findIndex(function (res){return res.chat === req.body.msg});
                if (pos == -1){
                    res.json("Error");
                }
                else {
                    var msg = ret.message;
                    console.log(msg[pos]);
                    msg.splice(pos, 1);
                    ret.message= msg;
                    ret.save().then(r => {res.json("msg deleted")}).catch(err => {res.json(err)});
                }
            })
        })
        }
        else
            res.json("error");
    }).catch(err => {res.json(err)})
})

module.exports = router;