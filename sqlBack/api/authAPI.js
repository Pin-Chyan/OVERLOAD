const request = require('./request');
const test_data = require('./default_data.json');

class authAPI{

    constructor(senpai){
        this.senpai = senpai;
        this.request = new request.requestHandler(senpai);
    }

    query(req, res){
        res.json(this.test());
    }
    test(){
        return ('authAPI online');
    }

}

module.exports = { authAPI };