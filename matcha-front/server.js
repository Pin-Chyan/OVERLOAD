// server.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const app = express();
const port = 5005;

require("./route_handlers/config/passport.js")(passport);

// for backend request body
app.use(cors());


// json size limiter and config
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// session stuff
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());

// route usage
app.use('/api', require('./route_handlers/api'));
app.use('/', require('./route_handlers/client'));


// start the server
app.listen(port, function() {
	console.log("App started on port: "+ port);
});