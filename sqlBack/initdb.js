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
    {
        table : "users", 
        schema : "(`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `username` VARCHAR(50) NOT NULL,`email` VARCHAR(100) NOT NULL,`password` VARCHAR(255) NOT NULL, `vkey` VARCHAR(50),`verified` tinyint(1) DEFAULT 0,`reg_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)"
    },
    // {
    //     table : "likes",
    //     schema : "(``)"
    // },
];

// User_id email(string)
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