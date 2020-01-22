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
//                  <<<< Email Routes >>>>
//
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

    UserModels.find({"email": email}, "vKey").exec().then(docs => {
        let mailOptions = {
            from: mailData.email,
            to: email,
            subject: 'Password Reset',
            //TODO: Change to goto reset password page
            html: `<h2>Please click <a href="http://localhost:3000/resetPass/${docs[0].vKey}"> here </a> to reset your password.</h2><p>`
        };
        
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return res.status(400).send(error);
            }
        });
        return res.send('email sent');
    }).catch(() => {
        res.sendStatus(404);
    })
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

router.route('/email').post( (req, res) => {
    UserModels.find({ "email": req.body.email}).exec().then(docs => {
        res.json({'present' : docs.length});
    }).catch(err => {res.status(500).send(err)});
})


///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< User Routes >>>>
//
router.route('/add').post( (req, res) => {
    const name = req.body.name;
    const last = req.body.last;
    const password = req.body.password;
    const gender = req.body.gender;
    const age = req.body.age;
    const email = req.body.email;
    const sexual_pref = req.body.sexual_pref;
    const vKey = md5(email+Date.now());
    const verified = false;
    const location = req.body.location

    const newUser = new UserModels({
        name,
        last,
        password,
        gender,
        age,
        email,
        verified,
        sexual_pref,
        vKey,
        location
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

router.route('/verifyKey/:vkey').get((req, res) => {
    const { vkey } = req.params;

    UserModels.find({ "vKey": vkey }).exec().then(docs => {
        res.json({ validKey: true, email: docs[0].email });
    }).catch(() => {
        res.json({ validKey: false, email: "" });
    })
});

router.route('/resetPassword/:vKey').post((req, res) => {
    const { email, newPassword } = req.body;
    const { vKey } = req.params;

    UserModels.find({ "email": email }).exec().then(docs => {
        if (docs[0].vKey === vKey) {
            bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newPassword, salt, (err, hash) => {
                if(err) throw err;
                docs[0].password = hash;
                docs[0].save();
            }));
            return res.json({ updated: true });
        } else {
            return res.json({ updated: false });
        }
    }).catch(() => {
        res.json({ updated: false });
    })
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

router.post('/get_spec', verifyToken, (req, res) => {
    console.log(req.body);
    if (!req.token || !req.body.target || !req.body.email)    
        res.status(403).send('empty fields');
    console.log('the target');
    console.log(req.token);
    UserModels.find({ "email": req.body.email},req.body.target + " token").exec().then(docs => {
        console.log(docs[0].token);
        if ((req.token === docs[0].token) || (req.token === "admin"))
            res.json(docs);
        else
            res.status(400).send('Forbbiden');
    }).catch(err => { res.status(500).send(err) });
})

// router.route('/get_spec').post( (req, res) => {
//     if (req.token)
//         console.log(req.token);
//     if (req.body.token && req.body.email){
//         if (req.body.target != ""){
//             UserModels.find({ "email": req.body.email},req.body.target + " token").exec().then(docs => {
//                 if ((req.body.token !== docs[0].token) && (req.body.token !== "admin")){
//                     console.log(req.body.token);
//                     console.log(docs[0].token);
//                     res.status(400).send('invalid token');
//                 }
//                 else
//                     res.json(docs);
//             }).catch(err => {res.status(500).send(err)});
//         }
//         else
//             res.status(400).send("no target");
//     }
//     else
//         res.status(400).send("token not present");
// })

router.route('/edit_spec').post( (req, res) => {
    if (req.body.token){
        UserModels.find({'email':req.body.email}).exec().then(doc => {
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
                    doc.save().then(r => {res.status(200).send("saved")}).catch(err => {res.status(500).send(err)});
                })
            }
            else 
                res.status(403).send("Invalid Token");
        })
    }
    else
        res.status(400).send("no Token Present");
})

router.route('/email').post( (req, res) => {
    UserModels.find({ "email": req.body.email}).exec().then(docs => {
        return res.json({'present' : docs.length});
    })
})

router.route('/get_next').post( (req, res) => {
    if (req.body.token)
            UserModels.find({ "email": req.body.email},req.body.target + " token").exec().then(docs => {
                if ((req.body.token == docs[0].token) || (req.body.token == "admin")){
                    UserModels.find({},"img email name tag like last bio").exec().then(doc2 => {
                        var data = {};
                        data.max = doc2.length;
                        var pos = req.body.position;
                        if (doc2.find(function (res){return res.email == req.body.email;}))
                            data.max--;
                        if (doc2[pos].email == req.body.email){
                            if (pos + 1 > data.max)
                                res.status(204).send("end");
                            else
                                pos++;
                        }
                        data.ret = doc2[pos];
                        res.json(data);
                    }).catch(err => {console.log(err)})
                }
                else
                    res.status(403).send("invalid token");
            }).catch(err => {res.status(500).send(err)})
        else
            res.status(400).send("no target");
})

router.route('/load_data').post( (req, res) => {
    // res.json(test_data);
    var dlen = test_data.length;
    console.log(dlen);
    var i = 0;
    for (i  = 0; i < dlen; i++){
        let user = new UserModels(test_data[i]);
        console.log(test_data[i].name)
        bcrypt.genSalt(10, (err, salt) => bcrypt.hash(user.password, salt, (err, hash) => {
            if(err) throw err;
            user.password = hash;
            user.save().then(() => {console.log('added')}).catch(err => {console.log(err)});
        }));
    }
    res.json("done");
})

router.route('/purge').post( (req, res) => {
    if (req.body.token === "admin"){
    mongoose.connect(process.env.ATLAS_URI,function(){
        mongoose.connection.db.dropDatabase();
        res.json('purged');
    }).catch(err => { res.stats(500).send("mongoose not present")});
    } else {
        res.status(403).send("Forbbiden");
    }
})

///////////////////////////////////////////////////////////////////////////////////////////////////
//
//                      <<<< Like Routes >>>>
//
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


module.exports = router;
