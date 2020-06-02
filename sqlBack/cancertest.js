var mysql = require('mysql');
var usr = {
    host: "localhost",
    port : 1111,
    user: "senpai",
    password: "noticeme",
    database: "senpai"
}

var con = mysql.createConnection(usr);

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  con.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
});