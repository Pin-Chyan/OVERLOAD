const router = require('express').Router();
const { log } = require('console');
const db = require('../database/db');

// for db connection
const connection = new db.dbConn();


router.route('/').get( (req, res) => {
    // ?id=1&agemin=1&agemax=1&namestring=one&distancemax=1

    if (!req.query.id){
        return end(res,401,"an id was not specified");
    }

    var getDataReqQuery = "Select id, name, surname, gender, age, sexual_pref, tag, bio, location from users Where id!='" + req.query.id + "'";
    var getMyDataReqQuery = "Select id, name, surname, gender, age, sexual_pref, tag, bio, location from users Where id='" + req.query.id + "'";

    var dataReqArr = [];

    dataReqArr.push( connection.request( getDataReqQuery ));
    dataReqArr.push( connection.request( getMyDataReqQuery ));

    Promise.all(dataReqArr).then((result) => {
        if (result[0].status == 'error' || result[1].status == 'error'){
            end(res, 500, "error");
        }
        addExtraData(result[0].data, result[1].data[0]).then(() => {
            var filterResult = filter(req.query, result[0].data, result[1].data[0]);
            res.json(filterResult);
        });
    })
})

router.route('/match').get( (req, res) => {
    // ?id=1&agemin=1&agemax=1&nameString=one&distancemax=1

    if (!req.query.id){
        return end(res,401,"an id was not specified");
    }

    var getDataReqQuery = "Select id, name, surname, gender, age, sexual_pref, tag, bio, location from users Where id!='" + req.query.id + "'";
    var getMyDataReqQuery = "Select id, name, surname, gender, age, sexual_pref, tag, bio, location from users Where id='" + req.query.id + "'";

    var dataReqArr = [];

    dataReqArr.push( connection.request( getDataReqQuery ));
    dataReqArr.push( connection.request( getMyDataReqQuery ));

    Promise.all(dataReqArr).then((result) => {
        if (result[0].status == 'error' || result[1].status == 'error'){
            end(res, 500, "error");
        }
        addExtraData(result[0].data, result[1].data[0]).then(() => {
            var userData = result[1].data[0];
            req.query.distance = 50;
            if (userData.sexual_pref != 0)
                req.query.gender = userData.sexual_pref;
            var filterResult = filter(req.query, result[0].data, result[1].data[0]);
            res.json(filterResult);
        });
    })
})

function filter(query, searchData, userData){
    if (query.ageRange){
        searchData = filterAge(searchData, userData.age , query.ageRange);
    }
    if (query.nameString){
        searchData = filterNameString(searchData, query.nameString);
    }
    if (query.distance){
        console.log(query.distance);
        searchData = filterDistance(searchData, userData, query.distance);
    }
    if (query.minFame){
        searchData = filterFame(searchData, query.minFame);
    }
    if (query.gender){
        console.log(query.gender);
        searchData = filterGender(searchData, query.gender);
    }
    return searchData;
}

function filterAge(searchData, userAge, ageRange){
    var newSearchData = [];
    
    var i = 0;
    while (i < searchData.length){
        if (ageRange == 0){
            if (searchData[i].age == userAge)
            newSearchData.push(searchData[i]);
        } else if (searchData[i].age >= (userAge - ageRange) && searchData[i].age <= (userAge + ageRange)){
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
    var lat1 = mydata.location.split(',')[4];
    var lon1 = mydata.location.split(',')[5];
    var lat2;
    var lon2;
    var newSearchData = [];
    var i = 0;
    while (i < searchData.length){
        lat2 = searchData[i].location.split(',')[4];
        lon2 = searchData[i].location.split(',')[5];
        if (calculateDistance(lat1,lon1,lat2,lon2) <= distancemax){
            newSearchData.push(searchData[i]);
        }
        i++;
    }
    return newSearchData;
}

function filterFame(searchData, minFame){
    var i = 0;
    var newSearchData = [];
    while (i < searchData.length){
        console.log(searchData.fame);
        if (searchData.fame >= minFame){
            newSearchData.push(searchData[i]);
        }
        i++;
    }
    return newSearchData;
}

function filterGender(searchData, gender){
    var i = 0;
    var newSearchData = [];
    while (i < searchData.length){
        
        if (searchData[i].gender == gender){
            newSearchData.push(searchData[i]);
        }
        i++;
    }
    return newSearchData;
}

async function addExtraData(searchData, myData){
    var fame;
    var distance;
    var lat1 = myData.location.split(',')[4];
    var lon1 = myData.location.split(',')[5];

    var i = 0;
    while (i < searchData.length){
        fame = await getFame(searchData[i]);
        distance = calculateDistance(lat1,lon1,searchData[i].location.split(',')[4],searchData[i].location.split(',')[5]);
        searchData.fame = fame;
        searchData.distance = distance;
        i++;
    }
    return searchData;
}

function calculateDistance(lat1,lon1,lat2,lon2) {
	var R = 6371;
	var dLat = (lat2-lat1) * Math.PI / 180;
	var dLon = (lon2-lon1) * Math.PI / 180;
	var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(lat1 * Math.PI / 180 ) * Math.cos(lat2 * Math.PI / 180 ) *
		Math.sin(dLon/2) * Math.sin(dLon/2);
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	var d = R * c;
    if (d>1)
        return Math.round(d);
    else if (d<=1)
        return Math.round(d*1000);
	return d;
}


async function getFame(id){
    var query = "SELECT * from likes WHERE liked= '"+ id+"'";
    var request = await connection.request(query);

    return count = request.data.length;
}

function end(res, status, msg){
    res.status(status);
    res.json(msg);
    return;
}

module.exports = router;