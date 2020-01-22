const router = require('express').Router();
let ChatModels = require('../models/chats.models.js');
let UserModels = require('../models/user.models.js');
const mongoose = require('mongoose');
///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Message Routes >>>>
//
router.route('/newroom').post( (req, res) => {
    UserModels.findOne({'email':req.body.email}, "_id token").exec().then(doc => {
        console.log(doc);
        if (req.body.token == "admin"){
            UserModels.findOne({'email':req.body.target}, "_id").exec().then(data => {
                console.log(data);
                const _id1 = doc._id;
                const _id2 = data._id;
                ChatModels.findOne({ $or:[
                    { _id1 : doc._id , _id2 : data._id},
                    { _id2 : doc._id , _id1 : data._id}
                ]}, "message").exec().then(ret => {
                    if (ret)
                        res.json("room already exists");
                    else {
                        push_id(req.body.email, data._id);
                        push_id(req.body.target, doc._id);
                        const newChat = new ChatModels({
                            _id1,
                            _id2
                        });
                    
                        newChat.save().then( () => res.json(newChat) )
                        .catch( err => res.status(400).json('Error: ' + err));
                    }
                });
            });
        }
        else
            res.json("done first!");
    })
})

function push_id(email, target_id){
    UserModels.findOne({"email":email}, "chatrooms").exec().then(res => {
        var array = res.chatrooms;
        if (array.includes(target_id))
            console.log("already included");
        else {
            array.push(target_id);
            console.log(array);
            res.chatrooms = array;
            res.save().then( () => console.log("Id saved to chatrooms"));
        }
    })
}



function pop_id(email, target_id){
    UserModels.findOne({"email":email}, "chatrooms").exec().then(res => {
        var array = res.chatrooms;
        if (array.includes(target_id)){
            var pos = array.indexOf(target_id);
            if (pos === -1)
                console.log("well shit");
            else {
                array.splice(pos, 1);
                res.chatrooms = array;
                res.save().then( () => console.log("id removed"));
            }
        }
        else 
            console.log("error");
    })
}

router.route('/msg').post( (req, res) => {
    if (!req.body.token && req.body.target && req.body.msg)
        req.json("pepeG");
    UserModels.findOne({'email':req.body.target},"_id name").exec().then(target => {
        if (!target)
            res.json("but why");
        UserModels.findOne({'email':req.body.email},"_id token name").exec().then(doc => {
            if (req.body.token == "admin" || doc.token == req.body.token) {
                ChatModels.findOne({ $or:[
                    { _id1 : doc._id , _id2 : target._id},
                    { _id2 : doc._id , _id1 : target._id}
                ]}, "message").exec().then(ret => {
                    if (ret){
                    var what = ret.message;
                    var msg = {};
                    var d = new Date();
                    msg.author = doc.name;
                    msg.target = target.name;
                    msg.msg = "["+d.toLocaleString("en-GB")+"]: "+req.body.msg;
                    what.push(msg);
                    ret.message = what;
                    ret.save().then(r => {res.json("saved")}).catch(err => {res.json(err)});
                    }
                    else {
                        res.json("well shit");
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
            if (req.body.token == "admin" || doc.token == req.token) {
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

router.route('/del_chatroom').post( (req, res) => {
    UserModels.findOne({'email':req.body.email},"_id").exec().then(doc => {
        UserModels.findOne({'email':req.body.target}, "_id").exec().then(ret => {
            if (req.body.token === "admin"){
                pop_id(req.body.target, doc._id);
                pop_id(req.body.email, ret._id);
                ChatModels.findOneAndDelete({ $or:[
                        { _id1 : doc._id , _id2 : ret._id},
                        { _id2 : doc._id , _id1 : ret._id}
                ]}).exec().then(sys => {
                    console.log(sys);
                    if (!sys)
                        res.json("chatroom doesn't exist");
                    res.json('chatroom deleted');
                })
            } 
            else
                res.json("Forbbiden");
        });
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
                var pos = ret.message.findIndex(function (res){
                    return res.msg === req.body.msg});
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