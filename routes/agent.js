var Firebase = require("firebase");
var request = require('request');
var ref = new Firebase("https://linnya.firebaseio.com");

exports.request = function (req, res) {
  var accid = req.params.accid;
  var fireTemp = ref.child('temp').child(accid);
  
  var data = {
  	type: 'agent',
  	time: Firebase.ServerValue.TIMESTAMP,
  	data: req.body
  };

  var newTemp = fireTemp.push(data, function(error){

  	if(error){
  		var obj = {error: true, number: 400, result: 'Error!', json: error};
  		res.status(400).json(obj);	
  	}
  	if(!error){
      var email = req.body;
      email.accid = accid;
      email.code = newTemp.key();
      require('./email').emailByTemplate(email, 'Linnya network new agent invite', 'agentInvite.html');
  		var obj = {error: false, number: 200, result: 'Success!', json: newTemp.key()};
  		res.status(200).json(obj);
  	}

  });
};

exports.confirm = function (req, res) {

    var fireTemp = ref.child('temp').child(req.params.accid).child(req.params.temp);
    fireTemp.once('value', function(snapshot) {
      var data = snapshot.val();
      if(data) createFirebaseAccount();
      if(!data){
        var obj = {error: true, number: 500, result: 'Error, Temp connection not found!'};
        res.status(500).json(obj);
      };
      fireTemp.remove();
    });

    function createFirebaseAccount() {
      ref.createUser(req.body, function(error, userData) {
        if (error) {
          var obj = {error: true, number: 500, result: "The specified email address is already in use"};
          res.status(500).json(obj);
          console.log("Error creating user:", error);
        } else {
          console.log("Successfully created user account with uid:", userData.uid);
          createUser(req.body, userData.uid)
        }
      });
    }


   function createUser(data, uid) {
    require('./email').emailByTemplate(data, 'Linnya network new agent invite', 'agentWelcome.html');
    createrOwner(uid, data.accid);
    
    data.regDate = Firebase.ServerValue.TIMESTAMP;
    delete data.password;
    delete data.password2;
    delete data.agree;
    
    require('./widgets').geoplugin(req, function(result) {
      // data.track = result;
      storeFirebase(data, uid);
    });
    

   }
   function storeFirebase(data, uid) {
      var fireUser = ref.child('users').child(data.accid).child(uid);
      delete data.accid;
      
      fireUser.set(data, function(error) {
        if(error){
          var obj = {error: true, number: 400, result: 'Error!', json: error};
          res.status(400).json(obj);  
        }
        if(!error){
          var obj = {error: false, number: 200, result: 'Success!'};
          res.status(200).json(obj);
        }
      });
    }
   function createrOwner(uid, accid) {
    var fireOwner = ref.child('owner').child(uid);
    fireOwner.set({accid: accid, active: true});
   }
 
};