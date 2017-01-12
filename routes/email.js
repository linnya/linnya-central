var Firebase = require("firebase");
var request = require('request');
var moment = require('moment');

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

exports.finish = function (req, res) {
 	getAccountDetails(req.body.accid, function(account) {
    var msgsList = [];
		var obj = req.body;

    for(var i in obj){
      if(obj[i].by === 'guest' || obj[i].by === 'agent'){
        if(obj[i].by === 'guest') var name = "You";
        if(obj[i].by === 'agent') var name = obj.agentFirstName +' '+ obj.agentLastName;

        if(obj[i].type === 'text') msgsList.push('<div style="margin:8px 0"><p style="margin:4px 0"><b>'+name+':</b><br>'
          +obj[i].content+'</p><small>'+moment(obj[i].time).format('LT')+'</small></div>');

        if(obj[i].link) msgsList.push('<div><p><b>'+name+':</b><br>'
          +obj[i].link+'</p><small>'+moment(obj[i].time).format('LT')+'</small></div>');
      }
    }
    obj.chatHistory = msgsList.toString().replace(/div>,<div/g, 'div><div');;
    obj.account = account;
    // DEFAULT EMAIL
    obj.email = obj.customerEmail;
 		require('../widgets/email').emailByTemplate(obj, "Chat log by linnya-chat", 'finish.html');
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