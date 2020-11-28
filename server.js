// server.js
var express = require('express');
var app = express();
var port = 5005;

// our router
var router = require('./route_handlers/client');
var api = require('./route_handlers/api');
app.use('/', router);
app.use('/', api);

// start the server
app.listen(port, function() {
	console.log("App started on port: "+ port);
});