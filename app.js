var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var FirebaseTokenGenerator = require("firebase-token-generator");
var tokenGenerator = new FirebaseTokenGenerator("lPE22aBtXypvNkk8jtIIhLmQfUoKCPqfMyShjP0i");
var Firebase = require("firebase");

var Entities = require('html-entities').AllHtmlEntities;
entities = new Entities();
global.__base = __dirname + '/';

// APP CONFIG
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/', express.static('public/auth'));
app.use('/account', express.static('public/account'));
app.use('/account/assets/svg', express.static('public/account/assets/svg'));

app.all('/api/v1/account/auth/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");

  next();
});

app.all('/api/v1/public/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");

  next();
});

function auth(){
    var ref = new Firebase("https://linnya.firebaseio.com/");
	var token = tokenGenerator.createToken(
		{ uid: "1", some: "arbitrary", data: "here" },
		{ admin: true }
	);

	ref.authWithCustomToken(token, function(error, authData) {
		if (error) {
			console.log("Login Failed!", error);
		};
	});
};

auth();

// ROUTES
app.post('/api/v1/account/auth/signup', require('./routes/account/auth').signup);

app.get('/api/v1/public/temp/:accid/:hash', require('./routes/widgets').getTemp);
app.get('/api/v1/public/track', require('./routes/widgets').track);

app.post('/api/v1/public/email/offline', require('./routes/email').offline);

app.post('/api/v1/account/agent/temp/:accid', require('./routes/agent').request);
app.post('/api/v1/account/agent/confirm/:accid/:temp', require('./routes/agent').confirm);

app.listen(3000);