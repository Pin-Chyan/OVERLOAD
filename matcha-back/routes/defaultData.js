require('dotenv').config();
const router = require('express').Router();

// includes a prebuild class that handles sql connection
const db = require('../database/db');
// initiated a connection
const connection = new db.dbConn();

router.route('/testroute').get( (req, res) => {
    // calls get method inside dbConn class (class code in file ./database/db.js)
    connection.get('users', req.body.id).then((request) => {
        // returns data from the get query
        res.json(request.data);
    })
})

module.exports = router;