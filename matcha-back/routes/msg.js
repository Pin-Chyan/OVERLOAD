require('dotenv').config();
const router = require('express').Router();
const db = require('../database/db');


// for db connection
const connection = new db.dbConn();

router.route('/send').post( (req, res) => {
    // id
    // rec
    // msg

    // checking stuff
    if (!req.body.id || !req.body.rec){
        res.status(401);
        res.json("an id was not specified");
        return;
    }
    if (!req.body.msg){
        res.status(400);
        res.json("message cannot be null");
        return;
    }
    
    // getting timestring
    var time = new Date();
    var timeString = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate() + ' ' + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds()
    
    // writing new message to DB
    connection.request("INSERT INTO msg (sender,rec,msg,time) VALUES('" + req.body.id + "','" + req.body.rec + "','" + req.body.msg + "','" + timeString + "')").then((request) => {
        if (request.status == 'success'){
            res.status(200);
            res.json("done");
        } else {
            res.status(500);
            res.json("error");
        }
    });
})

router.route('/get').get( (req, res) => {
    // id
    // recip_id

    // checking stuff
    if (!req.body.id || !req.body.rec){
        res.status(401);
        res.json("an id was not specified");
        return;
    }

    // getting messages from DB
    connection.request("SELECT * from msg WHERE (sender='" + req.body.id + "' AND rec='" + req.body.rec + "') OR (sender='" + req.body.rec + "' AND rec='" + req.body.id + "')").then((request) => {
        if (request.status == 'success'){
            res.status(200);
            res.json(request.data);
        } else {
            res.status(500);
            res.json("error");
        }
    });
})


module.exports = router;