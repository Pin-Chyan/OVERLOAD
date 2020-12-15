const router = require('express').Router();
const { default: Axios } = require('axios');
const axios = require('axios');
const apiUrl = 'http://localhost:' + process.env.WEBHOSTPORT + '/api';
const db = require('../database/db');

// for db connection
const connection = new db.dbConn();

// JSON body scheme: 
// {
//      "id":1,
//      "email": "your email",
//      "target":user id
// }

router.route('/like').post( (req, res) => {
    liked_handler(req, res,"add");
});

async function liked_handler(req, res, check){
    //select all from likes where *id* = *your id*
    var bool = 1;
    var query = "SELECT * from likes WHERE id= '"+req.body.id+"'";
    var request = await connection.request(query);

    console.log(request.data);
    request.data.forEach(element => {
        if (element.liked == req.body.target){
            bool = 0;
            unlike(req, res);
        }
    });
    if (bool == 1){
        like(req, res);
    }

}

async function notification_handler(id) {
    connection.get("users", id).then((result) => {
        var msg = "You matched with "+result.data[0].name+"! send them a message.";
        console.log(msg);
    
        axios({
            method: 'post',
            url: apiUrl + '/notifications/push',
            data: {
              id: id,
              msg: msg
            }
        }).then((response) => {
            if (response.status == 200){
                console.log("success");
            } else 
                console.log("error")
        });
    })
}

async function addmatch(id1, id2){

    var query = "INSERT INTO matches (id1, id2) VALUES ('"+id1+"','"+id2+"')";
    var request = await connection.request(query);

    if (request.status == "success"){
        console.log("matches added to match box");
    } else {
        console.log("error in addmatch");
    }
}

async function unmatch(req){

    var query = "SELECT * from matches WHERE (id1='"+req.body.id+"' AND id2='"+req.body.target+"') OR (id1='"+req.body.target+"' AND id2='"+req.body.id+"')";
    var request = await connection.request(query);

    if (request.data.length > 0){
        var newquery = "DELETE from matches WHERE (id1='"+req.body.id+"' AND id2='"+req.body.target+"') OR (id1='"+req.body.target+"' AND id2='"+req.body.id+"')";
        var newrequest = await connection.request(newquery);

        if (newrequest.status == "success"){
            console.log("unmatched");
        } else {
            console.log("error in unmatch async func");
        }
    } else {
        console.log("User's not matched");
    }
}

async function checkMatch(req){

    var query = "SELECT * from likes WHERE liked='"+req.body.id+"' AND id='"+req.body.target+"'";
    var request = await connection.request(query);

    if (request.data.length > 0){
        console.log("match found");
        addmatch(req.body.id, req.body.target);
        notification_handler(req.body.id);
        notification_handler(req.body.target);
    } else{
        console.log("no current match");
        console.log(request.data);
    }
}

router.route('/unblock').post( (req, res) => {

    var query = "DELETE from blocked WHERE blocked='"+req.body.target+"' AND id='"+req.body.id+"'";
    var request = connection.request(query);

    request.then((result) => {
        if (result.status == 'success')
            return end2(res, "User unblocked");
        else
            return end2(res, "error");
    });
})

router.route('/block').post( (req, res) => {

    var query = "SELECT * from blocked WHERE blocked= '"+req.body.target+"'";
    var request = connection.request(query);

    request.then((result) => {
        if (result.data.length == 0){
            block(req);
            return end2(res, "user blocked")
        }
        else 
            return end2(res,"User already blocked");
    });
})

router.route('/getfame').post( (req, res) => {

    var query = "SELECT * from likes WHERE liked= '"+req.body.id+"'";
    var request = connection.request(query);

    request.then((result) => {
        var count = result.data.length;
        console.log(result.data);
        console.log(result.data.length);
        if (result.status == 'success')
            return end(res,200,count);
        else
            return end(res,500,"error");
    });
})

async function block(req) {

    var query = "INSERT INTO blocked (id, blocked) VALUES('"+req.body.id+"','"+req.body.target+"')";

    var request = await connection.request(query)

    if (request.status == 'success')
        return;
    else
        return end(res, 500, "error");
}

async function unlike(req, res) {
    var query = "DELETE from likes WHERE (id= '"+ req.body.id +"' AND liked= '"+ req.body.target +"')";
        
    // fame, match and blocked handler
    // fame_handle(req, "increase");
    // match_handle(req,docs[0]._id, sender, reciever);
    
    // assigning like to db
    var result = await connection.request(query);

    // reading response
    if (result.status == 'success'){
        unmatch(req);
        return end(res,200,"User Unliked!");
    }
    else 
        return end(res,500,"error");
}


async function like(req, res) {
    console.log("running like");
    var query = "INSERT INTO likes (id, liked) VALUES('"+ req.body.id +"','"+ req.body.target +"')";
    
    // fame and blocked handler
    // fame_handle(req, "increase");
    // match_handle(req,docs[0]._id, sender, reciever);
    
    // assigning like to db
    var result = await connection.request(query);

    // reading response
    if (result.status == 'success'){
        checkMatch(req);
        return end(res,200,"User liked");
    }
    else 
        return end(res,500,"error");
}



// router.route('/viewed').post( (req, res) => {
//     if (!req.body.token || !req.body.email || !req.body.target)
//         res.json("empty fields");
//     UserModels.find({"email": req.body.email}, "_id name last").exec().then(data => {
//         UserModels.findOne({ "email": req.body.target}, "viewed").exec().then(docs => {
//             if (docs.viewed.includes(data[0]._id))
//                 res.json("already viewed!");
//             else {
//                 sender = data[0].name+data[0].last;
//                 notification_handle(req, "viewed", sender)
//                 var array = docs.viewed;
//                 array.push(data[0]._id);
//                 docs.viewed = array;
//                 docs.save().then(() => {res.json("viewed")})
//             }
//         })
//     }).catch(err => {res.json(err)});
// })

function end(res, status, msg){
    res.status(status);
    res.json(msg);
    return;
}

function end2(res, msg){
    res.json(msg);
    return;
}


module.exports = router;