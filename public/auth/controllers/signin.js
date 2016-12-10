(function() {
    'use strict';
    
    angular
        .module('indexApp')
        .controller('indexApp.signin', signinCtrl);


    function signinCtrl(widgets, $scope) {
        this.form = {};

        firebase.auth().onAuthStateChanged(function(user) {
            if(user) checkAccount(user);
        });

        function checkAccount(user) {
            var ref = firebase.database().ref('owner').child(user.uid);
            ref.once('value', function(snapshot) {
                var data = snapshot.val();
                if(data.accid === user.uid){
                    widgets.toast("Logged in as: "+ user.email);
                    // widgets.redirect('account/#/dashboard');
                    widgets.redirect('/#/welcome');
                }
                if(data.accid !== user.uid){
                    firebase.auth().signOut();
                    widgets.toast("This panel can only be accessed by the account administrator!");
                }
            });
        }

        this.send = function(data) {

            if(data.email.length === 0 && data.password.length === 0) widgets.toast('Please fill the blank fields!');
            if(this.form.signin.$valid === true) {
                firebase.auth().signInWithEmailAndPassword(data.email, data.password).catch(function(error) {
                  console.log(error);
                  if(error) widgets.toast("Authentication failed: "+error.message);
                });
            }
            
        }


    }

    signinCtrl.$inject = ['widgets', '$scope'];


})();