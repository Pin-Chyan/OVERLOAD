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
    const {name, surname, email, password, token, location} = req.body;
    connection.newuser({name, surname, email, password, token, location}).then((request) => {
        if (request != "error") {
            res.json({"success" : true})
        } else {
            res.json({"success" : false, "error" : "Email already in use"});    
        }
    })
})

router.route('/confirmToken').post((req, res) => {
    const token = req.body.token;

    if (token.length >= 10) {
        connection.request("SELECT * from USERS WHERE token='" + token + "'").then((request) => {
                if (request.status == 'success' && request.data.length == 1) {
                    id = request.data[0].id
    
                    connection.update("users", "verified", 1, id).then((request2) => {
                        console.log("updating id: " + id)
                    }).catch(err => {
                        res.json({status : "failed"});
                    })

                    connection.update("users", "token", "", id).then((request2) => {
                        console.log("removing old token: " + id)
                    }).catch(err => {
                        res.json({status : "failed"});
                    })
                    res.json({status : "success"});

                console.log("updated");
                } else  {
                    res.json({status : "failed"});
                }
             })
    } else {
        res.json({status : "failed"});
    }

})


router.route('/resetPassword').post((req, res) => {
    const token = req.body.token;
    const newPassword = req.body.password;

    if (token.length >= 10) {
        connection.request("SELECT * from USERS WHERE resetToken='" + token + "'").then((request) => {
                if (request.status == 'success' && request.data.length == 1) {
                    id = request.data[0].id
    
                    connection.update("users", "password", newPassword, id).then((request2) => {
                        console.log("updating password for id: " + id)
                    }).catch(err => {
                        res.json({status : "failed"});
                    })

                    connection.update("users", "resetToken", "", id).then((request2) => {
                        console.log("removing old token: " + id)
                    }).catch(err => {
                        res.json({status : "failed"});
                    })
                    res.json({status : "success"});

                console.log("updated");
                } else  {
                    res.json({status : "failed"});
                }
             })
    } else {
        res.json({status : "failed"});
    }

})

router.route('/setResetToken').post((req, res) => {
    const {email, token} = req.body;
    console.log(req.body)

    connection.request("SELECT * from USERS WHERE email='" + email + "'").then((request) => {
        if (request.status == 'success' && request.data.length == 1) {
            id = request.data[0].id

            connection.update("users", "resetToken", token, id).then((request2) => {
                console.log("adding token: " + id)
            }).catch(err => {
                res.json({status : "failed"});
            })
            res.json({status : "success"});

        console.log("updated");
        } else  {
            res.json({status : "failed"});
        }
    })
})

module.exports = router;