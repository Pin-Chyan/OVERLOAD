const router = require('express').Router();
const db = require('../database/db');

// for db connection
const connection = new db.dbConn();

router.route('/push').post((req, res) => {
	let io = req.app.get('io');
	let clients = req.app.get('clients');
	const socketId = clients[req.body.id]

	if (socketId != undefined) {
		io.to(socketId).emit('notification', req.body.message)
	}
    res.json('socket: ' + socketId);	
})

module.exports = router;