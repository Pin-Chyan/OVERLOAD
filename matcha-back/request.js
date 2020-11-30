class requestHandler{

    constructor(senpai){
        this.senpai = senpai;
    }

    newrow(table, user_id){
        var query = "INSERT INTO " + table + " (user_id) VALUES('" + user_id + "')";
        return this.request(query);
    }
    insert(table, user_id, column, data){
        var query = "UPDATE " + table + " SET " + column + "='" + data + "' WHERE user_id = '" + user_id + "'";
        return this.request(query);
    }
    get(table, user_id){
        var query = "SELECT * from " + table + " WHERE user_id='" + user_id + "'";
        return this.request(query);
    }

    create(table, columnData){
        var query = "INSERT INTO ";
        var col = table + "(";
        var values = " VALUES(";
        var colKeys = Object.keys(columnData);
        colKeys.forEach((element,i) => {
            col += element;
            values += "'" + columnData[element] + "'";
            if (i != colKeys.length - 1){
                col += ',';
                values += ',';
            }
        });
        col += ')';
        values += ')';
        return this.request(query + col + values);
    }
    read(table, locationData){
        var query = "SELECT * from " + table;
        var locationKeys = Object.keys(locationData);
        if (locationKeys.length != 0)
            query += " WHERE ";
        locationKeys.forEach((element,i) => {
            query += element + "=" + "'" + locationData[element] + "'";
            if (i != locationKeys.length - 1)
                query += ' AND ';
        });
        return this.request(query);
    }
    update(table, columnData, locationData){
        var query = "UPDATE " + table + " SET ";
        var colKeys = Object.keys(columnData);
        colKeys.forEach((element,i) => {
            query += element + "=" + "'" + columnData[element] + "'";
            if (i != colKeys.length - 1)
                query += ',';
        });
        var location = " WHERE user_id='" + locationData.user_id + "'";
        return this.request(query + location);
    }
    delete(table, locationData){
        var query = "DELETE FROM " + table + " WHERE user_id = '" + locationData.user_id + "'";
        return this.request(query);
    }
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

module.exports = { requestHandler };