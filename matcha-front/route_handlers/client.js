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

                axios({
                    method: 'post',
                    url: apiUrl + '/auth/register',
                    data: {
                      name: user.name,
                      surname: user.surname,
                      email: user.email,
                      password: user.password
                    }
                }).then((response) => {
                    if (response.data.success == true) {
                        console.log("added user")
                        console.log("need to send confimation email")
                        // -------------------------------------
                        // ----> SEND CONFIRMATION EMAIL <------
                        // -------------------------------------
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
	res.render('home.pug');
})

router.get('/profile', ensureAuthenticated, function(req, res) {
    res.render('profile.pug');
})

router.get('/chats', ensureAuthenticated, function(req, res) {
    res.render('chats.pug');
})

router.get('/search', ensureAuthenticated, function(req, res) {
    res.render('search.pug');
})

router.get('/confirm', function(req,res) {
	res.render('./validations/confirm.pug');
})

router.get('/sent', function(req,res) {
	res.render('./validations/sent.pug');
})