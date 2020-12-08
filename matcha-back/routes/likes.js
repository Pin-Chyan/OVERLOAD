require('dotenv').config();
const router = require('express').Router();
const db = require('../database/db');

// for db connection
const connection = new db.dbConn();


router.route('/like').post( (req, res) => {
    // JSON body scheme: 
    // {
    //      "id":1,
    //      "email": "your email",
    //      "target":user id
    // }

    liked_handler(req, res,"add");
});

async function liked_handler(req, res, check){
    //select all from likes where *id* = *your id*
    var bool = 1;
    var query = "SELECT * from likes WHERE id= '"+req.body.id+"'";
    var request = await connection.request(query);

    console.log(request.data);
    request.data.forEach(element => {
        console.log("foreach works");
        if (element.liked == req.body.target){
            bool = 0;
            unlike(req, res);
        }
    });
    if (bool == 1){
        like(req, res);
    }

}

function fame_handle(req, fame){
    // UserModels.findOne({"email": req.body.target}, "fame").exec().then(docs => {
    //     if (fame === "decrease"){
    //         docs.fame--;
    //         docs.save().catch(err => {console.log(err)});
    //     }
    //     else if (fame === "increase"){
    //         docs.fame++;
    //         docs.save().catch(err => {console.log(err)});
    //     }
    //     else
    //         throw err;
    // }).catch(err => {console.log(err)})
}

async function unlike(req, res) {
    console.log("running unlike");
    var query = "DELETE from likes WHERE (id= '"+ req.body.id +"' AND liked= '"+ req.body.target +"')";
        
    // fame, match and blocked handler
    // fame_handle(req, "increase");
    // match_handle(req,docs[0]._id, sender, reciever);
    
    // assigning like to db
    var result = await connection.request(query);

    // reading response
    if (result.status == 'success')
        return end(res,200,"User Unliked!");
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
    if (result.status == 'success')
        return end(res,200,"User liked");
    else 
        return end(res,500,"error");
}



//     UserModels.find({"email": req.body.target}, "_id liked name last").exec().then(docs => {
//         UserModels.findOne({"email": req.body.email}, "_id likes name last blocked").exec().then(docs2 => {
//             if (!docs2.likes.includes(docs[0]._id || !docs2.blocked.includes(docs._id))){
//                 var sender = docs2.name+" "+docs2.last;
//                 var reciever = docs[0].name+" "+docs[0].last;
//                 fame_handle(req, "increase");
//                 liked_handle(req, docs2._id,"add");
//                 match_handle(req,docs[0]._id, sender, reciever);
//                 var like = docs2.likes;
//                 like.push(docs[0]._id);
//                 docs2.likes = like;
//                 docs2.save().then(r => {res.json("liked")}).catch(err => {res.json(err)});
//             }
//             else if (docs2.blocked.includes(docs._id))
//                 res.json("You have been blocked by this user");
//             else
//                 res.json("Already Liked!");
//         })
//     }).catch(err => {res.json(err)})
// })


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