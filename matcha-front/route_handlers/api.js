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

router.get('/ssn/register', function(req, res) {
	console.log(req.query);
	//if (!ssn.user || ssn.user == null){
	//	res.redirect('/login');
	//} else {
		var item = req.query;
		var hashPassword = passwordHash.generate(item.password);
		console.log("password-hash: " + hashPassword);
		//var personalInfo = new UserModel({
		//	name: item.name,
		//	surname: item.surname,
		//	email: item.email,
		//	password: hashPassword
		//})
		//res.redirect('/login');
	//}
})