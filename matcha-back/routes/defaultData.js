require('dotenv').config();
const router = require('express').Router();

const db = require('../database/db');
const connection = new db.dbConn();

router.route('/testroute').get( (req, res) => {
    connection.get('users', 1).then((data) => {
        res.json(data);
    })
})

module.exports = router;