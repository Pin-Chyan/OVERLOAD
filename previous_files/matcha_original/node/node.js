var http = require('http');// http module used for http hosting
var dt = require('./myfirstmodule');// external web modules
var url = require('url');// url module used for 

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The date and time are currently: " + dt.myDateTime());
  res.end();
}).listen(8080);