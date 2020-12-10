const router = require('express').Router();
const db = require('../database/db');

// for db connection
const connection = new db.dbConn();

router.route('/').get( (req, res) => {
    // ?id=1&agemin=1&agemax=1&namestring=one&distancemax=1
    console.log()
    if (!req.query.id){
        return end(res,401,"an id was not specified");
    }

    var getDataReqQuery = "Select id, name, surname, gender, age, sexual_pref, tag, location from users Where id!='" + req.query.id + "'";
    var getMyDataReqQuery = "Select id, name, surname, gender, age, sexual_pref, tag, location from users Where id='" + req.query.id + "'";

    var dataReqArr = [];

    dataReqArr.push( connection.request( getDataReqQuery ));
    dataReqArr.push( connection.request( getMyDataReqQuery ));

    Promise.all(dataReqArr).then((result) => {
        if (result[0].status == 'error' || result[1].status == 'error'){
            end(res, 500, "error");
        }
        var filterResult = filter(req.query, result[0].data, result[1].data[0]);
        // console.log(filterResult);
        res.json(filterResult);
    })
})

function filter(query, searchData, userData){
    console.log(query);
    if (query.agemin && query.agemax){
        searchData = filterAge(searchData, query.agemin, query.agemax);
    }
    if (query.namestring){
        searchData = filterNameString(searchData, query.namestring);
    }
    return searchData;
}

function filterAge(searchData, ageMin, ageMax){
    var newSearchData = [];
    
    var i = 0;
    while (i < searchData.length){
        if (searchData[i].age >= ageMin && searchData[i].age <= ageMax){
            newSearchData.push(searchData[i]);
        }
        i++;
    }
    return newSearchData;
}

function filterNameString(searchData, nameString){
    var newSearchData = [];
    var name;
    var surname;
    var i = 0;
    while (i < searchData.length){
        name = searchData[i].name.toLowerCase();
        surname = searchData[i].surname.toLowerCase();

        if (name.toLowerCase().includes(nameString.toLowerCase()) || surname.toLowerCase().includes(nameString.toLowerCase())){
            newSearchData.push(searchData[i]);
        }
        i++;
    }
    return newSearchData;
}

function filterDistance(searchData, mydata, distancemax){

}



function end(res, status, msg){
    res.status(status);
    res.json(msg);
    return;
}

module.exports = router;