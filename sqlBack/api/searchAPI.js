const request = require('./request');
const test_data = require('./default_data.json');

class searchAPI{

    constructor(senpai){
        this.senpai = senpai;
        this.request = new request.requestHandler(senpai);
    }
        
    query(req, res){
        var body = req.body;
        if (body.controller == 'test'){
            this.search(body).then((result) => {
                res.json(result);
            })
        } else {
            res.json('error unknown controller');
        }
    }

    test(){
        return ('searchAPI online');
    }

    async search(requestBody){
        var userData = await this.get_user(requestBody.user);
        console.log(userData.data.user);
    }
    async get_user(user_id){
        console.log(user_id);
        var user = await this.request.read('users', { "user_id":user_id });
        var location = await this.request.read('locations', { "user_id":user_id });
        var likes = await this.request.read('likes', { "user_id":user_id });
        if (user.status == 'Success' && location.status == 'Success' && likes.status == 'Success'){
            return({
                "status":"success",
                "data":{
                    "user":user.data[0],
                    "location":location.data[0],
                    "likes":likes.data[0]
                }
            })
        } else {
            return ({
                "status":"error",
                "data":"null"
            });
        }
        // console.log(user);
        // console.log(location);
        // console.log(likes);
    }
}

module.exports = { searchAPI };