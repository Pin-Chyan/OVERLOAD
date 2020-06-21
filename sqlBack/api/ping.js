const request = require('./request');
const test_data = require('./default_data.json');

class controllers{

    constructor(senpai){
        this.senpai = senpai;
        this.request = new request.requestHandler(senpai);
    }
        
    query(req, res){
        res.json(this.test());
    }

    test(){
        return ('pingAPI online');
    }
    
}

module.exports = { controllers };