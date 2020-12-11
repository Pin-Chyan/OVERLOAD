const router = require('express').Router();
const db = require('../database/db');

// for db connection
const connection = new db.dbConn();

router.route('/me').get( (req, res) => {
    if (!req.query.id){
        return end(res,401,"an id was not specified");
    }

    // writing new message to DB
    var request = connection.get('users', req.query.id);

    // reading response
    request.then((result) => {
        if (result.status == 'success')
            return end(res,200, result.data[0]);
        else 
            return end(res,500,"error");
    });
})

router.route('/updateMe').get( (req, res) => {
    if (!req.query.id){
        return end(res,401,"an id was not specified");
    }
})

router.route('/img').post( (req,res) => {
    if (!req.body.id){
        return end(res,401,"an id was not specified");
    }

    var imgReqPromiseArr = [];

    if (req.body.img1){
        imgReqPromiseArr.push(connection.update('users', 'img1', req.body.img1, req.body.id));
    }
    if (req.body.img2){
        imgReqPromiseArr.push(connection.update('users', 'img2', req.body.img2, req.body.id));
    }
    if (req.body.img3){
        imgReqPromiseArr.push(connection.update('users', 'img3', req.body.img3, req.body.id));
    }
    if (req.body.img4){
        imgReqPromiseArr.push(connection.update('users', 'img4', req.body.img4, req.body.id));
    }
    if (req.body.img5){
        imgReqPromiseArr.push(connection.update('users', 'img5', req.body.img5, req.body.id));
    }

    Promise.all(imgReqPromiseArr).then((result) => {
        res.status(200);
        res.json("image uploaded");
    })
})

function end(res, status, msg){
    res.status(status);
    res.json(msg);
    return;
}

module.exports = router;