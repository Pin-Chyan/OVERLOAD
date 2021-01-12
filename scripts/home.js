var i = 0;
var id_2 = '';

getData();
async function getData() {
    // id of relative user found for match
    const response = await fetch('api/usr/me?id=' + id);
    const data = await response.json();
    const getuser = await fetch('api/search/match?id=' + id);
    const userdata = await getuser.json();
    console.log(id);
    id_2 = userdata[i].id;
    console.log(id_2);
    // get fame via post
	const fresponse = await fetch('api/likes/getfame', {
        method : 'POST',
        mode : 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            // id of the userfound in homepage
			'id': id_2,
        })
    })
    const fdata = await fresponse.json();


    document.getElementById("name").innerHTML= userdata[i].name + ", " + userdata[i].age;
    document.getElementById("info").innerHTML= userdata[i].location;

    // gender
    if (userdata[i].gender = 1) {
        document.getElementById("gender").innerHTML= "Female";
    }
    if (userdata[i].gender = -1) {
        document.getElementById("gender").innerHTML= "Male";
    };

    // tags
    var tags = [userdata[i].tag];
	document.getElementById("tags").innerHTML = "";
	for (item of tags) {
		const span = document.createElement('span');
		
		span.textContent = item;
		
		document.getElementById("tags").append(span);
		// document.body.append(span);
    }
    
    document.getElementById("bio").innerHTML = userdata[i].bio;
    document.getElementById("fame").innerHTML = "Fame: " + fdata;
    console.log(userdata[i]);
    console.log(userdata);
    // console.log(data);
    // console.log(fdata);
}

function like() {
	const response = fetch('api/likes/like', {
        method : 'POST',
        mode : 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            // id of the userfound in homepage
            'id': id,
			'target': id_2,
        })
    })
    getData();
}

function block() {
	const response = fetch('api/likes/block', {
        method : 'POST',
        mode : 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            // id of current user
            'id': id,
            //  target if of block user
            'target': id_2,
        })
    })
}

function next() {
    i++;
    getData();
}