const router = require('express').Router();
let UserModels = require('../models/user.models.js');

router.route('/add').post( (req, res) => {
    const name = req.body.name;
    const last_name = req.body.last_name;
    const password = req.body.password;
    const gender = req.body.gender;
    const age = req.body.age;
    const email = req.body.email;
    const sexual_pref = req.body.sexual_pref;

    const newUser = new UserModels({
        name,
        last_name,
        password,
        gender,
        age,
        email,
        sexual_pref
    });

    newUser.save().then( () => res.json('User added') )
    .catch( err => res.status(400).json('Error: ' + err));
});

module.exports = router;