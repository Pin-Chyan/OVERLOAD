class images{

    constructor(senpai){
        this.senpai = senpai;
    }

    test(){
        return ('images online');
    }

    create(user_id){
        this.senpai.query();
        var query = "INSERT INTO images(user_id, img1, img2, img3, img4, img5) values('" + user_id + "','null','null','null','null','null')";
        return this.request(query);
    }

    request(query){
        return new Promise((resolve) => {
            console.log(query);
            this.senpai.query(query, (err, res) => {
                console.log(err);
                resolve(res);
                // if (err) resolve(['Error','Error :' + err['sqlMessage']]);
                // else resolve(['Success', ' Query : "' + query + '" ']);
            })
        })
    }

    // create(user_id);
    // create 
    // update 
    // delete 
}

module.exports = { images };