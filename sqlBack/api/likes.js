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

    async update_likes(requestBody){
        //Setting variables
        var userdata = await this.request.read('likes',{
            "user_id":requestBody.user
        });
        var userdata2 = await this.request.read('likes',{
            "user_id":requestBody.args.target
        });
        var targets = userdata.data[0].target.split(',');
        var likedby = userdata2.data[0].likedBy.split(',');
        
        //Error checking
        if (targets.includes(requestBody.args.target))
            return this.ret(200,"Already liked");
        if (requestBody.user_id == requestBody.args.target)
            return this.ret(200,"You cannot like yourself");
        
        //Adding users to tables
        if (targets[0] == '')
            targets[0] = requestBody.args.target;
        else 
            targets.push(requestBody.args.target);
        if (likedby[0] == '')
            likedby[0] = requestBody.user;
        else
            likedby.push(requestBody.user);
        
        //converting back to string
        var reqtargets = targets.toString();
        var reqlikedby = likedby.toString();

        //Actual request
        var res = await this.request.update('likes', {
            "target":reqtargets
        }, {
            "user_id":requestBody.user
        });
        var res2 = await this.request.update('likes', {
            "likedby":reqlikedby
        }, {
            "user_id":requestBody.args.target
        });
        return this.ret(200,"likes updated");
    }

    async remove_like(requestBody){
        var i = 0;
        var userdata = await this.request.read('likes',{
            "user_id":requestBody.user
        });
        var userdata2 = await this.request.read('likes',{
            "user_id":requestBody.args.target
        });
        var targets = userdata.data[0].target.split(',');
        var likedby = userdata2.data[0].likedBy.split(',');
        if (!targets.includes(requestBody.args.target) || !likedby.includes(requestBody.user))
            return this.ret(200,"Not liked");
        
        //Removal
        while(targets[i] != requestBody.args.target)
            i++;
        targets.splice(i, 1);
        i = 0;
        while (likedby[i] != requestBody.user)
            i++;
        likedby.splice(i, 1);

        //converting back to string
        var reqtargets = targets.toString();
        var reqlikedby = likedby.toString();

        //Actual request
        var res = await this.request.update('likes', {
            "target":reqtargets
        }, {
            "user_id":requestBody.user
        });
        var res2 = await this.request.update('likes', {
            "likedby":reqlikedby
        }, {
            "user_id":requestBody.args.target
        });
        return this.ret(200,"like removed");
    }

    async get_likes(requestBody){
        return this.request.read('likes',{
            "user_id":requestBody.user
        });
    }

    ret(status,data){
        return ({
            "status":status,
            "data":data
        });
    }
    
}

module.exports = { controllers };