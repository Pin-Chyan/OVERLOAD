require('dotenv').config();
const mysql = require('mysql');

class dbConn{

    constructor(){
        this.senpai = mysql.createConnection({
            host: process.env.HOST,
            port: process.env.PORT,
            user: process.env.DBUSER,
            password: process.env.PASS,
            database: process.env.DB
        });
        this.connected = 'pending';
        this.senpai.connect((err) => {
            if (err) {
                console.log(["Cannot aquire senpai's attention", err.code, err.address + ':' + err.port]);
                this.connected = 'error ,' + err.code; 
            } else {
                this.connected = 'connected';
            }
        })
    }

    getConnection(){
        return this.senpai;
    }

    getConnectionStatus(){
        return this.connected;
    }

    
}

module.exports = { dbConn };