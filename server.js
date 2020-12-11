// server.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const app = express();
const port = process.env.WEBHOSTPORT;
const socketPort = process.env.SOCKETMESSAGEPORT
var http = require('http').createServer(app);
const io = require('socket.io')(http)
require("./route_handlers/config/passport.js")(passport);
const socketClients = {}

const sessionMiddleware = session({
	secret: 'secret',
    resave: true,
    saveUninitialized: true
})

// for backend request body
app.use(cors());

// json size limiter and config
app.use(express.json({limit: '50mb'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// session stuff
app.use(sessionMiddleware)
app.use(passport.initialize());
app.use(passport.session());

// route usage
app.use('/api', require('./route_handlers/api'));
app.use('/', require('./route_handlers/client'));

//socket stuff
app.set('io', io);
app.set('clients', socketClients)
io.use(function(socket, next) {
	sessionMiddleware(socket.request, socket.request.res, next);
});

io.on('connection', function(socket) {
	if (socket.request.session.passport) {	
		socketClients[socket.request.session.passport.user] = socket.id 
	}

	socket.request.session.save();
	console.log("session at socket.io connection:\n", socket.request.session);
	
	socket.on('disconnect', function () {
		for (socketid in socketClients) {
			if (socketClients[socketid] == socket.id)
				delete socketClients[socketid]
		}
	})
});



// start the server
http.listen(port, function() {
	console.log("App started on port: "+ port);
});