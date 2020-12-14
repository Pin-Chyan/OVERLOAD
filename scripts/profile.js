
function updateInfo() {
	var name = $("#name").val();
	if (!name) {
		name = document.getElementById("name").placeholder;
	}
	var surname = $("#surname").val();
	if (!surname) {
		surname = document.getElementById("surname").placeholder;
	}
	// password checkup
	var password = $("#password").val();
	var cpassword = $("#pwconfirm").val();
	// console.log(password + " = " + cpassword);
	var res = password.localeCompare(cpassword);
	if (res == 0) {
		var password = $("#password").val();
	} else {
		var password = "";
	}
	var gender = $("#gender").val();
	var age = $("#age").val();
	if (!age) {
		age = document.getElementById("age").placeholder;
	}
	var email = $("#email").val();
	if (!email) {
		email = document.getElementById("email").placeholder;
	}
	var sp = $("#sp").val();
	// needs fix
	var tag = $("#interests").tagsinput('items');
	// console.log(get);
	if (!tag || tag == "") {
		tag = document.getElementById("interestList").textContent;
	}
	var location = $("#address").val();
	if (!location) {
		location = document.getElementById("address").placeholder;
	}
	var bio = $("#bio").val();
	if (!bio) {
		bio = document.getElementById("bio").placeholder;
	}
	var img = $("#img-1").val();
	console.log("name: " + name + "\n" + "surname: " + surname + "\n" + "password: " + password + "\n" + "gender: " + gender + "\n" + 
	"age: " + age + "\n" + "email: " + email + "\n" + "sp: " + sp + "\n" + "tag: " + tag  + "\n" + "location: " + location + "\n" + 
	"bio: " + bio + "\n" + "img: " + img + "\n");
	$("#pageloader").fadeIn(0);
	// const response = fetch('api/usr/updatedata', {
    //     method : 'POST',
    //     mode : 'cors',
    //     headers: {
    //         'Content-Type': 'application/json'
    //     },
    //     body : JSON.stringify({
	// 		'id':2,
	// 		'name': name,
	// 		'surname': surname,
			
    //     })
    // })
	setTimeout(continueExecution, 1000)
}

function continueExecution()
{
	window.location.reload(true);
   //finish doing things after the pause
}

// using for profile getting and posting

getData();
async function getData() {
    const response = await fetch('api/usr/me?id=' + id);
	const data = await response.json();
	// document.getElementsByName("email")[0].placeholder="your message";
	document.getElementById("name_head").textContent = data.name;
	document.getElementById("age_head").textContent = data.age;
	document.getElementById("name").placeholder = data.name;
	document.getElementById("email").placeholder = data.email;
	document.getElementById("surname").placeholder = data.surname;
	document.getElementById("age").placeholder = data.age;
	document.getElementById("address").placeholder = data.location;
	document.getElementById("gender").value = data.gender;
	document.getElementById("sp").value = data.sexual_pref;
	document.getElementById("bio").placeholder = data.bio;
	var tags = [data.tag];
	for (item of tags) {
		document.getElementById("interestList").append(item);
		// document.body.append(span);
	}
	console.log(data);
	
}

// postInfo();
// async function postInfo() {
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
// 	console.log(data);
// }



// Testing purposes for the tags
// function tags() {
// 	var tags = $("input").tagsinput('items');
// 	document.getElementById("test").placeholder = tags[8];
// 	setTimeout('', 2000);
// 	location.reload();
// }
