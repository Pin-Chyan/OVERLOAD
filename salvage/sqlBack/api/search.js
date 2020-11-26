const request = require('./request');
const test_data = require('./default_data.json');
const { maxHeaderSize } = require('http');

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

    async search(requestBody){
        var userData = await this.request.read('users',{});
        var reqUser = await this.request.read('users',{
            "user_id":requestBody.user
        });
        var validated = [];
        userData.data.forEach(user => {
            if (user.user_id != requestBody.user)
                if (this.validate(requestBody, user, reqUser.data[0]))
                    validated.push(user);
        });
        return ({
            status : 200,
            data : this.packaging(validated, reqUser.data[0])
        })
    }

    async match(requestBody){
        var userData = await this.request.read('users',{});
        var reqUser = await this.request.read('users',{
            "user_id":requestBody.user
        });
        reqUser = reqUser.data[0];
        var user = userData.data[0];
        var match_args = {};
        match_args.age = [user.age - 5, user.age + 10];
        if (user.sexual_pref != -2) 
            match_args.gender = user.sexual_pref;
        match_args.range = requestBody.args.range;
        var validated = [];
        userData.data.forEach(match_user => {
            console.log(match_user.name);
            if (match_user.user_id != requestBody.user)
                if (this.validate({args:match_args}, match_user, user))
                    if (match_user.sexual_pref === user.gender || match_user.sexual_pref === -2)
                        validated.push(match_user);
        });
        return ({
            status : 200,
            data : this.packaging(validated, user)
        });
    }

    validate(requestBody, user, reqUser){
        if (requestBody.args.age){
            if (!(
                user.age > requestBody.args.age[0] && 
                user.age < requestBody.args.age[1]
            )) return 0;
        }
        if (requestBody.args.gender === -1 || requestBody.args.gender === 1){
            if (!(
                user.gender == requestBody.args.gender
            )) return 0;
        }
        if (requestBody.args.sexual_pref === -2 || requestBody.args.sexual_pref === -1 || requestBody.args.sexual_pref === 1 ){
            if (!(
                requestBody.args.sexual_pref === user.sexual_pref
            )) return 0;
        }
        if (requestBody.args.contains){
            if (!(
                user.name.toLowerCase().includes(requestBody.args.contains.toLowerCase()) ||
                user.surname.toLowerCase().includes(requestBody.args.contains.toLowerCase())
            )) return 0;
        }
        if (requestBody.args.range){
            var distance = this.hell(user.y, user.x, reqUser.y, reqUser.x);
            console.log(distance);
            if (!(
                distance > requestBody.args.range[0] &&
                distance < requestBody.args.range[1]
            )) return (0);
        }
        return (1);
    }

    hell(lat1,lon1,lat2,lon2) {
        var R = 6371;
        var dLat = (lat2-lat1) * Math.PI / 180;
        var dLon = (lon2-lon1) * Math.PI / 180;
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        if (d>1) return Math.round(d);
        else if (d<=1) return Math.round(d*1000);
        return d;
    }

    packaging(validatedUsers, reqUser){
        var packagedUsers = [];
        var temp = {};
        validatedUsers.forEach(user => {
            temp.user_id = user.user_id;
            temp.name = user.name;
            temp.surname = user.surname;
            temp.age = user.age;
            temp.gender = user.gender;
            temp.sexual_pref = user.sexual_pref;
            temp.distance = this.hell(user.y, user.x, reqUser.y, reqUser.x);
            packagedUsers.push(temp);
            temp = {};
        })
        return packagedUsers;
    }
}

module.exports = { controllers };