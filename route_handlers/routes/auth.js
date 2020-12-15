const router = require('express').Router();
const db = require('../database/db');
const bcrypt = require('bcrypt');
const connection = new db.dbConn();

router.route('/validate').post( (req, res) => {
    connection.getUserID(req.body.email).then((request) => {
        if (request == -1) {
            res.json(-1);
        } else {
            connection.get('users', request).then((request2) => {
                if (request2.data[0].verified == 0) {
                    res.json(0);
                } else {
                    bcrypt.compare(req.body.password, request2.data[0].password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            res.json(request);
                        } else {
                            res.json(-1);
                        }
                    })
                }
            })
        }
    })
})

router.route('/register').post((req, res) => {
    const {name, surname, email, password} = req.body;
    connection.newuser({name, surname, email, password}).then((request) => {
        if (request != "error") {
            res.json({"success" : true})
        } else {
            res.json({"success" : false, "error" : "Email already in use"});    
        }
    })
})

module.exports = router;