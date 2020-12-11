const defaultData = require('./route_handlers/database/default.json');
const tables = require('./route_handlers/database/tables.json');
const mysql = require('mysql');
const db = require('./route_handlers/database/db');
const bcrypt = require('bcrypt');

require('dotenv').config();

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

async function hashPassword (user) {
    const password = user.password
    const saltRounds = 10;
  
    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function(err, hash) {
        if (err) reject(err)
        resolve(hash)
      });
    })
  
    return hashedPassword
}

async function uploadDefault(){
    var i = 0;
    var newUser;
    var res;
    const requestHandler = new db.dbConn();
    while(i < defaultData.length){
        newUser = defaultData[i];
        // console.log(newUser);
        i++;

        newUser.password = await hashPassword(newUser)

        res = await requestHandler.newuser(newUser);
        if (res == 'error'){
            continue;
        }
        res = await requestHandler.getUserID(newUser.email);
        if (res == -1){
            continue;
        }

        await requestHandler.update('users','gender', newUser.gender , res);
        await requestHandler.update('users','age', newUser.age , res);
        await requestHandler.update('users','sexual_pref', newUser.sexual_pref , res);
        await requestHandler.update('users','tag', newUser.tag.toString() , res);
        await requestHandler.update('users','verified', 1 , res);
        await requestHandler.update('users','location', newUser.location.toString() , res);
        await requestHandler.update('users','bio', "this is the bio of the great lord " + newUser.name + ". The great lord " + newUser.name + " has been known for many things like " + newUser.tag.toString() , res);
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
        // console.log(await requestHandler.get('users', res));
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
        console.log();
        console.log("CREATE TABLE " + build_table(element));
        console.log();
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