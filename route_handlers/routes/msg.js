const router = require('express').Router();
const db = require('../database/db');

// for db connection
const connection = new db.dbConn();


router.route('/send').post( (req, res) => {
    // id(your id), rec(the msg recipient id), msg
    // {}
    // checking stuff
    let io = req.app.get('io');
    let clients = req.app.get('clients');
    const socketIdRec = clients[req.body.rec];
    if (socketIdRec != undefined){
        io.to(socketIdRec).emit('msg_notify', "recieved msg");
        io.to(socketIdRec).emit('msg', req.body.msg);
    }

    if (!req.body.id || !req.body.rec){
        return end(res,401,"an id was not specified");
    }
    if (!req.body.msg){
        return end(res,400,"message cannot be null");
    }
    
    // building query
    var time = new Date();
    var timeString = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate() + ' ' + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    var query = "INSERT INTO msg (sender,rec,msg,time) VALUES('" + req.body.id + "','" + req.body.rec + "','" + req.body.msg + "','" + timeString + "')";
    
    
    // writing new message to DB
    var request = connection.request(query);

    // reading response
    request.then((result) => {
        if (result.status == 'success')
            return end(res,200,"done");
        else 
            return end(res,500,"error");
    });
})

router.route('/get').get( (req, res) => {
    // id(your id), rec(the msg recipient id)

    if (!req.query.id || !req.query.rec){
        return end(res,401,"an id was not specified");
    }

    // building query
    var query = "SELECT * from msg WHERE (sender='" + req.query.id + "' AND rec='" + req.query.rec + "') OR (sender='" + req.query.rec + "' AND rec='" + req.query.id + "')";

    // getting messages from DB
    var request = connection.request(query);

    // reading response
    request.then((result) => {
        if (result.status == 'success')
            return end(res,200,result.data);
        else
            return end(res,500,"error");
    });
})

router.route('/recents').get( (req, res) => {
    if (!req.query.id){
        return end(res,401,"an id was not specified");
    }

    // building query
    var query = "SELECT * from msg WHERE (sender='" + req.query.id +"' ) OR (rec='" + req.query.id + "')";

    // getting messages from DB
    var request = connection.request(query);

    // reading response
    request.then((result) => {
        if (result.status == 'success'){
            var availableChats = filterMessages(result.data);
            return end(res,200, availableChats);
        }
        else
            return end(res,500,"error");
    });
})

function filterMessages(messageData){
    var chats = [];
    var i = 0; 
    while (i < messageData.length){
        if (!inChats(chats, messageData[i])){
            chats.push(messageData[i]);
        }
        i++;
    }
    return chats;
}

function inChats(chats, msg){
    var i = 0;
    while (i < chats.length){
        if ((msg.sender == chats[i].sender && msg.rec == chats[i].rec) || (msg.rec == chats[i].sender && msg.sender == chats[i].rec))
            return true;
        i++;
    }
    return false;
}

function end(res, status, msg){
    res.status(status);
    res.json(msg);
    return;
}


module.exports = router;