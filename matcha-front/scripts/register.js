function compForm(){
	if (validateForm()){
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
	var password = $("#password").val();
	if (!password) {
		$("#password").css("border", "2px solid red");
		return false;
	}else{
		$("#password").css("border", "1px solid green");
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

	for (var data in options.data)
		$form.append('<input type="hidden" name="' + data + '" value="' + options.data[data] + '" />');

    $("body").append($form);
    console.log($form)
	$form.submit();
}