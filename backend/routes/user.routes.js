const router = require('express').Router();
let UserModels = require('../models/user.models.js');
const verifyToken = require('../auth/auth.middleware');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const md5 = require('md5');
require('dotenv').config();

const mailData = { email: 'marvan.matcha.testservice@gmail.com', password: 'Noticeme'}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mailData.email,
        pass: mailData.password
    }
});

router.route('/sendResetLink').post((req, res) => {
    const { email } = req.body;

    let mailOptions = {
        from: mailData.email,
        to: email,
        subject: 'Password Reset',
        //TODO: Change to goto reset password page
        html: `<h2>Please click <a href="http://localhost:3000/"> here </a> to reset your password.</h2><p>`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(400).send(error);
        }
    });
    res.send('email sent');
});

router.route('/add').post( (req, res) => {
    const name = req.body.name;
    const last = req.body.last;
    const password = req.body.password;
    const gender = req.body.gender;
    const age = req.body.age;
    const email = req.body.email;
    const verif = 0; 
    const sexual_pref = req.body.sexual_pref;
    const vKey = md5(email+Date.now());
    const verified = false;

    const newUser = new UserModels({
        name,
        last,
        password,
        gender,
        age,
        email,
        verified,
        sexual_pref,
        vKey
    });

    let mailOptions = {
        from: mailData.email,
        to: newUser.email,
        subject: 'Account Verification',
        html: `<h2>Please click <a href="http://localhost:3000/verify/${vKey}"> here </a> to verify your account</h2><p>`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            res.status(400).send(error);
        }
    });

    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        newUser.password = hash;
        newUser.save().then( () => res.json('User added') )
        .catch( err => res.status(400).json('Error: ' + err));
    }));
});

router.route('/emailVerify/:vkey').post((req, res) => {
    const { vkey } = req.params;

    UserModels.find({ "vKey": vkey }).exec().then(docs => {
        if (docs[0].verified === true) {
            res.json({status: "already used"});
        } else if (docs[0].verified === false) {
            docs[0].verified = true;
            docs[0].save();
            res.json({ status: "activated"});
        } else {
            res.json({ status: "something went wrong"});
        }
    }).catch(err => {
        res.json({ status: "not found"});
    })
});

router.route('/like').post( (req, res) => {
    if (!req.body.token && !req.body.email && !req.body.target)
        req.json("error");
    UserModels.find({"email": req.body.target}, "_id").exec().then(docs => {
            UserModels.findOne({"email": req.body.email}, "likes").exec().then(docs2 => {
                if (!docs2.likes.includes(docs[0]._id)){
                    var like = docs2.likes;
                    like.push(docs[0]._id);
                    docs2.likes = like;
                    docs2.save().then(r => {res.json("liked")}).catch(err => {res.json(err)});
                }
                else
                res.json("Already Liked!");
            })
    }).catch(err => {res.json(err)})
})

router.route('/Del_like').post( (req, res) => {
    if (!req.body.token || !req.body.target || !req.body.email)
        req.json("error");
    UserModels.find({"email": req.body.target}, "_id").exec().then(docs => {
            UserModels.findOne({"email": req.body.email}, "likes").exec().then(docs2 => {
                if (docs2.likes.includes(docs[0]._id)){
                    var index = docs2.likes.findIndex(function (ret){return ret === docs[0]._id});
                    docs2.likes.splice(index,1);
                    docs2.save().then(r => {res.json("Like removed")}).catch(err => {res.json(err)});
                }
                else
                res.json("Not Liked");
            })
    }).catch(err => {res.json(err)})
})

router.route('/get_spec').post( (req, res) => {
    // console.log(req.body);
    if (req.body.token)
        if (req.body.target != "")
            UserModels.find({ "email": req.body.email},req.body.target + " token").exec().then(docs => {
                // console.log(docs[0]);
                // console.log(docs[0].token);
                // console.log(req.body.token);
                if ((req.body.token == docs[0].token) || (req.body.token == "admin"))
                    res.json(docs);
                else
                    res.json("invalid token");
            })
        else
            res.json("no target");
    else
        res.json("token not present");
})

router.route('/get_next').post( (req, res) => {
    // console.log(req.body);
    if (req.body.token)
        if (req.body.target != "")
            UserModels.find({ "email": req.body.email},req.body.target + " token").exec().then(docs => {
                if ((req.body.token == docs[0].token) || (req.body.token == "admin")){
                    UserModels.find({},"img email name tag like last").exec().then(doc2 => {
                        var data = {};
                        data.max = doc2.length;
                        var pos = req.body.position;
                        if (doc2.find(function (res){return res.email == req.body.email;}))
                            data.max--;
                        if (doc2[pos].email == req.body.email){
                            if (pos + 1 > data.max)
                                res.json("end");
                            else
                                pos++;
                        }
                        data.ret = doc2[pos];
                        // doc2[pos].max = data.max;
                        res.json(data);
                    }).catch(err => {console.log(err)})
                }
                else
                    res.json("invalid token");
            }).catch(err => {console.log(err)})
        else
            res.json("no target");
    else
        res.json("token not present");
})

router.post('/getEmail', verifyToken, (req, res) => {
    if (!req.token) {
        res.sendStatus(403);
    }
    jwt.verify(req.token, process.env.SECRET, (err, decoded) => {
        if (err) {
            res.sendStatus(403);
        } else {
            UserModels.find({ "email": decoded.email}).exec().then(docs => {
                if (!docs[0]) {
                    res.sendStatus(404);
                }
                res.json({ email: docs[0].email });
            })
        }
    })
});

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
}

router.route('/edit_spec').post( (req, res) => {
    if (req.body.token){
        UserModels.find({'email':req.body.email}).exec().then(doc => {
            // console.log(req.body.token);
            // console.log(doc[0].token);
            if ((req.body.token == doc[0].token || req.body.token == "admin") && (req.body.token != "")) {
                UserModels.findOne({'email':req.body.email}).exec().then(doc => {
                    if (req.body.name)
                        doc.name = req.body.name;
                    if (req.body.last)
                        doc.last = req.body.last;
                    if (req.body.msg)
                        doc.msg = req.body.msg;
                    if (req.body.password)
                        doc.password = req.body.password;
                    if (req.body.gender)
                        doc.gender = req.body.gender;
                    if (req.body.age)
                        doc.age = req.body.age;
                    if (req.body.new_email)
                        doc.email = req.body.new_email;
                    if (req.body.sexual_pref)
                        doc.sexual_pref = req.body.sexual_pref;
                    if (req.body.tag)
                        doc.tag = req.body.tag;
                    if (req.body.bio)
                        doc.bio = req.body.bio;
                    if (req.body.img){
                        if (req.body.img.img1)
                            doc.img.img1 = req.body.img.img1;
                        if (req.body.img.img2)
                            doc.img.img2 = req.body.img.img2;
                        if (req.body.img.img3)
                            doc.img.img3 = req.body.img.img3;
                        if (req.body.img.img4)
                            doc.img.img4 = req.body.img.img4;
                        if (req.body.img.img5)
                            doc.img.img5 = req.body.img.img5;
                    }
                    // sleep(2000);
                    doc.save().then(r => {res.json("saved")}).catch(err => {res.json(err)});
                })
            }
            else 
                res.json("Invalid Token");
        })
    }
    else
        res.json("no Token Present");
})

router.route('/email').post( (req, res) => {
    UserModels.find({ "email": req.body.email}).exec().then(docs => {
        res.json({'present' : docs.length});
    })
})

router.route('/notify').post( (req, res) => {
    if (!req.body.token && req.body.target && req.body.msg && req.body.notify)
        req.json("error");
    UserModels.find({'email':req.body.email},"token").exec().then(doc => {
        if (req.body.token == "admin" || doc.token == req.body.token) {
            UserModels.findOne({'email':req.body.target}, "notify").exec().then(ret => {
                console.log(ret);
                var msg = ret.notify;
                msg.push(req.body.notify);
                ret.notify = msg;
                console.log(msg);
                ret.save().then(r => {res.json("saved")}).catch(err => {res.json(err)});
            })
        }
        else
            res.json("error");
    }).catch(err => {res.json(err)})
})

router.route('/msg').post( (req, res) => {
    if (!req.body.token && req.body.target && req.body.msg && req.body.notify)
        req.json("error");
    UserModels.find({'email':req.body.email},"token").exec().then(doc => {
        if (req.body.token == "admin" || doc.token == req.body.token) {
            UserModels.findOne({'email':req.body.target}, "msg").exec().then(ret => {
                console.log(ret);
                var msg = ret.msg;
                var d = new Date(1432851021000);
                msg.push("["+d.toLocaleString("en-GB")+"] "+req.body.msg);
                ret.msg = msg;
                console.log(msg);
                ret.save().then(r => {res.json("saved")}).catch(err => {res.json(err)});
            })
        }
        else
            res.json("error");
    }).catch(err => {res.json(err)})
})

router.route('/msg_del').post( (req, res) => {
    if (!req.body.token && req.body.target && req.body.msg && req.body.notify)
        req.json("error");
    UserModels.find({'email':req.body.email},"token").exec().then(doc => {
        if (req.body.token == "admin" || doc.token == req.body.token) {
            UserModels.findOne({'email':req.body.target}, "msg").exec().then(ret => {
                console.log(ret);
                var pos = ret.msg.findIndex(function (res){return res === req.body.msg});
                var msg = ret.msg;
                msg.splice(pos, 1, "Message Deleted!");
                ret.msg= msg;
                console.log(msg);
                ret.save().then(r => {res.json("saved")}).catch(err => {res.json(err)});
            })
        }
        else
            res.json("error");
    }).catch(err => {res.json(err)})
})



module.exports = router;
