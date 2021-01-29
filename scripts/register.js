function compForm(){
	if (validateForm()) {
		url_redirect({
			url: "/register",
			method: "post",
			data: {
				"name": $("#name").val(),
				"surname": $("#surname").val(),
				"email": $("#email").val(),
				"password": $("#password").val()
		 	}
		});
	}
}

function validateForm() {
	if(valName() && valSurname() && valEmail() && valPassword() && valcPassword()){
		return true;
	}else{
		return false;
	}
}

function valName(){
	var name = $("#name").val();
	if (!name) {
		$("#name").css("border", "2px solid red");
		return false;
	}else{
		$("#name").css("border", "1px solid green");
	}
	return true;
}

function valSurname(){
	var surname = $("#surname").val();
	if (!surname) {
		$("#surname").css("border", "2px solid red");
		return false;
	}else{
		$("#surname").css("border", "1px solid green");
	}
	return true;
}
function valEmail(){
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

function valPassword(){
	var pwformat = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
	var password = $("#password").val();
	if (!password || !password.match(pwformat)) {
		$("#password").css("border", "2px solid red");
		document.getElementById("hide").style.display = "block";
		return false;
	}else{
		$("#password").css("border", "1px solid green");
		document.getElementById("hide").style.display = "none";
	}
	return true;
}

function valcPassword(){
	var password = $("#password").val();
	var cpassword = $("#cpassword").val();
	if (password != cpassword) {
		$("#cpassword").css("border", "2px solid red");
		return false;
	}else{
		$("#cpassword").css("border", "1px solid green");
	}
	return true;
}

function url_redirect(options) {

	var $form = $("<form />");

	$form.attr("action", options.url);
	$form.attr("method", options.method);
	position = null;

	for (var data in options.data)
		$form.append('<input type="hidden" name="' + data + '" value="' + options.data[data] + '" />');

	// Get geolocation
	if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition((position) => {
			$form.append('<input type="hidden" name=long value="' + position.coords.longitude + '" />');
			$form.append('<input type="hidden" name=lat value="' + position.coords.latitude + '" />');
			$("body").append($form);
			console.log($form)
			$form.submit();
		}, (error) => {
			$form.append('<input type="hidden" name=long value="' + null + '" />');
			$form.append('<input type="hidden" name=lat value="' + null + '" />');
			$("body").append($form);
			console.log($form)
			$form.submit();
		})
    } else {
		$form.append('<input type="hidden" name=long value="' + null + '" />');
		$form.append('<input type="hidden" name=geolocation value="' + null + '" />');
		$("body").append($form);
		console.log($form)
		$form.submit();
    }
}

