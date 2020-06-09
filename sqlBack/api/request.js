class requestHandler{

    constructor(senpai){
        this.senpai = senpai;
    }

    create(table, columnData){
        var query = "INSERT INTO " + table + "(user_id,num,str) values('" + columnData.user_id + "','" + columnData.num + "','" + columnData.str + "')";
        return this.request(query);
    }
    read(table, locationData){
        var query = "SELECT * from " + table + " WHERE user_id = '" + locationData.user_id + "'";
        return this.request(query);
    }
    update(table, columnData, locationData){
        var query = "UPDATE " + table + " SET num = '" + columnData.num + "' WHERE user_id = '" + locationData.user_id + "'";
        return this.request(query);
    }
    delete(table, locationData){
        var query = "DELETE FROM " + table + " WHERE user_id = '" + locationData.user_id + "'";
        return this.request(query);
    }
    request(query){
        return new Promise((resolve) => {
            this.senpai.query(query, (err, res) => {
                if (err) resolve({
                    "Status":"Error",
                    "data": err['sqlMessage']
                })
                resolve({
                    "Status":"Success",
                    "data": res
                });
            })
        })
    }

    test(){
        return ('test online');
    }
}

module.exports = { requestHandler };