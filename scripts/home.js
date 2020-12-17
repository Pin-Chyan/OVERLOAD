getData();
async function getData() {
    // id of relative user found for match
    const response = await fetch('api/usr/me?id=' + id);
    const data = await response.json();

    // get fame via post
	const fresponse = await fetch('api/likes/getfame', {
        method : 'POST',
        mode : 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            // id of the userfound in homepage
			'id': id,
        })
    })
    const fdata = await fresponse.json();


    document.getElementById("name").innerHTML= data.name + ", " + data.age;
    document.getElementById("info").innerHTML= data.location;

    // gender
    if (data.gender = 1) {
        document.getElementById("gender").innerHTML= "Female";
    }
    if (data.gender = -1) {
        document.getElementById("gender").innerHTML= "Male";
    };

    // tags
    var tags = [data.tag];
	document.getElementById("tags").innerHTML = "";
	for (item of tags) {
		const span = document.createElement('span');
		
		span.textContent = item;
		
		document.getElementById("tags").append(span);
		// document.body.append(span);
    }
    
    document.getElementById("bio").innerHTML = data.bio;
    document.getElementById("fame").innerHTML = "Fame: " + fdata;
    console.log(data);
    console.log(fdata);
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
        })
    })
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
    const response = fetch('api/', {
        method : 'POST',
        mode : 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({

        })
    })
}