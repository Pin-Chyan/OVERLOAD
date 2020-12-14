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

	$("#notification-body").empty();
	var notif = document.getElementById("notification-body");
	i = 0;
	while (i++ < 4) {
		var toast = document.createElement("div");
		toast.className = "toast-body";
		var mes = document.createElement("div");
		mes.id = "toast_message";
		mes.textContent = "hello " + i;
		toast.append(mes);
		notif.append(toast);
	}
});
