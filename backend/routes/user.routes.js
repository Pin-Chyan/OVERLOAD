const router = require('express').Router();
let UserModels = require('../models/user.models.js');

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

    newUser.save().then( () => res.json('User added') )
    .catch( err => res.status(400).json('Error: ' + err));
});

router.route('/get').post( (req, res) => {
    UserModels.find({ "name": req.body.name}).exec().then(docs => {
        res.json(docs);
    })
})


router.route('/email').post( (req, res) => {
    UserModels.find({ "email": req.body.email}).exec().then(docs => {
        // console.log(docs.length);
        res.json({'present' : docs.length});
    })
})
module.exports = router;