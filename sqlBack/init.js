var mysql = require('mysql');
var usr = {
    host: "localhost",
    port : 3306,
    user: "senpai",
    password: "noticeme"
};
var db_name = "oneechan"
var tables = [
    {
        name : "users", 
        schema : {
            user_id : 'VARCHAR(255)',
            name : 'VARCHAR(255)',
            surname : 'VARCHAR(255)',
            email : 'VARCHAR(255)',
            verified: 'INT',
            token: 'VARCHAR(255)',
            password : 'VARCHAR(255)',
            age : 'INT',
            gender : 'INT',
            sexual_pref : 'INT',
            bio : 'VARCHAR(10000)'
        }
    },
    {
        name : "likes", 
        schema : {
            user_id : 'VARCHAR(255)',
            target : 'TEXT',
            likedBy : 'TEXT',
        }
    },
    {
        name : "images", 
        schema : {
            user_id : 'VARCHAR(255)',
            img1 : 'TEXT',
            img2 : 'TEXT',
            img3 : 'TEXT',
            img4 : 'TEXT',
            img5 : 'TEXT',
        }
    },
    {
        name : "notifications", 
        schema : {
            user_id : 'VARCHAR(255)',
            Notification : 'TEXT',
            read : 'INT',
        }
    },
    {
        name : "viewed", 
        schema : {
            user_id : 'VARCHAR(255)',
            viewers : 'TEXT',
        }
    },
    {
        name : "chatrooms", 
        schema : {
            user_id : 'VARCHAR(255)',
            target_id : 'VARCHAR(255)',
            chatroom_id : 'VARCHAR(255)'
        }
    },
    {
        name : "blocked", 
        schema : {
            user_id : 'VARCHAR(255)',
            blocked : 'TEXT'
        }
    },
    {
        name : "locations", 
        schema : {
            user_id : 'VARCHAR(255)',
            x : 'FLOAT',
            y : 'FLOAT'
        }
    },
    {
        name : "tags", 
        schema : {
            user_id : 'VARCHAR(255)',
            tag1 : 'VARCHAR(255)',
            tag2 : 'VARCHAR(255)',
            tag3 : 'VARCHAR(255)',
            tag4 : 'VARCHAR(255)',
            tag5 : 'VARCHAR(255)'
        }
    },
    {
        name : "messages", 
        schema : {
            chatroom_id : 'VARCHAR(255)',
            from_id : 'VARCHAR(255)',
            msg : 'VARCHAR(2000)',
            read : 'INT',
            timestamp : 'VARCHAR(255)'
        }
    },
    {
        name : "ping",
        schema : {
            ms : 'int'
        }
    },
    {
        name : "test",
        schema : {
            integer : 'INT',
            character : 'VARCHAR(255)'
        }
    }
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
            else resolve(['Success', ' Query : "' + query + '" ']);
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
    schema += ")";
    return (table.name + schema);
}

senpai_prep().then((res) => { process.exit(); });