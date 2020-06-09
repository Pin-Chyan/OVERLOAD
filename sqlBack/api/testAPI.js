const request = require('./request');

class testAPI{

    constructor(senpai){
        this.senpai = senpai;
        this.request = new request.requestHandler(senpai);
    }
    // token will be in header
    // body = {
    //     "controller":"async",
    //     "action":"update",
    //     "user": "userx",
    //     "args":{
    //         "testvar1":"value",
    //         "testvar2":"value",
    //     }
    // }
    //
    query(req, res){
        var body = req.body;
        if (body.controller == 'test'){
            this.asynctest().then((result) => {
                res.json(result);
            })
        }
    }

    async asynctest(){
        var result = await this.request.delete(
            'test',{
                "user_id":"userx"
            }
        );
        console.log(result);
        var result = await this.request.create(
            'test',{
                "user_id":"userx",
                "num":43,
                "str":"notyourherem"
            },
        );
        console.log(result);
        result = await this.request.update(
            "test",{
                "num":69,
                "str":"420"
            },{
                "user_id":"userx"
            }
        );
        console.log(result);
        result = await this.request.read(
            'test',{
                "user_id":"userx"
            }
        );
        console.log(result);

        return (result);
    }
    
}

module.exports = { testAPI };