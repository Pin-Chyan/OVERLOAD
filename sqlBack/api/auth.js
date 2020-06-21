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
            this[body.controller](body).then(result => { 
                if (result.status == 200)
                    res.json(result.data);
                else
                    res.sendStatus(result.status);
            });
        else
            res.json('error unknown controller');
    }

    test(){
        return ('authAPI online');
    }
    async login(requestBody){
        var user = await this.request.read('users',{
            "user_id": requestBody.user
        });
        var new_token = Date.now();
        if (user.status == 'error')
            return ({
                "status":500,
                "data":"server error"
            });
        if (user.data.length == 0)
            return ({
                "status":404,
                "msg":"unknown user"
            });
        if (requestBody.args.password == user.data[0].password){
            var assign_token = await this.request.update('users',{
                "token":new_token
            },{
                "user_id":requestBody.user
            });
            if (assign_token.status == 'error')
                return ({
                    "status":500,
                    "data":"server error"
                });
            return ({
                "status":200,
                "data":{
                    "token":new_token
                }
            })
        }
    }
}

module.exports = { controllers };