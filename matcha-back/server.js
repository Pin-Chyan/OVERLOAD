require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const userHandler = require('./user');
const { request } = require('express');
const defaultData = require('./default.json');

const senpai = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.DBUSER,
    password: process.env.PASS,
    database: process.env.DB
});

app.use(cors());
app.use(bodyParser());
app.use(express.json({limit: '50mb'}));

senpai.connect((err) => {
    if (err) console.log(["Cannot aquire senpai's attention", err.code, err.address + ':' + err.port]);
    else app.listen(process.env.HOSTPORT, () => {
        console.log(`Server is running on port: ${process.env.HOSTPORT}`);
        uploadDefault(senpai).then((res) => {
            console.log('done')
        });
    });
})

async function uploadDefault(senpai){
    var i = 0;
    var newUser;
    var res;
    while(i < defaultData.length){
        newUser = new userHandler.userHandler(senpai);
        res = await newUser.create(defaultData[i].email);
        if (res == 'success'){
            await newUser.insert("users","name",defaultData[i].name);
            await newUser.insert("users","surname",defaultData[i].last);
            await newUser.insert("users","password",defaultData[i].password);
            await newUser.insert("users","gender",defaultData[i].gender);
            await newUser.insert("users","age",defaultData[i].age);
            await newUser.insert("users","sexual_pref",defaultData[i].sexual_pref);
            await newUser.insert("users","tag",defaultData[i].tag.toString());
            await newUser.insert("users","location",defaultData[i].location.toString());
        }
        i++;
    }
    i = 0;
    while(i < defaultData.length){
        newUser = new userHandler.userHandler(senpai);
        res = await newUser.init(defaultData[i].email);
        if (res == 'success'){
            newUser.get("users").then((res) => {
                console.log(res);
            });
        }
        i++;
    }
}

