require('dotenv').config();
const router = require('express').Router();
const test_data = require('../test/default.json');
const db = require('../db');
const userHandler = require('../user');
const defaultData = require('../default.json');
const connection = new db.dbConn();


router.route('/hi').post( (req, res) => {
    console.log("HI");
    res.json("yes");
})


router.route('/testdata').post( (req, res) => {
    console.log("HI");
    async function uploadDefault(senpai){
        var i = 0;
        var newUser;
        var res;
        while(i < defaultData.length){
            newUser = new userHandler.userHandler(senpai);
            res = await newUser.create(defaultData[i].email);
            if (res == 'success'){
                await newUser.insert("users","name",defaultData[i].name);
                await newUser.insert("users","surname",defaultData[i].last);
                await newUser.insert("users","password",defaultData[i].password);
                await newUser.insert("users","gender",defaultData[i].gender);
                await newUser.insert("users","age",defaultData[i].age);
                await newUser.insert("users","sexual_pref",defaultData[i].sexual_pref);
                await newUser.insert("users","tag",defaultData[i].tag.toString());
                await newUser.insert("users","location",defaultData[i].location.toString());
            }
            i++;
        }
        i = 0;
        while(i < defaultData.length){
            newUser = new userHandler.userHandler(senpai);
            res = await newUser.init(defaultData[i].email);
            if (res == 'success'){
                newUser.get("users").then((res) => {
                    console.log(res);
                });
            }
            i++;
        }
    }
    uploadDefault(connection.getConnection()).then(() => {
        res.json("done");
    })
})

module.exports = router;