let notifications = []

var socket = io()
socket.on('notification', function(data) {
	updateNotifications(data)
})


getNotifications();
async function getNotifications() {
	const response = await fetch('api/notifications/?id=' + id);
	notifications = await response.json();
	updateNavCount();
}

async function removeDBNotifications() {
	const response = await fetch('api/notifications/clear/?id=' + id);
}

function updateNotifications(message) {
	notifications.push(message);
	updateNavCount();
}

function updateNavCount() {
	$('#toast-test').empty()

	var notifCount = document.getElementById('toast-test')
	notifCount.textContent = "Notif"

	if (notifications.length > 0) {
		var countSpan = document.createElement("span")
		countSpan.className = "badge";
		countSpan.textContent = "" + notifications.length;
		notifCount.append(countSpan);
	}
}

function createNotification(msg) {
	var toast = document.createElement("div");
	toast.className = "toast-body";
	var mes = document.createElement("div");
	mes.id = "toast_message";
	mes.textContent = msg;
	toast.append(mes);
	return toast
}

document.getElementById('toast-test').addEventListener('click', function () {
	$(".toast").css({"top":"3.5rem","z-index": "101"});
	$('.toast').toast('show');

	$("#notification-body").empty();
	var notif = document.getElementById("notification-body");
	i = 0;

	if (notifications.length > 0) {
		while (i++ < notifications.length) {
			notif.append(createNotification(notifications[i - 1]));
		}
		// read notifications from db
		removeDBNotifications()
		notifications = []
		updateNavCount()
		// updateNavCount()
	} else {
		notif.append(createNotification("No active notifications"));
	}
});
