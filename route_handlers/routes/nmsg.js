const router = require('express').Router();
const db = require('../database/db');

// for db connection
const connection = new db.dbConn();

// get chatrooms + messages + data
// var demo = {
//     "chatrooms" : [
//         {
    //             "id":2,
    //                 "usr1":"user data",
    //                 "usr2":"user data",
    //                 "msgs":[
        //                     {
            //                         "msg":"ok",
            //                         "time":"bla bla"
            //                     }
            //                 ]
//             "data":{
//             },
//         }
//     ]
// }
// send messages

router.route('/makechatroom').get( (req, res) => {
    if (!(req.query.usr1 && req.query.usr2))
        return end(res, 401, "specify usr1 / usr2 ids");
    makeChatroom(req.query.usr1, req.query.usr2).then((result) => {
        return end(res,200,result);
    })
})

// make chatroom
async function makeChatroom(usr1, usr2){
    var chatroom;
    if (usr1 > usr2)
        chatroom = await connection.request("INSERT INTO chatroom (usr1,usr2) VALUES('" + usr2 + "','" + usr1 + "')");
    else
        chatroom = await connection.request("INSERT INTO chatroom (usr1,usr2) VALUES('" + usr1 + "','" + usr2 + "')");
    return chatroom;
}


router.route('/getchatroom').get( (req, res) => {
    if (!(req.query.usr1 && req.query.usr2))
        return end(res, 401, "specify usr1 / usr2 ids");
    getChatroom(req.query.usr1, req.query.usr2).then((result) => {
        if (result == null)
            return end(res,404,result);
        else
            return end(res,200,result);
    })
})

// get chatroom 
async function getChatroom(usr1, usr2){
    var chatroom;
    if (usr1 > usr2)
        chatroom = await connection.request("SELECT * from chatroom WHERE (usr1='" + usr2 + "' AND usr2='" + usr1 + "')");
    else
        chatroom = await connection.request("SELECT * from chatroom WHERE (usr1='" + usr1 + "' AND usr2='" + usr2 + "')");
    if (chatroom.status == 'success'){
        return chatroom.data[0];
    } else {
        return null;
    }
}

router.route('/getmychatrooms').get( (req, res) => {
    if (!(req.query.id))
        return end(res, 401, "specify usr1 / usr2 ids");
    getMyChatrooms(req.query.id).then((result) => {
        if (result == null)
            return end(res,404,result);
        else
            return end(res,200,result);
    })
})

async function getMyChatrooms(id){
    var chatroom;
    chatroom = await connection.request("SELECT * from chatroom WHERE (usr1='" + id + "' OR usr2='" + id + "') ");
    console.log(chatroom);
    if (chatroom.status == 'success'){
        await getData(chatroom.data);
        return chatroom.data;
    } else {
        return null;
    }
}

async function getData(chatrooms){
    var i = 0;
    var request1;
    var request2;
    var messages;
    while (i < chatrooms.length){
        request1 = await connection.request("SELECT id, name, img1 from users WHERE id='" + chatrooms[i].usr1 + "'");
        request2 = await connection.request("SELECT id, name, img1 from users WHERE id='" + chatrooms[i].usr2 + "'");
        messages = await connection.request("SELECT * from msg WHERE chatroom='" + chatrooms[i].id + "'");
        chatrooms[i].usr1 = request1.data[0];
        chatrooms[i].usr2 = request2.data[0];
        console.log(messages);
        chatrooms[i].msg = messages.data;
        i++;
    }
}

// send messages
router.route('/send').get( (req, res) => {
    if (!req.query.chatroom || !req.query.id || !req.query.msg){
        return end(res, 400, "no");
    }
    sendMessage(req).then((result) => {
        return end(res, 400, "yes");
    })
})

async function sendMessage(req){
    var chatroom = await connection.request("SELECT * from chatroom WHERE id='" + req.query.chatroom + "'");
    console.log(chatroom);
    if (chatroom.status != 'success' || chatroom.data.length == 0)
        return chatroom;
    
    console.log(chatroom.data[0]);
    var time = new Date();
    var timeString = time.getFullYear()+'-'+(time.getMonth()+1)+'-'+time.getDate() + ' ' + time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
    var message = {
        chatroom: chatroom.data[0].id,
        sender: req.query.id,
        msg:req.query.msg,
        time:timeString
    }
    console.log(message);
    await saveToDb(message);
    await sendSocket(req, chatroom.data[0], message);
}

async function saveToDb(message){
    var result = await connection.request("INSERT INTO msg (chatroom,sender,msg,time) VALUES('" + message.chatroom + "','" + message.sender + "','" + message.msg + "','" + message.time + "')");
    console.log("save to db");
    console.log(result);
}

async function sendSocket(req, chatroom, message, res){
    let id = req.body.id;
	let io = req.app.get('io');
    let clients = req.app.get('clients');
    var socketId;
    if (chatroom.usr1 == req.query.id)
        socketId = clients[chatroom.usr2];
    else
        socketId = clients[chatroom.usr1];

    if (socketId != undefined)
        io.to(socketId).emit('message', message)
}

function end(res, status, msg){
    res.status(status);
    res.json(msg);
    return;
}
// send message 
module.exports = router;