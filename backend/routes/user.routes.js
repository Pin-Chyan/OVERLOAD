const router = require('express').Router();
const bcrypt = require('bcryptjs');
let UserModels = require('../models/user.models.js');
const verifyToken = require('../auth/auth.middleware');
const jwt = require('jsonwebtoken');
require('dotenv').config();

router.route('/add').post( (req, res) => {

    const name = req.body.name;
    const last_name = req.body.last_name;
    const password = req.body.password;
    const gender = req.body.gender;
    const age = req.body.age;
    const email = req.body.email;
    const verif = 0; 
    const sexual_pref = req.body.sexual_pref;

    const newUser = new UserModels({
        name,
        last_name,
        password,
        gender,
        age,
        email,
        verif,
        sexual_pref
    });


    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err) throw err;
        newUser.password = hash;
        newUser.save().then( () => res.json('User added') )
        .catch( err => res.status(400).json('Error: ' + err));
    }));
});

router.route('/get').post( (req, res) => {
    UserModels.find({ "name": req.body.name}).exec().then(docs => {
        res.json(docs);
    })
})

router.post('/email', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.SECRET, (err, decoded) => {
        if (err) {
            res.sendStatus(403);
        } else {
            UserModels.find({ "email": decoded.email}).exec().then(docs => {
                res.json({'present' : docs.length});
            })
        }
    })
})
module.exports = router;