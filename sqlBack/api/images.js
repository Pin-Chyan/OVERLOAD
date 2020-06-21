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

    test(){
        return ('pingAPI online');
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
}

module.exports = { controllers };