require('dotenv').config();
const router = require('express').Router();
const { json } = require('body-parser');
const db = require('../database/db');

// for db connection
const connection = new db.dbConn();

router.route('/').get( (req, res) => {
    if (!req.body.id){
        return end(res,401,"an id was not specified");
    }

    var getDataReqQuery = "Select id, name, surname, gender, age, sexual_pref, tag, location from users Where id!='" + req.body.id + "'";
    var getMyDataReqQuery = "Select id, name, surname, gender, age, sexual_pref, tag, location from users Where id='" + req.body.id + "'";

    var dataReqArr = [];

    dataReqArr.push( connection.request( getDataReqQuery ));
    dataReqArr.push( connection.request( getMyDataReqQuery ));

    Promise.all(dataReqArr).then((result) => {
        if (result[0].status == 'error' || result[1].status == 'error'){
            end(res, 500, "error");
        }
    })
})

function end(res, status, msg){
    res.status(status);
    res.json(msg);
    return;
}

module.exports = router;