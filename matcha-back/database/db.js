require('dotenv').config();
const mysql = require('mysql');

class dbConn{

    constructor(){
        // specifies connection parameters
        this.conn = mysql.createConnection({
            host: process.env.HOST,
            port: process.env.PORT,
            user: process.env.DBUSER,
            password: process.env.PASS,
            database: process.env.DB
        });

        // attepmts to connect to database 
        this.conn.connect((err) => {
            if (err) {
                console.log(["Cannot aquire senpai's attention", err.code, err.address + ':' + err.port]);
                // node sever will exit if there is any db connection error
                process.exit(-3);
            }
        });
    }

    // returns connection object (for advanced config)
    getConnection(){
        return this.conn;
    }

    // these are specific methods for creating a new user in the user table
    async newuser(email){
        // sql query for creating a user using an email
        var query = "INSERT INTO users (email) VALUES('" + email + "')";
        var res = await this.request(query);
        console.log(res);
        if (res.status == 'success'){
            return 'sucess';
        } else {
            return 'error';
        }
    }

    // gets a user id using a users email (usefull exactly after we create a new user to get their id)
    async getUserID(email){
        var query = "SELECT id from users WHERE email='" + email + "'";
        var res = await this.request(query);
        if (res.status == 'success'){
            return res.data[0].id;
        } else {
            return -1;
        }
    }

    // these functions are for simple database opperations

    // inserts a new emtpy row into any specified table using a user id
    newrow(table, id){
        var query = "INSERT INTO " + table + " (user_id) VALUES('" + id + "')";
        return this.request(query);
    }

    // gets a row from any table specified using a user id 
    get(table, id){
        var query = "SELECT * from " + table + " WHERE id='" + id + "'";
        return this.request(query);
    }

    // updates one value in any specified table and column (columns must be specified)
    update(table, column, data, id){
        var query = "UPDATE " + table + " SET " + column + "='" + data + "' WHERE id='" + id + "'";
        console.log(query);
        return this.request(query);
    }

    // this basically grabs an entire table (im going to use this for my search engine later)
    searchData(table){
        var query = "SELECT * from " + table;
        return this.request(query);
    }

    // for advanced queries to the database

    // this wraps an sql query in a promise and returns it (usefull when you need to make a specfic request and await / .then to get its response)
    request(query){
        return new Promise((resolve) => {
            // performs query using connection
            this.conn.query(query, (err, res) => {
                // resolves with a status 'error' if there is any and places sql error in data field
                if (err) resolve({
                    "status":"error",
                    "data": err['sqlMessage']
                })
                // ressolves with a status success and places the raw result in the data field
                resolve({
                    "status":"success",
                    "data": res
                });
            })
        })
    }

    
}

module.exports = { dbConn };