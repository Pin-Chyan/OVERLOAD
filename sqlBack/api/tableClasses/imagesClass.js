class images{

    constructor(senpai){
        this.senpai = senpai;
    }

    test(){
        return ('images online');
    }

    insert(user_id){
        this.senpai.query();
        var query = "INSERT INTO images(user_id, img1, img2, img3, img4, img5) values(" + user_id + ",null,null,null,null,null)";
        return this.request(query).then((res) => {});
    }

    request(query){
        return new Promise((resolve) => {
            this.senpai.query(query, (err, res) => {
                if (err) resolve(['Error','Error :' + err['sqlMessage']]);
                else resolve(['Success', ' Query : "' + query + '" ']);
            })
        })
    }
}

module.exports = { images };