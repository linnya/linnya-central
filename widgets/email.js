var nodemailer = require('nodemailer');
var Firebase = require("firebase");
var ref = new Firebase("https://linnya.firebaseio.com");
var fs = require('fs');
var moment = require('moment');

function dateConverter() {
  var date = new Date();
  return moment(date).format('LLLL');
}

function timeConverter() {
  function addZero(i) {
      if (i < 10) {
          i = "0" + i;
      }
      return i;
  }

  var date = new Date();
  return date.getHours()+':'+addZero(date.getMinutes());
}

function getFile(path, obj, callback) {

  fs.readFile(path, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var replaced = replace(data, obj);

  callback(replaced);

  });

}
function replace(data, obj) {

  var mapObj = {
    serverUrl : 'http://localhost:3000',
    accountID : obj.accid,
    companyName : obj.account.businessName,
    companyWebsite : obj.account.website,
    termsCustomLink :"http://www.google.com.br",
    privacyCustomLink :"http://www.google.com.br",
    chatHistory : obj.chatHistory,
    agentFullName : obj.agentFullName,
    agentFirstName : obj.agentFirstName,
    agentLastName : obj.agentFirstName,
    customerName : obj.customerName,
    customerEmail : obj.email,
    customDate : dateConverter(),
    time : timeConverter(),
    customOfflineMessage : obj.message,
    customLink : obj.code
  };

  var key = Object.keys(mapObj).toString();
  var search = key.replace(/,/g, '|');
  
  var reg = new RegExp(search, "g");

  data = data.replace(reg, function(matched){
    if(mapObj[matched]) return mapObj[matched];
    if(!mapObj[matched]) return '';
  });

  return data;
}
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'linnya.network@gmail.com',
        pass: '####'
    }
});

exports.offline = function(obj, to) {

  var mailOptions = {
      from: 'Linnya network <no-reply@linnya.com',
      to: to, // list of receivers
      subject: 'Linnya network offline message',
  };

  getFile('./widgets/emails/offlineMsg.html', obj, function(data) {
      mailOptions.html = data;

      transporter.sendMail(mailOptions, function(error, info){
          if(error){
              console.log(error);
          }else{
              console.log('Message sent: ' + info.response);
              saveFirebaseLog(obj, info.response);
          }
      });
  });

  function saveFirebaseLog(data, log) {
    var obj = {email: data.email, time: Firebase.ServerValue.TIMESTAMP, log: log};
    var fireMsg = ref.child('offline_msg').child(data.accid);
    fireMsg.push(obj);
  }
};
exports.emailByTemplate = function(obj, subject, template) {

  var mailOptions = {
      from: 'Linnya network <no-reply@linnya.com',
      to: obj.email, // list of receivers
      subject: subject,
  };

  getFile('./widgets/emails/'+template, obj, function(data) {
      mailOptions.html = data;
      transporter.sendMail(mailOptions, function(error, info){
          if(error){
              console.log(error);
          }else{
              console.log('Message sent: ' + info.response);
          }
      });
  });
};
