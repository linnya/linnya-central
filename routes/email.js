var Firebase = require("firebase");
var request = require('request');

function getAccountDetails(accid, callback) {

  var ref = new Firebase("https://linnya.firebaseio.com");
  var fireAcc = ref.child('accounts').child(accid);
  fireAcc.once('value', function(snapshot) {
    var data = snapshot.val();
    callback(data);
  });
  
}

exports.offline = function (req, res) {
 	getAccountDetails(req.body.accid, function(data) {
		var obj = req.body;
 		obj.account = data;
 		if(!data.responseEmail) var to = data.email;
 		if(data.responseEmail) var to = data.responseEmail;
 		require('../widgets/email').offline(obj, to);
 	});
 	var obj = {error: false, number: 200, result: "Fooo bar"};
    res.status(200).json(obj);
};

exports.emailByTemplate = function (obj, subject, template) {

 	getAccountDetails(obj.accid, function(data) {
 		obj.account = data;
 		require('../widgets/email').emailByTemplate(obj, subject, template);
 	});

};