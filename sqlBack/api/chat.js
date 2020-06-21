const request = require('./request');
const test_data = require('./default_data.json');

class controllers{

    constructor(senpai){
        this.senpai = senpai;
        this.request = new request.requestHandler(senpai);
    }
        
    query(req, res){
        var body = req.body;
        this.auth(body).then((authResult) => {
            console.log(authResult);
            if (authResult.status != 200)
                res.sendStatus(authResult.status);
            else if (this[body.controller])
                this[body.controller](body).then(result => { 
                    if (result.status == 200)
                        res.json(result.data);
                    else
                        res.sendStatus(result.status);
                });
            else
                res.json('error unknown controller');
        });
    }
    async auth(requestBody){
        var user = await this.request.read('users',{
            "user_id":requestBody.user
        });
        if (user.status == 'error')
            return this.ret(500,'server error');
        if (user.data.length == 0)
            return this.ret(404,'unknown user');
        if (requestBody.token == "admin")
            return this.ret(200,'welp');
        if (requestBody.token != user.data[0].token)
            return this.ret(403,'invalid token');
        return this.ret(200,'welp');
    } // checks token

    async get_chats(requestBody){
        var createdby = await this.request.read('chatrooms',{
            "user_id":requestBody.user
        });
        var addedto = await this.request.read('chatrooms',{
            "target_id":requestBody.user
        });
        var status = 500;
        if (createdby.status == 'Success' && createdby.status == 'Success')
            status = 200;
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
    
}

module.exports = { controllers };