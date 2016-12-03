var generator = require('../../widgets/rdgenerator');
var Firebase = require("firebase");

exports.signup = function (req, res) {
    var ref = new Firebase("https://linnya.firebaseio.com/");
    ref.createUser(req.body, function(error, userData) {
      if (error) {
        var obj = {error: true, number: 500, result: "The specified email address is already in use"};
        res.status(500).json(obj);
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
        createAccount(req.body, userData.uid);
      }
    });
    function createUser(data, uid) {
      createrOwner(uid, uid);
      var fireUser = ref.child('users').child(uid).child(uid);
      delete data.ActivationCode;
      delete data.responseEmail;

       fireUser.set(data, function(error) {
        if (error) {
          var obj = {error: true, number: 500, result: 'Error, contact our staff'};
          res.status(500).json(obj);
        } else {
          var obj = {error: false, number: 200, result: 'Success, you will be redirected'};
          res.status(200).json(obj);
        }
      });

    }
    function createrOwner(uid, accid) {
      var fireOwner = ref.child('owner').child(uid);
      fireOwner.set({accid: accid, active: true});
    }
    function createAccount(data, uid){

      data.ActivationCode = generator.randomStringNumbersLower(15);
      data.regDate = Firebase.ServerValue.TIMESTAMP;
      data.active = true;
      data.responseEmail = data.email;

      delete data.password;
      delete data.password2;
      delete data.agree;

      var ip = '179.105.104.127';

      require('../widgets').geoplugin(req, function(result) {
        data.track = result;
        storeFirebase(data, uid);
      });

    };

    function storeFirebase(data, uid) {
      var fireAccount = ref.child('accounts').child(uid);
      fireAccount.set(data, function(error) {
        if (error) {
          var obj = {error: true, number: 500, result: 'Email already registered'};
          res.status(500).json(obj);
        }
        if(!error) createUser(data, uid);
      });
    }
};