const router = require('express').Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
let UserModels = require('../models/user.models.js');
const verifyToken = require('../auth/auth.middleware');

router.post('/addNotification', verifyToken, (req, res) => {
  if (!req.token || !req.body.sender || !req.body.message || !req.body.receiver) {
      return res.status(403).send('Fields missing')
  }
  jwt.verify(req.token, process.env.SECRET, (err, decoded) => {
      if (err) {
          return res.status(403).send("Invalid token")
      }
      UserModels.find({ "email": req.body.receiver}).exec().then(docs => { 
          const user = docs[0]
          if (!user) { 
              res.status(404).send("User not found") 
          }
          const newMessage = req.body.sender + ' ' + req.body.message
          const newNotification = { message: newMessage, viewed: false }
          user.notifications.push(newNotification)
          user.save()
          return res.send('Notification added...')
      }).catch(err => {res.json(err)})
  })
})

router.post('/getNotifications', verifyToken, (req, res) => {
  if (!req.token || !req.body.email) {
      return res.status(403).send('Missing fields')
  }
  jwt.verify(req.token, process.env.SECRET, (err, decoded) => {
      if (err) {
          return res.status(403).send("Invalid token")
      }
      UserModels.find({ "email": req.body.email}).exec().then(docs => { 
          const user = docs[0]
          if (!user) { 
              res.status(404).send("User not found") 
          }
          return res.send(user.notifications)
      }).catch(err => {res.json(err)})
  })
})

module.exports = router;