let notifications = []

var socket = io()
socket.on('notification', function(data) {
	notifications.push(data)
	console.log(notifications)
})


getNotifications();
async function getNotifications() {
	// get user id
	const response = await fetch('api/notifications/?id=3');
	notifications = await response.json();

	console.log(notifications)
}

function readNotifications() {
}

function updateNotifications(message) {
	notifications.push(message);
	// refresh element
}

function updateBtn() {
}

document.getElementById('toast-test').addEventListener('click', function () {
	$(".toast").css({"top":"3.5rem","z-index": "101"});
	$('.toast').toast('show');
});
