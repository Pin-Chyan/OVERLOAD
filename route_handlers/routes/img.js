const router = require('express').Router();
const db = require('../database/db');

const connection = new db.dbConn();

router.route('/').get( (req, res) => {
    if (!req.query.id){
        return end(res,401,"an id was not specified");
    }

    // writing new message to DB
    var request = connection.request("SELECT CONVERT(img1 USING utf8) from users WHERE id='" + req.query.id + "'");

    // reading response
    request.then((result) => {
        if (result.status == 'success'){
            if (result.data[0])
                return end(res,200, result.data[0]["CONVERT(img1 USING utf8)"]);
            else
                return end(res,200, "");
        }
        else 
            return end(res,500,"error");
    });
})

router.route('/').post( (req,res) => {
    if (!req.body.id){
        return end(res,401,"an id was not specified");
    }

    connection.update('users', 'img1', req.body.img1, req.body.id).then((result) => {
        // if (result.data.message == "(Rows matched: 0  Changed: 0  Warnings: 0"){
        //     connection.request("INSERT INTO img (id,img1) VALUES('" + id + "','" + req.body.img1 + "')").then((result2) => {
        //         console.log(result2);
        //         if (result2.status == 'success'){
        //             return end(res, 200, "done");
        //         } else {
        //             return end(res, 500, "error");
        //         }
        //     });
        // } else {
        // }
        return end(res,200,"done");
    })
})

function end(res, status, msg){
    res.status(status);
    res.json(msg);
    return;
}

module.exports = router;
