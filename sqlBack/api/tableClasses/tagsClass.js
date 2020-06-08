class tags{

    constructor(senpai){
        this.senpai = senpai;
    }

    // insert_tag(senpai, userid, num, name){
    //     var pos = "tag" + num;
    //     console.log(pos);
    //     var sql = "INSERT INTO tags (?) VALUES (?))"
    //     console.log(userid)
    //     console.log(name);
    //     senpai.query(sql,[pos, name], function(err,result){
    //         if (err) throw err;
    //         console.log("result.insertID")
    //     });
    // }

    test(){
        return ('tags online');
    }
}

module.exports = { tags };