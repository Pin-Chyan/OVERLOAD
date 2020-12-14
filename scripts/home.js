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
	for (item of tags) {
		const span = document.createElement('span');
		
		span.textContent = item;
		
		document.getElementById("tags").append(span);
		// document.body.append(span);
    }
    
    document.getElementById("bio").innerHTML= data.bio;
    console.log(data);
}

// testpost();
// async function testpost() {
//     const response = await fetch('api/usr/img', {
//         method : 'POST',
//         mode : 'cors',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body : JSON.stringify({
//             'id':2,
//             'img1': 'https://pbs.twimg.com/profile_images/1087124894075236352/O9cDVYG__400x400.jpg'
//         })
//     })
//     const data = await response.json();
//     console.log(data);
// }