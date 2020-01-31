const router = require('express').Router();
const jwt = require('jsonwebtoken');
let UserModels = require('../models/user.models.js');
const verifyToken = require('../auth/auth.middleware');

router.post('/getNotifications', verifyToken, (req, res) => {
    if (!req.token || !req.body.email) {
        return res.status(403).send('Missing fields')
    }
    jwt.verify(req.token, process.env.SECRET, (err, decoded) => {
      if (err) {
          return res.status(403).send("Invalid token")
        }
        UserModels.find({ "email": req.body.email}, "ping likes liked notifications").exec().then(docs => { 
            var user = docs[0];
            user.ping = Date.now();
            user.save();
            if (!user) { 
                res.status(404).send("User not found")
            } else {
                
                return res.send(user);
            }
        }).catch(err => {res.json(err)})
    })
})

router.post('/viewNotifications', verifyToken, (req, res) => {
  if (!req.token || !req.body.email) {
    return res.status(403).send('Missing fields')
  }
  jwt.verify(req.token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).send('Invalid token')
    }
    UserModels.findOne({ email: req.body.email }, 'notifications last').exec().then(docs => {
      const user = docs
      if (!user) {
        res.status(404).send('User not found')
      } else {
        for (let i = 0; i < user.notifications.length; i++) {
          const newElem = { message: user.notifications[i].message, viewed: true }
          user.notifications.set(i, newElem)
        }
        user.save()
        return res.send(user)
      }
    }).catch(err => { res.json(err) })
  })
})

module.exports = router

