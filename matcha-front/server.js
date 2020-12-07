// server.js
var express = require('express');
const session = require('express-session');
var bodyParser = require('body-parser');
const passport = require('passport');
var app = express();
var port = 5005;

require("./route_handlers/config/passport.js")(passport)

// our router
var router = require('./route_handlers/client');
var api = require('./route_handlers/api');
// const { session } = require('passport');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use('/', router);
app.use('/', api);

// start the server
app.listen(port, function() {
	console.log("App started on port: "+ port);
});