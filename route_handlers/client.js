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
const crypto = require('crypto');
const { generate } = require('password-hash');

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

function sendMail(details) {
    mailOptions = {
        to : details.email,
        subject : details.subject,
        html : details.message 
    }
    smtpTransport.sendMail(mailOptions, function(error, response){
        if (error){
            console.log(error);
        } else{
            console.log("Message sent: " + response.message);
        }
    })
}

function generateToken(email) {
    const rand = ()=>Math.random(0).toString(36).substr(2);
    const hashed = crypto.createHash('md5').update(email).digest('hex')
    const token = rand() + hashed + rand()

    return token
}

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
                const token = generateToken(user.email);

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
                        host = "localhost:" + process.env.WEBHOSTPORT;
                        link = "http://" + host + "/confirm?token=" + token
                        sendMail({
                            email: user.email,
                            subject: "Please confirm your Email account",
                            message: "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"
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

router.post('/reset', urlcodedParser, function(req, res) {
    let {password} = req.body;
    const token = req.query.token;

    console.log(token)

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt,
            (err, hash) => {
                if (err) throw err;
                password = hash;

                axios({
                    method: 'post',
                    url: apiUrl + '/auth/resetPassword',
                    data: {
                        password,
                        token
                    }
                }).then((response) => {
                    console.log(response.data.status)
                    res.redirect('/login')
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

router.get('/match', ensureAuthenticated, function(req, res) {
	res.render('match.pug', {
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

router.get('/reset', function(req,res) {
    res.render('./validations/reset.pug');
})

router.post('/forgot', function(req,res) {
    const token = generateToken(req.body.email)

    axios({
        method: 'post',
        url: apiUrl + '/auth/setResetToken',
        data: {
            email: req.body.email,
            token
        }
    }).then((response) => {
        console.log(response.data.status)
        if (response.data.status == 'success') {
            host = "localhost:" + process.env.WEBHOSTPORT;
            link = "http://" + host + "/reset?token=" + token
            
            sendMail({
                email: req.body.email,
                subject: "Reset Password",
                message: "Hello,<br> Please Click on the link to reset your password.<br><a href="+link+">Click here to verify</a>"
            })
            res.render('./validations/forgot-sent.pug')
        } else {
            res.render('./validations/invalid.pug');
        }
    }).catch(err => {
        // console.log(err)        
        res.render('./validations/invalid.pug');
    })
    
    // res.render('./validations/forgot-sent.pug')
})

