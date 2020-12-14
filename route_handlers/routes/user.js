const router = require('express').Router();
const db = require('../database/db');
const bcrypt = require('bcrypt');

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

router.route('/updatedata').post( (req, res) => {
    if (!req.body.id){
        return end(res,401,"an id was not specified");
    }

    var promiseArr = [];
    let keys = Object.keys(req.body);
    keys.forEach(key => {
        if (key != "id" && key != "password")
            promiseArr.push(connection.update('users', key , req.body[key], req.body.id));
    });
    Promise.all(promiseArr).then((result) => {
        console.log(result);
        end(res, 200, "done");
    })
})

router.route('/updatepass').post( (req, res) => {
    if (!req.body.id){
        return end(res,401,"an id was not specified");
    }

    if (!req.body.password){
        return end(res,401,"new password was not specified");
    }

    hashPassword(req.body.password, req.body.id).then(() => {
        end(res, 200, "done");
    })
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

router.route('/online').get((req, res) => {
    if (!req.query.id){
        return end(res,401,"an id was not specified");
    }

    let io = req.app.get('io');
    let clients = req.app.get('clients');
    const socketIdRec = clients[req.body.rec];
    if (socketIdRec != undefined){
        end(res, 200, "online");
    } else {
        end(res, 200, "offline");
    }
})

function end(res, status, msg){
    res.status(status);
    res.json(msg);
    return;
}

async function hashPassword (password , id) {
    const saltRounds = 10;
  
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })

    await connection.update('users', 'password', hashedPassword, id);
    return;
}

module.exports = router;