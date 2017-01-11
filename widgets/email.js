var nodemailer = require('nodemailer');
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
    customerName : obj.name,
    chatHistory : obj.chatHistory,
    customerfirstName : obj.firstName,
    customerlastName : obj.lastName,
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
        pass: 'linnya2000'
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
          }
      });
  });
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
