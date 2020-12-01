class handler{

    constructor(senpai){
        this.senpai = senpai;
    }

    // new user
    async newuser(email){
        var query = "INSERT INTO users (email) VALUES('" + email + "')";
        var res = await this.request(query);
        if (res.status == 200){
            return 'sucess';
        } else {
            return 'error';
        }
    }

    async getUserID(email){
        var query = "SELECT id from users WHERE email='" + email + "'";
        var res = await this.request(query);
        if (res.status == 200){
            console.log(res.data);
            return 1;
        } else {
            return -1;
        }
    }

    // insert (new row)
    newrow(table, id){
        var query = "INSERT INTO " + table + " (user_id) VALUES('" + id + "')";
        return this.request(query);
    }
    // get
    get(table, id){
        var query = "SELECT * from " + table + " WHERE id='" + id + "'";
        return this.request(query);
    }
    // update
    update(table, column, data, id){
        var query = "UPDATE " + table + " SET " + column + "='" + data + "' + " + " WHERE id='" + id + "'";
        return this.request(query);
    }
    // for search engine
    searchData(table){
        var query = "SELECT * from " + table;
        return this.request(query);
    }
    //
    request(query){
        console.log(query);
        return new Promise((resolve) => {
            this.senpai.query(query, (err, res) => {
                if (err) resolve({
                    "status":"Error",
                    "data": err['sqlMessage']
                })
                resolve({
                    "status":200,
                    "data": res
                });
            })
        })
    }

    test(){
        return ('test online');
    }
}

module.exports = { handler };