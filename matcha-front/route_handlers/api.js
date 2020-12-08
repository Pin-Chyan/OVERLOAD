var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var passwordHash = require('password-hash');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var router = express.Router();
var ssn;
module.exports = router;
app.set("view engine", "pug");
app.set('views', __dirname + './');
app.engine('pug', require('pug').__express);
router.use('/images', express.static(__dirname + './../images'));

router.get('/getuser', (request, response) => {
	response.json({ test: 123 });
});