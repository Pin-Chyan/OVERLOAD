const request = require('./request');
const test_data = require('./default_data.json');

class usersAPI{

    constructor(senpai){
        this.senpai = senpai;
        this.request = new request.requestHandler(senpai);
    }
        
    query(req, res){
        var body = req.body;
        if (body.controller == 'add_defaults'){
            console.log(body.controller);
            this.add_defaults(body).then((result) => { res.json(result); });
        } else if (body.controller == 'upload_img'){
            console.log(body.controller);
            this.upload_image(body).then((result) => { res.json(result); });
        } else if (body.controller == 'get_img'){
            console.log(body.controller);
            this.get_image(body).then((result) => { res.json(result); });
        } else if (body.controller == 'selected_tags'){
            console.log(body.controller);
            this.selected_tags(body).then((result) => {res.json(result); })
        } else if (body.controller == 'get_tags'){
            console.log(body.controller);
            this.get_tags(body).then((result) => { res.json(result); })
        } else if (body.controller == 'msg'){
            console.log(body.controller);
            this.msg(body).then((result) => { res.json(result); })
        } else if (body.controller == 'db'){
            console.log(body.controller);
            this.db(body).then((result) => { res.json(result); })
        } else if (body.controller == 'get_chats'){
            console.log(body.controller);
            this.get_chats(body).then((result) => { res.json(result); })
        } else if (body.controller == 'get_msg'){
            console.log(body.controller);
            this.get_msg(body).then((result) => { res.json(result); })
        } else {
            res.json('error unknown controller');
        }
    }

    async test(){
        return ('usersAPI online');
    }

    async add_defaults(requestBody){
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

    async upload_image(requestBody){
        var i = 1;
        var images = {};
        while (i < 6){
            if (requestBody.args["img" + i])
                images["img" + i] = requestBody.args["img" + i];
            i++;
        }
        var res = await this.request.update('images',images,{
                "user_id":requestBody.user
            }
        );
        return res;
    }
    async get_image(requestBody){
        return this.request.read('images', {
            "user_id":requestBody.user
        });
    }

    async selected_tags(requestBody){
        var i = 1;
        var tags = {};
        while (i < 6){
            if (requestBody.args["tag" + i])
                tags["tag" + i] = requestBody.args["tag" + i];
            i++;
        }
        var res = await this.request.update('tags', tags,{
            "user_id":requestBody.user
        });
    }

    async get_tags(requestBody){
        return this.request.aread('tags', {
            "user_id":requestBody.user
        });
    }

    async get_chats(requestBody){
        var createdby = await this.request.read('chatrooms',{
            "user_id":requestBody.user
        });
        var addedto = await this.request.read('chatrooms',{
            "target_id":requestBody.user
        });
        var status = 'error'
        if (createdby.status == 'Success' && createdby.status == 'Success')
            status = 'success';
        return ({
            status:status,
            data: {
                createdby : createdby,
                addedto : addedto
            }
        })
    }

    async msg(requestBody){
        var chatroom_id = requestBody.args.chatroom_id;
        var chatroom = await this.get_msg(requestBody);
        console.log(chatroom);
        if (chatroom.data.length == 0){
            chatroom_id = requestBody.user +'_' + requestBody.args.target_id;
            chatroom = await this.request.create('chatrooms',{
                "user_id": requestBody.user,
                "target_id": requestBody.args.target_id,
                "chatroom_id": chatroom_id
            });
        }
        return this.request.create('messages',{
            "chatroom_id" : chatroom_id,
            "from_id": requestBody.user,
            "msg": requestBody.args.msg,
            "viewed" :0,
            "timestamp":Date.now()
        })
    }

    async get_msg(requestBody){
        return this.request.read('messages',{
            "chatroom_id":requestBody.args.chatroom_id
        })
    }

    async db(requestBody){
        return this.request.read(requestBody.args.db, {});
    }
}

module.exports = { usersAPI };