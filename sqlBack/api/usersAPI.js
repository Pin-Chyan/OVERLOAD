const request= require('./request');
const test_data = require('./default_data.json');

class usersAPI{

    constructor(senpai){
        this.senpai = senpai;
        this.request = new request.requestHandler(senpai);
    }
        
    query(req, res){
        var body = req.body;
        if (body.controller == 'add_defaults'){
            this.add_defaults(body).then((result) => { res.json(result); });
        }
        res.json(this.test());
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
            console.log(res);
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
                "bio": test_data[i].bio
            });
            i++;
            console.log(res);
        }
        i = 0;
        while (i < test_data.length){
            res = await this.request.read('users',{
                "user_id":test_data[i].email
            });
            console.log(res);
            i++;
        }
    }
}

module.exports = { usersAPI };