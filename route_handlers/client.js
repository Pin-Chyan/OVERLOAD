require('dotenv').config();
const passport = require('passport');
const express = require('express');
const bcrypt = require('bcrypt')
const app = express();
const bodyParser = require('body-parser');
const urlcodedParser = bodyParser.urlencoded({extended: false})
const router = express.Router();
const axios = require('axios');
const {ensureAuthenticated} = require('./config/auth');
const apiUrl = 'http://localhost:' + process.env.WEBHOSTPORT + '/api';
const nodemailer = require("nodemailer");
const { response } = require('express');

const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.MAILADDR,
        pass: process.env.MAILPASS
    }
});

module.exports = router;
app.set("view engine", "pug");
app.set('views', __dirname + './');
app.engine('pug', require('pug').__express);
router.use('/images', express.static(__dirname + './../images'));

router.get('/', function(req, res) {
    res.redirect('/login');
})

router.get('/register', function(req, res) {
	res.render('register.pug');
})

router.post('/register', urlcodedParser, function(req, res) {
    let user = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt,
            (err, hash) => {
                if (err) throw err;
                user.password = hash;
                const rand = ()=>Math.random(0).toString(36).substr(2);
                token = (rand()+rand()+rand()+rand()).substr(0, 14);

                axios({
                    method: 'post',
                    url: apiUrl + '/auth/register',
                    data: {
                      name: user.name,
                      surname: user.surname,
                      email: user.email,
                      password: user.password,
                      token
                    }
                }).then((response) => {
                    if (response.data.success == true) {
                        console.log("added user2")
                        console.log("need to send confimation email2")
                        host = "localhost:" + process.env.WEBHOSTPORT;
                        link= "http://" + host + "/confirm?token=" + token
                        mailOptions = {
                            to : user.email,
                            subject : "Please confirm your Email account",
                            html : "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" 
                        }
                        smtpTransport.sendMail(mailOptions, function(error, response){
                            if (error){
                                console.log(error);
                                res.end("error");
                            } else{
                                console.log("Message sent: " + response.message);
                            }
                        })  
                        res.redirect('/sent')
                    } else {
                        console.log(response.data.error)
                        res.redirect('/register')
                        // , {
                        //     errors: response.data.error,
                        //     name: user.name,
                        //     surname: user.surname,
                        //     password:user.password
                        // }
                        // )
                    }
                })
        })
    })


})

router.get('/login', function(req, res) {
    res.render('login.pug');
})

router.post('/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect : '/home',
        failureRedirect: '/login',
    })(req,res,next)
})

router.get('/logout',(req,res)=>{
    req.logout();
    // req.flash('success_msg','Now logged out');
    res.redirect('/login'); 
})

router.get('/home', ensureAuthenticated, function(req, res) {
	res.render('home.pug', {
        id: req.session.passport.user,
	});
})

router.get('/profile', ensureAuthenticated, function(req, res) {
    res.render('profile.pug', {
		id: req.session.passport.user
	});
})

router.get('/chats', ensureAuthenticated, function(req, res) {
    res.render('chats.pug', {
		id: req.session.passport.user
	});
})

router.get('/search', ensureAuthenticated, function(req, res) {
    res.render('search.pug', {
		id: req.session.passport.user
	});
})

router.get('/confirm', function(req,res) {
    console.log(req.query.token)
    axios({
        method: 'post',
        url: apiUrl + '/auth/confirmToken',
        data: {
            token: req.query.token
        }
    }).then((response) => {
        console.log(response.data.status)
        if (response.data.status == 'success') {
            res.render('./validations/confirm.pug');
        } else {
            res.render('./validations/invalid.pug');
        }
    }).catch(err => {
        console.log(err)        
        res.render('./validations/invalid.pug');
    })
})

router.get('/sent', function(req,res) {
	res.render('./validations/sent.pug');
})

router.get('/forgot', function(req,res) {
	res.render('./validations/forgot.pug');
})

router.get('/match', function(req,res) {
	res.render('./match.pug');
})