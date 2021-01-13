const router = require('express').Router();
const { request } = require('express');
const db = require('../database/db');
const connection = new db.dbConn();

router.route('/push').post((req, res) => {
	console.log(req.body)
	let id = req.body.id;
	let io = req.app.get('io');
	let clients = req.app.get('clients');
	const socketId = clients[id]

	if (socketId != undefined) {
		io.to(socketId).emit('notification', req.body.message)
		res.json('sent');
	} else {
		let queryValues = "('" + id + "', ";
		queryValues += "'" + req.body.message + "');";
		connection.request("INSERT INTO notifications (user_id, msg) VALUES" + queryValues).then((request) => {
			console.log(' ---> test')
			console.log(request)
			if (request.status === 'success') {
				res.json('added to database')
			} else {
				res.json('failed to add notification to db')
			}
		})
	}
})

router.route('/').get((req, res) => {
	let notfications = []

	if (!req.query.id) {
		return res.json('id missing')
	}

	connection.searchData('notifications').then((request) => {
		if (request.status === 'success') {
			request.data.forEach(element => {
				if (element.user_id == req.query.id) {
					notfications.push(element.msg)
				}
			});
		}
		res.json(notfications)
	})
})

router.route('/clear').get((req, res) => {
	let notfications = []

	if (!req.query.id) {
		return res.json('id missing')
	}

	const query = 'DELETE FROM notifications WHERE user_id=' + req.query.id;

	connection.request(query).then((request) => {
		if (request.status === 'success') {
			return res.json('notifications cleared')
		}
		return res.json('could not delete notifications')
	})
})

module.exports = router;