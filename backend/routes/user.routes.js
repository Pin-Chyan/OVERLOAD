const router = require('express').Router();
let UserModels = require('../models/user.models.js');
const verifyToken = require('../auth/auth.middleware');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.route('/add').post( (req, res) => {
    const name = req.body.name;
    const last = req.body.last;
    const password = req.body.password;
    const gender = req.body.gender;
    const age = req.body.age;
    const email = req.body.email;
    const verif = 0; 
    const sexual_pref = req.body.sexual_pref;

    const newUser = new UserModels({
        name,
        last,
        password,
        gender,
        age,
        email,
        verif,
        sexual_pref,
    });

    newUser.save().then( () => res.json('User added') )
    .catch( err => res.status(400).json('Error: ' + err));
});

router.route('/get_spec').post( (req, res) => {
    if (req.body.token)
        if (req.body.target != "")
            UserModels.find({ "email": req.body.email},req.body.target).exec().then(docs => {
                if ((req.body.token == docs.token) || (req.body.token == "admin"))
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
//                 res.json({'present' : docs.length});
//             })
//         }
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
            if ((req.body.token == doc.token || req.body.token == "admin") && (req.body.token != "")) {
                UserModels.findOne({'email':req.body.email}).exec().then(doc => {
                    if (req.body.name)
                        doc.name = req.body.name;
                    if (req.body.last)
                        doc.last = req.body.last;
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

module.exports = router;
