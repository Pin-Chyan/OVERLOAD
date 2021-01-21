console.log(document.URL)

function resetForm() {
    if (valEmail()) {
        url_redirect({
            url: "/forgot",
			method: "post",
			data: {
				"email": $("#email").val()
		 	}
        })
    }
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function resetPasswordForm() {
    if (valPassword() && valcPassword()) {
        url_redirect({
            url: "/reset?token=" + getUrlParameter("token"),
            method: "post",
            data: {
                "password": $("#password").val()
             }
        })
    }
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

function url_redirect(options) {
	var $form = $("<form />");

	$form.attr("action", options.url);
	$form.attr("method", options.method);

	for (var data in options.data)
		$form.append('<input type="hidden" name="' + data + '" value="' + options.data[data] + '" />');

	$("body").append($form);
	$form.submit();
}