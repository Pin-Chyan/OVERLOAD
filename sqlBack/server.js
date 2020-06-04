// well fuck
var mysql = require('mysql');
var http = require('http');
var url = require('url');
var usr = {
    host: "localhost",
    port : 3306,
    user: "senpai",
    password: "noticeme",
    database : "oneechan",
}

var connection = async function senpai_prep(){
    console.log("Contacting senpai....");
    var res;
    var senpai = mysql.createConnection(usr);
    // connecting to mysqldb
    res = await connect(senpai);
    if (res != "connected") {
        console.log(res);
        return ("error");
    } else {
        console.log("Aquired Senpais attention");
        return (senpai);
    }
}

function connect(conn){
    return new Promise((resolve) => {
        conn.connect((err) => {
            if (err) resolve(["Cannot aquire senpai's attention", err.code, err.address + ':' + err.port]);
            else resolve('connected');
        })
    })
}

connection().then((senpai) => {
    if (senpai == 'error')
        return ;
    host(senpai);
})

function host(senpai){
    var http = require('http');
    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        request_api(senpai, req.url).then((result) => {
            res.write(result);
            res.end();
        })
    }).listen(8080);
}

async function request_api(senpai, url){
    var route = url.split('?');
    if (route.length == 2)
        route[1] = route[1].split('&');
    if (route[0] == '/fetch')
        return fetch(route[1]);
    if (route[0] == '/write')
        return read(route[1]);
    if (route[0] == '/read')
        return update(route[1]);
    if (route[0] == '/del')
        return del(route[1]);
    if (route[0] == '/done'){
        sleep(2000).then(() => { process.exit()});;
        return 'server will shut down in 2 seconds';
    }
    return '404';
}

async function fetch(url, args){
    await sleep(1000).then(() => { console.log(args); });
    return ('fetched');
}
async function read(url, args){
    await sleep(1000).then(() => { console.log(args); });
    return ('read');
}
async function update(url, args){
    await sleep(1000).then(() => { console.log(args); });
    return ('updated');
}
async function del(url, args){
    await sleep(1000).then(() => { console.log(args); });
    return ('deleted');
}

function sleep(ms){
    return new Promise((resolve) => {
        setTimeout(resolve , ms);
    })
}