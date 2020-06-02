var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port : 1111,
  user: "senpai",
  password: "noticeme",
  database: "senpai"
});

var tables = [
    { table : "customers", schema : "(name VARCHAR(255), address VARCHAR(255))"},
];

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected....");
  Promise.all(drop_tables(con, tables)).then((res) => {
    console.log(res);
    Promise.all(build_tables(con, tables)).then((res2) => {
        console.log(res2);
        console.log('done');
        process.exit();
    })
  });
});

function drop_tables(senpai, tables){
    var arr = [];
    tables.forEach(element => {
        arr.push(req(senpai, "DROP TABLE " + element.table));
    });
    return arr;
}

function build_tables(senpai, tables){
    var arr = [];
    tables.forEach(element => {
        arr.push(req(senpai, "CREATE TABLE " + element.table + element.schema));
    });
    return arr;
}

function req(senpai, query){
    return new Promise((resolve) => {
        senpai.query(query, (err, res) => {
            if (err) resolve('Error :' + err['sqlMessage']);
            else resolve(query);
        })
    })
}


//likes (shane) ( user_id , liked , likes)
//images (liam) ( user_id , img1, img2 ......)
//login (marthen) ( user_id, verified, vkey, ping)
//users (default) ( user_id , gender, sexual_pref ... etc)