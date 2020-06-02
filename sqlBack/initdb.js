var mysql = require('mysql');
var usr = {
    host: "localhost",
    port : 3306,
    user: "senpai",
    password: "noticeme",
    database: "senpai"
}
var con = mysql.createConnection(usr);
usr.password = 'notyourharem(this is not the actual password)';

var tables = [
    { table : "testTable", schema : "(name VARCHAR(255), address VARCHAR(255))"},
];

console.log("Contacting Senpai....");
con.connect(function(err) {
  if (err) throw (["Cannot aquire senpai's attention", err.code, err.address + ':' + err.port]);
  console.log("Aquired Senpai's attention");
  console.log(" ");
  console.log("Configuring Senpai's noticing schemas");
  Promise.all(drop_tables(con, tables)).then((res) => {
    console.log(res);
    Promise.all(build_tables(con, tables)).then((res2) => {
        console.log(res2);
        console.log(' ');
        console.log('Senpai noticing has been configured');
        console.log('notice me specifications :');
        console.log(usr);
        console.log(' ')
        console.log('Senpai can now notice on port ' + usr.port);
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