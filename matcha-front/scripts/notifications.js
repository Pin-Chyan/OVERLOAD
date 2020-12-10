document.getElementById('toast-test').addEventListener('click', function () {
	$(".toast").css({"top":"3.5rem","z-index": "101"});
	$('.toast').toast('show');
});

getLogged();
async function getLogged() {
    const response = await fetch('api/usr/me?id=2');
    const data = await response.json();
    document.getElementById("loggedInUser").innerHTML= data.name;
    console.log(data);
}
