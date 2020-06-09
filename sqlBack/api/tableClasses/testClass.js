class test{

    constructor(senpai){
        this.senpai = senpai;
    }

    create(table, columnData){
        var query = "INSERT INTO test(user_id,num,str) values('" + user + "','" + integer + "','" + string + "')";
        return this.request(query);
    }
    update(user, integer, string){
        var query = "UPDATE";
    }
    delete(user){
        var query = "DELETE FROM test WHERE user_id = '" + user + "'";
        return this.request(query);
    }
    request(query){
        return new Promise((resolve) => {
            this.senpai.query(query, (err, res) => {
                if (err) resolve({
                    "Status":"Error",
                    "data":""
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

module.exports = { test };