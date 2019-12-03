const express = require('express');
const router = express.Router();
const Joi = require('joi');
const userController = require('../controllers/user_controller.js')

router.post('/createUser', (req, res) => {
    userController.createUser(req, res);
});

module.exports = router;

