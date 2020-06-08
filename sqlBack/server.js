// well fuck
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const auth = require('./api/authAPI');
const chat = require('./api/chatAPI');
const notifications = require('./api/notificationsAPI');
const ping = require('./api/pingAPI');
const search = require('./api/searchAPI');
const users = require('./api/usersAPI');
const port = 5001;
const senpai = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.PORT,
    user: process.env.DBUSER,
    password: process.env.PASS,
    database: process.env.DB
});
// console.log(process.env);
senpai.connect((err) => {
    if (err) console.log(["Cannot aquire senpai's attention", err.code, err.address + ':' + err.port]);
    else app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
})
// build api classes
const authAPI = new auth.authAPI(senpai);
const chatAPI = new chat.chatAPI(senpai);
const notificationsAPI = new notifications.notificationsAPI(senpai);
const pingAPI = new ping.pingAPI(senpai);
const searchAPI = new search.searchAPI(senpai);
const usersAPI = new users.usersAPI(senpai);
// 
app.use(cors());
app.use(bodyParser());
app.use(express.json({limit: '50mb'}));
app.post('/auth', (req,res) => {
    authAPI.query(req,res);
});
app.post('/chat', (req,res) => {
    chatAPI.query(req,res);
});
app.post('/notify', (req,res) => {
    notificationAPI.query(req,res);
});
app.post('/ping', (req,res) => {
    pingAPI.query(req,res);
});
app.post('/search', (req,res) => {
    searchAPI.query(req,res);
});
app.post('/user', (req,res) => {
    usersAPI.query(req,res);
});

// authAPI.query(null, null);