// well fuck
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');
const auth = require('./api/auth');
const chat = require('./api/chat');
const notify = require('./api/notify');
const images = require('./api/images');
const likes = require('./api/likes');
const tags = require('./api/tags');
const ping = require('./api/pingAPI');
const search = require('./api/search');
const users = require('./api/users');
const test = require('./api/test');
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
const authControllers = new auth.controllers(senpai);
const chatControllers = new chat.controllers(senpai);
const notifyControllers = new notify.controllers(senpai);
const pingControllers = new ping.controllers(senpai);
const likesControllers = new likes.controllers(senpai);
const tagsControllers = new tags.controllers(senpai);
const imagesControllers = new images.controllers(senpai);
const searchControllers = new search.controllers(senpai);
const usersControllers = new users.controllers(senpai);
const testControllers = new test.controllers(senpai);
// 
app.use(cors());
app.use(bodyParser());
app.use(express.json({limit: '50mb'}));
app.post('/auth', (req,res) => {
    authControllers.query(req,res);
});
app.post('/chat', (req,res) => {
    chatControllers.query(req,res);
});
app.post('/notify', (req,res) => {
    notifyControllers.query(req,res);
});
app.post('/ping', (req,res) => {
    pingControllers.query(req,res);
});
app.post('/search', (req,res) => {
    searchControllers.query(req,res);
});
app.post('/users', (req,res) => {
    usersControllers.query(req,res);
});
app.post('/test', (req, res) => {
    testControllers.query(req, res);
});
app.post('/images', (req, res) => {
    imagesControllers.query(req, res);
});
app.post('/likes', (req, res) => {
    likesControllers.query(req, res);
});
app.post('/tags', (req, res) => {
    tagsControllers.query(req, res);
});
