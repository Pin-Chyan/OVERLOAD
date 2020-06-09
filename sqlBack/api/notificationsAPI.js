const test_data = require('./default_data.json');

class notificationsAPI{

    constructor(senpai){
        this.senpai = senpai;
        this.request = new request.requestHandler(senpai);
    }
        
    query(req, res){
        res.json(this.test());
    }

    test(){
        return ('notificationsAPI online');
    }
    
}

module.exports = { notificationsAPI };