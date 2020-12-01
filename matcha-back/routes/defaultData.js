require('dotenv').config();
const router = require('express').Router();
const defaultData = require('../init/default.json');

const db = require('../database/db');
const connection = new db.dbConn();

const request = require('../database/request');
const requestHandler = new request.handler(connection.getConnection());


router.route('/testdata').post( (req, res) => {
    async function uploadDefault(senpai){
        var i = 0;
        var newUser;
        var res;
        while(i < defaultData.length){
            newUser = defaultData[i];
            i++;

            res = await requestHandler.newuser(newUser.email);
            if (res == 'error')
                continue;
            res = await requestHandler.getUserID(newUser.email);
            if (res == -1)
                continue;

            await requestHandler.update('users','name', newUser.name , res);
            await requestHandler.update('users','surname', newUser.last , res);
            await requestHandler.update('users','password', newUser.password , res);
            await requestHandler.update('users','gender', newUser.gender , res);
            await requestHandler.update('users','age', newUser.age , res);
            await requestHandler.update('users','sexual_pref', newUser.sexual_pref , res);
            await requestHandler.update('users','tag', newUser.tag.toString() , res);
            await requestHandler.update('users','verified', 1 , res);
            await requestHandler.update('users','location', newUser.location.toString() , res);
            if (newUser.img){
                if (newUser.img["img 1"])
                    await requestHandler.update('users','img1', newUser.img["img 1"], res);
                if (newUser.img["img 2"])
                    await requestHandler.update('users','img2', newUser.img["img 2"], res);
                if (newUser.img["img 3"])
                    await requestHandler.update('users','img3', newUser.img["img 3"], res);
                if (newUser.img["img 4"])
                    await requestHandler.update('users','img4', newUser.img["img 4"], res);
                if (newUser.img["img 5"])
                    await requestHandler.update('users','img5', newUser.img["img 5"], res);
            }

        }
    }
    uploadDefault(connection.getConnection()).then(() => {
        res.json("done");
    })
})

module.exports = router;