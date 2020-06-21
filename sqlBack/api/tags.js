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
    
}

module.exports = { controllers };