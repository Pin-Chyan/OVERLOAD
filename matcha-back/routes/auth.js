require('dotenv').config();
const router = require('express').Router();
const db = require('../database/db');


// for db connection
const connection = new db.dbConn();

router.route('/token').get( (req, res) => {

    // uses get method ot get a user with a specified id
    connection.get('users', req.body.id).then((request) => {

        // returns that users name and token
        res.json(request.data[0].name + "'s token : " + request.data[0].token);
    })
})

module.exports = router;