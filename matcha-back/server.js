require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mysql = require('mysql');

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
    });
})