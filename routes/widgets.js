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
  var ip = '179.105.104.127';

  request('http://www.geoplugin.net/json.gp?ip='+ip, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);
      var obj = {};
      var teste = data.geoplugin_region.toString();

      obj.device = {OS:ua.os.name+' '+ ua.os.version, browser: ua.browser.name+ ' '+ ua.browser.major};
      obj.address = {city: data.geoplugin_city, region: entities.decode(teste), country: emojiFlags.countryCode(data.geoplugin_countryCode), currency: data.geoplugin_currencyCode, currencyUTF8: data.geoplugin_currencySymbol_UTF8};
      callback(obj);
    }
  });

};
exports.geoplugin = geoplugin;
