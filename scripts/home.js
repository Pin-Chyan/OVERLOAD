getData();
async function getData() {
    const response = await fetch('api/usr/me?id=' + id);
    const data = await response.json();
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
    
    document.getElementById("bio").innerHTML= data.bio;
    console.log(data);
}

function like() {

}

function dislike() {

}

function block() {
    
}