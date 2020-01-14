const router = require('express').Router();
let UserModels = require('../models/user.models.js');
const verifyToken = require('../auth/auth.middleware');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const mailData = { email: 'marvan.matcha.testservice@gmail.com', password: 'Noticeme'}

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: mailData.email,
        pass: mailData.password
    }
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
    //TODO: generate a unique key
    const vKey = 'verysecretkey';

    const newUser = new UserModels({
        name,
        last,
        password,
        gender,
        age,
        email,
        verif,
        sexual_pref,
        vKey
    });

    let mailOptions = {
        from: mailData.email,
        to: newUser.email,
        subject: 'Account Verification',
        html: '<h2>Please click <a href="https://www.w3schools.com"> here </a> to verify your account</h2><p>'
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

router.route('/get_spec').post( (req, res) => {
    if (req.body.token)
        if (req.body.target != "")
            UserModels.find({ "email": req.body.email},req.body.target + " token").exec().then(docs => {
<<<<<<< HEAD
                // console.log(docs[0].token);
                // console.log(req.body.token);
=======
>>>>>>> layouts
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

// router.post('/email', verifyToken, (req, res) => {
//     jwt.verify(req.token, process.env.SECRET, (err, decoded) => {
//         if (err) {
//             res.sendStatus(403);
//         } else {
//             UserModels.find({ "email": decoded.email}).exec().then(docs => {
//                 res.json({email: decoded.email});
//             })
//         }
//     })
// });

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
<<<<<<< HEAD
            // console.log(req.body.token);
            // console.log(doc[0].token);
=======
>>>>>>> layouts
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
                    sleep(2000);
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
