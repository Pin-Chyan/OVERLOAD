var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port : 1111,
  user: "senpai",
  password: "noticeme",
  database: "senpai"
});

var tables = [
    { table : "customers", schema : "(name VARCHAR(255), address VARCHAR(255))"}
];

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected....");
  drop_tables(con, tables);
  build_tables(con, tables);
});

function drop_tables(senpai, tables){
    tables.forEach(element => {
        senpai.query("DROP TABLE " + element.table, function (err , res){ 
            if (err) console.log("Error with query : "+ '" DROP TABLE ' + element.table + ' "');
            else console.log('Dropped Table ' + element.table);
        });
    });
}

function build_tables(senpai, tables){
    tables.forEach(element => {
        senpai.query("CREATE TABLE " + element.table + element.schema , function (err , res){ 
            if (err) console.log("Error with query :"+ '" CREATE TABLE ' + element.table + element.schema + ' "');
            else console.log("Created Table " + element.table + " " + element.schema);
        });
    });
}


//likes (shane) ( user_id , liked , likes)
//images (liam) ( user_id , img1, img2 ......)
//login (marthen) ( user_id, verified, vkey, ping)
//users (default) ( user_id , gender, sexual_pref ... etc)