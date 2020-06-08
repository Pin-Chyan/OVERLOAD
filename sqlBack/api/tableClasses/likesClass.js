class likes{

    constructor(senpai){
        this.senpai = senpai;
    }

    insert(user_id, arg1, arg2){
        var sql = "INSERT INTO likes (user_id, target, likedby) VALUES ('"+user_id+"', '"+arg1+"','"+arg2+"')";
        return new Promise((resolve) => {
            this.senpai.query(sql, (err, res) => {
                if (err) resolve(['Error','Error :' + err['sqlMessage']]);
                else resolve(['Success','Likes table updated!']);
        });
    })
    }
    
    read(user_id, arg1){
        var sql = "SELECT * FROM likes WHERE user_id = '"+arg1+"'";
        return new Promise((resolve) => {
            this.senpai.query(sql, (err, res) => {
                if (err) resolve(['Error','Error :' + err['sqlMessage']]);
                else resolve(res);
            });
        })
    }

    delete(){

    }

    test(){
        return ('likes online');
    }
}

module.exports = { likes };