const router = require('express').Router();
const { request } = require('express');
const db = require('../database/db');
const connection = new db.dbConn();

router.route('/push').post((req, res) => {
	let id = req.body.id;
	let io = req.app.get('io');
	let clients = req.app.get('clients');
	const socketId = clients[id]

	if (socketId != undefined) {
		io.to(socketId).emit('notification', req.body.message)
		res.json('sent');
	} else {
		connection.newrow('notifications', id).then((request) => {
			if (request.status === 'success') {
				let dbId = request.data.insertId;
				connection.update('notifications', 'msg', req.body.message, dbId).then((request2) => {
					if (request2.status === 'success') {
						res.json('added to database')
					} else {
						res.json('could not get id')
					}
				})
			} else {
				res.json('failed to add to create new row')
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

module.exports = router;