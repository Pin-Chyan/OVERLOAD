function loginForm(){
	if (validateForm()){
		url_redirect({
			url: "/ssn/login",
			method: "get",
			data: {
				"email": $("#email").val(),
				"password": $("#password").val()
			}
		});
	}
}

function validateForm() {
	if(valEmail() && valPassword()) {
		return true;
	} else {
		return false;
	}
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

function url_redirect(options) {
	var $form = $("<form />");

	$form.attr("action", options.url);
	$form.attr("method", options.method);

	for (var data in options.data)
		$form.append('<input type="hidden" name="' + data + '" value="' + options.data[data] + '" />');

	$("body").append($form);
	$form.submit();
}