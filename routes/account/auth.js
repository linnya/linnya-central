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
      delete data.custom;
      
      data.avatarUrl = 'https://firebasestorage.googleapis.com/v0/b/project-5810392278591381337.appspot.com/o/default%2Favatar%2Favatar-04.png?alt=media&token=ab6b0720-55e9-4939-b300-9f8c735027c1';
      
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
      data.custom = custom;

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

var custom = {
  "invite" : "Hello! Welcome to our website. How may I help you?",
  "offline" : {
    "subtitle" : "Click to send us a message.",
    "title" : "We're offline!"
  },
  "online" : {
    "subtitle" : "Feel free to ask any questions.",
    "title" : "We're Online!"
  },
  "system" : {
    "entrance" : {
      // "subtitle" : "Lorem ipsum dolor sit amet, consectetur adipisicing elit",
      "title" : "The agent #agentFirstName #agentLastName entered the chat!"
    },
    "finish" : {
      "subtitle" : "#agentFirstName #agentLastName finished this chat. You will receive a copy of this conversation if you've filled the name and e-mail inputs",
      "title" : "Thanks for comming!"
    },
    "updateForm" : {
      "subtitle" : "Please, fill the inputs below for a better experience, and to receive a copy of this attendance.",
      "title" : "Introduce yourself"
    }
  },
  "wait" : {
    "subtitle" : "Your message has been successfully sent. A qualified agent will enter the chat as soon as possible.",
    "title" : "Please, Wait a second"
  }
};