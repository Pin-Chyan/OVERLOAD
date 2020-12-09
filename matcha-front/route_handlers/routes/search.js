const router = require('express').Router();
const db = require('../database/db');

// for db connection
const connection = new db.dbConn();

router.route('/').get( (req, res) => {
    if (!req.body.id){
        return end(res,401,"an id was not specified");
    }

    var getDataReqQuery = "Select id, name, surname, gender, age, sexual_pref, tag, location from users Where id!='" + req.body.id + "'";
    var getMyDataReqQuery = "Select id, name, surname, gender, age, sexual_pref, tag, location from users Where id='" + req.body.id + "'";

    var dataReqArr = [];

    dataReqArr.push( connection.request( getDataReqQuery ));
    dataReqArr.push( connection.request( getMyDataReqQuery ));

    Promise.all(dataReqArr).then((result) => {
        if (result[0].status == 'error' || result[1].status == 'error'){
            end(res, 500, "error");
        }
        var filterResult = filter(req.body.filterParams, result[0].data, result[1].data[0]);
        console.log(filterResult);
        res.json(filterResult);
    })
})

function filter(filterParams, searchData, userData){
    if (filterParams.age){
        searchData = filterAge(searchData, filterParams.age.min, filterParams.age.max);
    }
    if (filterParams.nameString){
        searchData = filterNameString(searchData, filterParams.nameString);
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

        if (name.includes(nameString) || surname.includes(nameString)){
            newSearchData.push(searchData[i]);
        }
        i++;
    }
    return newSearchData;
}

function end(res, status, msg){
    res.status(status);
    res.json(msg);
    return;
}

module.exports = router;