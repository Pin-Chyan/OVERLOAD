const defaultData = require('./testdata/default.json');
const mysql = require('mysql');
const db = require('./database/db');

require('dotenv').config();

var tables = [
    {
        name : "users",
        schema : {
            id: 'INT AUTO_INCREMENT primary key NOT NULL UNIQUE',
            name : 'VARCHAR(255)',
            surname : 'VARCHAR(255)',
            password : 'VARCHAR(255)',
            gender : 'INT',
            age : 'INT',
            email : 'VARCHAR(255) UNIQUE',
            sexual_pref : 'INT',
            tag : 'VARCHAR(255)',
            verified : 'INT',
            location : 'VARCHAR(255)',
            token : 'VARCHAR(255)',
            img1 : 'TEXT',
            img2 : 'TEXT',
            img3 : 'TEXT',
            img4 : 'TEXT',
            img5 : 'TEXT'
        }
    }
];

async function init(){
    const conn = mysql.createConnection({
        host: process.env.HOST,
        port : process.env.PORT,
        user: process.env.DBUSER,
        password: process.env.PASS
    });
    await connectPromise(conn);

    // resetting db
    await req(conn, "DROP DATABASE " + process.env.DB);
    await req(conn, "CREATE DATABASE " + process.env.DB);

    // connecting to new db
    const newConn = mysql.createConnection({
        host: process.env.HOST,
        port : process.env.PORT,
        user: process.env.DBUSER,
        password: process.env.PASS,
        database: process.env.DB
    });
    await connectPromise(newConn);
    await build_tables(newConn, tables);
    await uploadDefault(newConn);
}

async function uploadDefault(){
    var i = 0;
    var newUser;
    var res;
    const requestHandler = new db.dbConn();
    while(i < defaultData.length){
        newUser = defaultData[i];
        i++;

        res = await requestHandler.newuser(newUser.email);
        if (res == 'error')
            continue;
        res = await requestHandler.getUserID(newUser.email);
        if (res == -1)
            continue;

        await requestHandler.update('users','name', newUser.name , res);
        await requestHandler.update('users','surname', newUser.last , res);
        await requestHandler.update('users','password', newUser.password , res);
        await requestHandler.update('users','gender', newUser.gender , res);
        await requestHandler.update('users','age', newUser.age , res);
        await requestHandler.update('users','sexual_pref', newUser.sexual_pref , res);
        await requestHandler.update('users','tag', newUser.tag.toString() , res);
        await requestHandler.update('users','verified', 1 , res);
        await requestHandler.update('users','location', newUser.location.toString() , res);
        if (newUser.img){
            if (newUser.img["img 1"])
                await requestHandler.update('users','img1', newUser.img["img 1"], res);
            if (newUser.img["img 2"])
                await requestHandler.update('users','img2', newUser.img["img 2"], res);
            if (newUser.img["img 3"])
                await requestHandler.update('users','img3', newUser.img["img 3"], res);
            if (newUser.img["img 4"])
                await requestHandler.update('users','img4', newUser.img["img 4"], res);
            if (newUser.img["img 5"])
                await requestHandler.update('users','img5', newUser.img["img 5"], res);
        }
        console.log(await requestHandler.get('users', res));
    }
}

function connectPromise(conn){
    return new Promise((resolve) => {
        conn.connect((err) => {
            if (err) {
                console.log(["Cannot aquire senpai's attention", err.code, err.address + ':' + err.port]);
                process.exit(-3);
            }
            resolve('connected');
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

function req(senpai, query){
    return new Promise((resolve) => {
        senpai.query(query, (err, res) => {
            if (err) {
                console.log(['Error','Error :' + err['sqlMessage']]);
            }
            resolve('connected');
        })
    })
}
init().then((res) => { console.log('done');process.exit(1); });