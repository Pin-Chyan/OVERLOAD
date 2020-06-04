var mysql = require('mysql');
var usr = {
    host: "localhost",
    port : 3306,
    user: "senpai",
    password: "noticeme"
}

var db_name = "oneechan"
var tables = [
    {
        name : "users", 
        schema : {
            id : 'varchar(255)',
            name : 'varchar(255)',
            img : 'blob'
        }
    },
    {
        name : "users2", 
        schema : {
            id : 'varchar(255)',
            name : 'varchar(255)',
            img : 'blob'
        }
    },
];

async function senpai_prep(){
    console.log("Contacting senpai....");
    var res;
    var senpai = mysql.createConnection(usr);
    // connecting to mysqldb
    res = await connect(senpai);
    if (res != "connected") {
        console.log(res);
        return ;
    } else console.log("Aquired Senpais attention");
    // done 
    // resetting old db
    console.log("Resetting senpais dbs");
    res = await req(senpai, "DROP DATABASE " + db_name);
    if (res[0] != 'Success') {
        console.log(["Senpai did not notice yet (" + db_name + " db was not created yet)", res[1]]);
    } else console.log(["Removed Senpai's old " + db_name + " db"]);
    // done
    // making new db
    console.log("Setting up senpai's new db");
    res = await req(senpai, "CREATE DATABASE " + db_name);
    if (res[0] != 'Success') {
        console.log(["Cannot create new " + db_name + " db", res[1]]);
        return;
    } else console.log(["Senpai's new db online"]);
    // done
    // disconnecting from current db
    senpai.end();
    // done
    // connecting to new db
    usr.database = db_name;
    senpai = mysql.createConnection(usr);
    res = await connect(senpai);
    if (res != "connected") {
        console.log(res);
        return ;
    } else console.log("Aquired Senpais attention");
    // setting up tables
    res = await build_tables(senpai, tables);
    console.log(res);
}

function connect(conn){
    return new Promise((resolve) => {
        conn.connect((err) => {
            if (err) resolve(["Cannot aquire senpai's attention", err.code, err.address + ':' + err.port]);
            else resolve('connected');
        })
    })
}


function req(senpai, query){
    return new Promise((resolve) => {
        senpai.query(query, (err, res) => {
            if (err) resolve(['Error','Error :' + err['sqlMessage']]);
            else resolve(['Success','Query : ' + query]);
        })
    })
}

function build_tables(senpai, tables){
    var arr = [];
    tables.forEach(element => {
        arr.push(req(senpai, "CREATE TABLE " + build_table(element)));
    });
    return Promise.all(arr);
}

function build_table(table){
    var schema = "(";
    var columns = Object.keys(table.schema);
    columns.forEach((element,i) => {
        schema += " `" + element + "` " + table.schema[element];
        if (i != columns.length - 1)
            schema += ','; 
    })
    schema += ")"
    return (table.name + schema);
}

senpai_prep().then((res) => { process.exit(); });