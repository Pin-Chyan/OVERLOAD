function verifyPass(){
	$("#pwconfirm").attr("style", "border: 1px solid #ced4da;");
	var pass = $("#password").val();
	var cPass = $("#pwconfirm").val();
	var i = 0;
	var confirmed = 0;
	if (pass.length == cPass.length){
		while (cPass[i] && pass[i]){
			if (cPass.substr(0,i) != pass.substr(0,i)){
		  		$("#pwconfirm").attr("style", "border: 1px solid red;");
		 		confirmed++;
		  		return false;
			}
			i++;
		}
	} else {
	  	$("#pwconfirm").attr("style", "border: 1px solid red;");
	  	return false;
	}
		$("#pwconfirm").attr("style", "border: 1px solid green;");
		return true;
}


function verifyAge(){
	$("#age").attr("style", "border: 1px solid #ced4da;");
	var age = $("#age").val();
	if (age >= 18) {
		$("#age").attr("style", "border: 1px solid green;");
		return true;
	} else {
		$("#age").attr("style", "border: 1px solid red;");
		return false;
	}
}

function verifyEmail(){
	var emailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	var email = $("#email").val();
	console.log(email);
	if (!email.match(emailformat)) {
		$("#email").css("border", "2px solid red");
		return false;
	}else{
		$("#email").css("border", "1px solid green");
	}
	return true;
}

function validName(){
	var characterformat = /[a-zA-Z]+/;
	var name = $("#name").val();
	if (!name.match(characterformat)) {
		$("#name").css("border", "2px solid red");
		return false;
	}else{
		$("#name").css("border", "1px solid green");
	}
	return true;
}

function validSurname(){
	var characterformat = /[a-zA-Z]+/;
	var surname = $("#surname").val();
	if (!surname.match(characterformat)) {
		$("#surname").css("border", "2px solid red");
		return false;
	}else{
		$("#surname").css("border", "1px solid green");
	}
	return true;
}

function updateInfo() {
	// if (validateForm()){
		var name = $("#name").val();
		if (!name) {
			name = document.getElementById("name").placeholder;
		}
		var surname = $("#surname").val();
		if (!surname) {
			surname = document.getElementById("surname").placeholder;
		}
		var password = $("#password").val();
		var gender = $("#gender").val();
		var age = $("#age").val();
		if (!age) {
			age = document.getElementById("age").placeholder;
		}
		var email = $("#email").val();
		var sp = $("#sp").val();
		// needs fix
		// var get = $("input").tagsinput('items');
		// console.log(get);
		// var tag = get[8];
		// if (!tag || tag == "") {
		// 	tag = document.getElementById("interestList").textContent;
		// }
		var location = $("#address").val();
		if (!location) {
			location = document.getElementById("address").placeholder;
		}
		var bio = $("#bio").val();
		if (!bio) {
			bio = document.getElementById("bio").placeholder;
		}
		var img = $("#img-1").val();
	// }
	console.log("name: " + name + "\n" + "surname: " + surname + "\n" + "password: " + password + "\n" + "gender: " + gender + "\n" + 
	"age: " + age + "\n" + "email: " + email + "\n" + "sp: " + sp + "\n" + "\n" + "location: " + location + "\n" + 
	"bio: " + bio + "\n" + "img: " + img + "\n")
	// + "tag: " + tag 
}

function validateForm() {
	if (validName() && validSurname() && verifyEmail() && verifyAge() && verifyPass()){
		return true;
	} else {
		return false;
	}
}

// using for profile getting and posting

getData();
async function getData() {
    const response = await fetch('api/usr/me?id=1');
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
		document.getElementById("interestList").value = "";
		document.getElementById("interestList").append(item);
		// document.body.append(span);
	}
    console.log(data);
}

testpost();
async function testpost() {
    const response = await fetch('api/usr/img', {
        method : 'POST',
        mode : 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify({
            'id':2,
            'img1': 'https://pbs.twimg.com/profile_images/1087124894075236352/O9cDVYG__400x400.jpg'
        })
    })
    const data = await response.json();
    console.log(data);
}



// Testing purposes for the tags
function tags() {
	var tags = $("input").tagsinput('items');
	document.getElementById("test").placeholder = tags[8];
	setTimeout('', 2000);
	location.reload();
}