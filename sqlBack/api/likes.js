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
            return ("Already liked");
        if (requestBody.user_id == requestBody.args.target)
            return ("You cannot like yourself");
        
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
        return ("likes updated");
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
            return ("Not liked");
        
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
        return ("like removed");
    }

    async get_likes(requestBody){
        return this.request.read('likes',{
            "user_id":requestBody.user
        });
    }
    
}

module.exports = { controllers };