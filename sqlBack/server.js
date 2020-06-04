// well fuck
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;
const mysql = require('mysql');
const usr = {
    host: "localhost",
    port : 3306,
    user: "senpai",
    password: "noticeme",
    database : "oneechan",
}
const senpai = mysql.createConnection(usr).connect((err) => {
    if (err) console.log(["Cannot aquire senpai's attention", err.code, err.address + ':' + err.port]);
    else host();
})
function host(){
    app.use(cors());
    app.use(express.json({limit: '50mb'}));
    app.listen(port, () => {
        console.log(`Server is running on port: ${port}`);
    });
}

// routes
app.get('/test', function(req,res){
    res.json('success');
});

