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
	if (!email || !email.match(emailformat)) {
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
	if (!name || !name.match(characterformat)) {
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
	if (!surname || !surname.match(characterformat)) {
		$("#surname").css("border", "2px solid red");
		return false;
	}else{
		$("#surname").css("border", "1px solid green");
	}
	return true;
}


// Testing purposes for the tags
function tags() {
	var tags = $("input").tagsinput('items')
	document.getElementById("test").placeholder = tags[8];
	setTimeout('', 2000);
	location.reload();
}