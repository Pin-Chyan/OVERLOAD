const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/getToken',(req, res) => {
    const testUser = {
        id: 1,
        name: 'frank',
        email: 'we@geemail.com'
    }
    jwt.sign({testUser}, 'sercret', (err, token) => {
        res.json({
             token
        });
    });
})

module.exports = router;