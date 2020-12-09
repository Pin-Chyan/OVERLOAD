require('dotenv').config();
const router = require('express').Router();
const db = require('../database/db');

// for db connection
const connection = new db.dbConn();

router.route('/send').post( (req, res) => {
    // id(your id), rec(the msg recipient id), msg

    // checking stuff
    if (!req.body.id || !req.body.rec){
        return end(res,401,"an id was not specified");
    }
    if (!req.body.msg){
        return end(res,400,"message cannot be null");
    }
    
    // building query
    var time = new Date();
    var timeString = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate() + ' ' + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    var query = "INSERT INTO msg (sender,rec,msg,time) VALUES('" + req.body.id + "','" + req.body.rec + "','" + req.body.msg + "','" + timeString + "')";
    
    // writing new message to DB
    var request = connection.request(query);

    // reading response
    request.then((result) => {
        if (result.status == 'success')
            return end(res,200,"done");
        else 
            return end(res,500,"error");
    });
})

router.route('/get').get( (req, res) => {
    // id(your id), rec(the msg recipient id)

    // checking stuff
    if (!req.body.id || !req.body.rec){
        return end(res,401,"an id was not specified");
    }

    // building query
    var query = "SELECT * from msg WHERE (sender='" + req.body.id + "' AND rec='" + req.body.rec + "') OR (sender='" + req.body.rec + "' AND rec='" + req.body.id + "')";

    // getting messages from DB
    var request = connection.request(query);

    // reading response
    request.then((result) => {
        if (result.status == 'success')
            return end(res,200,result.data);
        else
            return end(res,500,"error");
    });
})

function end(res, status, msg){
    res.status(status);
    res.json(msg);
    return;
}


module.exports = router;