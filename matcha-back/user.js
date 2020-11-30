class userHandler{

    constructor(senpai){
        this.senpai = senpai;
    }

    async init(email){
        var res = await this.get_id(email);
        if (res == -2)
            return "dbError";
        else if (res == -1)
            return "unknown";
        else {
            this.id = res;
            return "success"
        }
    }

    async create(email){ // return 0 if error
        var query = "INSERT INTO users (email) VALUES('" + email + "')";
        var res = await this.request(query);
        if (res.status == 'error')
            return res.data;
        res = await this.init(email);
        return res;
    }

    async get_id(email){
        var query = "SELECT * from users WHERE email='" + email + "'";
        var res = await this.request(query);
        if (res.status != 200)
            return(-2);
        if (res.data.length == 0)
            return(-1);
        return res.data[0].id;
    }
    
    insert(table, column, data){
        var query = "UPDATE " + table + " SET " + column + "='" + data + "' WHERE id = '" + this.id + "'";
        return this.request(query);
    }

    get(table){
        var query = "SELECT * from " + table + " WHERE id='" + this.id + "'";
        return this.request(query);
    }

    request(query){
        return new Promise((resolve) => {
            this.senpai.query(query, (err, res) => {
                if (err) resolve({
                    "status":"error",
                    "data": err['sqlMessage']
                })
                resolve({
                    "status":200,
                    "data": res
                });
            })
        })
    }
}

module.exports = { userHandler };