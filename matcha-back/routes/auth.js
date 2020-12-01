require('dotenv').config();
const router = require('express').Router();

const db = require('../database/db');
const connection = new db.dbConn();

router.route('/token').get( (req, res) => {
    connection.get('users', req.body.id).then((request) => {
        console.log(req.body);
        res.json(request.data[0].name + "'s token : " + request.data[0].token);
    })
})

module.exports = router;