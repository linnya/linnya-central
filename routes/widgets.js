var Firebase = require("firebase");
var request = require('request');
var parser = require('ua-parser-js');
var emojiFlags = require('emoji-flags');

var Entities = require('html-entities').AllHtmlEntities;
entities = new Entities();

exports.getTemp = function (req, res) {
  var accid = req.params.accid;
  var hash = req.params.hash;

  var ref = new Firebase("https://linnya.firebaseio.com");
  var fireTemp = ref.child('temp').child(accid).child(hash);
  fireTemp.once("value", function(snapshot){
    var data = snapshot.val();
    if(data){
      var obj = {error: false, number: 200, result: 'Success, Your request has been found', data};
      res.status(200).json(obj);
    };
    if(!data){
      var obj = {error: true, number: 500, result: 'Error, Temp connection not found!'};
      res.status(500).json(obj);
    };
  });

};

exports.track = function (req, res) {
  // var ip = req.ip;
  // if(ip == '::ffff:192.168.0.11') ip = '179.105.104.127';
  geoplugin(req, function(data) {
    res.status(200).json(data);
  })


};

function geoplugin(req, callback){
  var ua = parser(req.headers['user-agent']);
  if(req.ip === '::1') var ip = '179.105.125.187';
  if(req.ip !== '::1') var ip = req.ip;

  request('http://freegeoip.net/json/'+ip, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      var obj = {};
      var teste = data.region_code.toString();

      obj.device = {OS:ua.os.name+' '+ ua.os.version, browser: ua.browser.name+ ' '+ ua.browser.major};
      obj.address = {city: data.city, region: data.region_name, country: emojiFlags.countryCode(data.country_code)};
      callback(obj);
    }
  });

};
exports.geoplugin = geoplugin;
