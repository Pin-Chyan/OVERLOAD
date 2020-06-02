// var mysql = require('mysql');
// var usr = {
//     host: "localhost",
//     port : 1111,
//     user: "senpai",
//     password: "noticeme",
//     database: "senpai"
// }

// var con = mysql.createConnection(usr);

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
//   con.query("CREATE DATABASE mydb", function (err, result) {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });
var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
  fs.readFile('game.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('hi');
    return res.end();
  });
}).listen(8080);