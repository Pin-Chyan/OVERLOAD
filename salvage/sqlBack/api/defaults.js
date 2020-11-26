const request = require('./request');
const test_data = require('./default_data.json');

class controllers{

    constructor(senpai){
        this.senpai = senpai;
        this.request = new request.requestHandler(senpai);
    }
        
    query(req, res){
        var body = req.body;
        if (this[body.controller])
            this[body.controller](body).then(result => { res.json(result); });
        else
            res.json('error unknown controller');
    }
    async add(requestBody){
        var res;
        var i = 0;
        while (i < test_data.length){
            res = await this.request.delete('users',{
                "user_id":test_data[i].email
            });
            res = await this.request.delete('tags',{
                "user_id":test_data[i].email
            });
            res = await this.request.delete('images',{
                "user_id":test_data[i].email
            });
            res = await this.request.delete('likes',{
                "user_id":test_data[i].email
            });
            res = await this.request.delete('chatrooms',{
                "user_id":test_data[i].email
            });
            res = await this.request.delete('messages',{
                "user_id":test_data[i].email
            });
            i++;
        }
        i = 0;
        while (i < test_data.length){
            res = await this.request.create('users',{
                "user_id":test_data[i].email,
                "name":test_data[i].name,
                "surname":test_data[i].last,
                "email":test_data[i].email,
                "verified":1,
                "token": Date.now(),
                "password":test_data[i].password,
                "age":test_data[i].age,
                "gender":test_data[i].gender,
                "sexual_pref":test_data[i].sexual_pref,
                "bio": test_data[i].bio,
                "country":test_data[i].location[0],
                "province":test_data[i].location[1],
                "city":test_data[i].location[2],
                "postal_code":test_data[i].location[3],
                "x":test_data[i].location[4],
                "y":test_data[i].location[5]
            });
            res = await this.request.create('tags',{
                "user_id":test_data[i].email,
                "tag1":test_data[i].tag[0],
                "tag2":test_data[i].tag[1],
                "tag3":test_data[i].tag[2],
                "tag4":test_data[i].tag[3],
                "tag5":test_data[i].tag[4]
            });
            res = await this.request.create('images',{
                "user_id":test_data[i].email,
                "img1":test_data[i].img["img1"],
                "img2":test_data[i].img["img2"],
                "img3":test_data[i].img["img3"],
                "img4":test_data[i].img["img4"],
                "img5":test_data[i].img["img5"]
            });
            res = await this.request.create('likes',{
                "user_id":test_data[i].email,
                "target":"",
                "likedby":""
            });
            i++;
        }
        i = 0;
        while (i < test_data.length){
            res = await this.request.read('users',{
                "user_id":test_data[i].email
            });
            console.log(res);
            res = await this.request.read('tags',{
                "user_id":test_data[i].email
            });
            console.log(res);
            res = await this.request.read('images',{
                "user_id":test_data[i].email
            });
            console.log(res);
            // res = await this.request.read('locations',{
            //     "user_id":test_data[i].email
            // });
            // console.log(res);
            res = await this.request.read('likes',{
                "user_id":test_data[i].email
            });
            console.log(res);
            i++;
        }
        
    }
}

module.exports = { controllers };