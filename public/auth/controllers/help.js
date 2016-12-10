(function() {
    'use strict';
    
    angular
        .module('indexApp')
        .controller('indexApp.help', helpCtrl);


    function helpCtrl(widgets) {
        var vm = this;

        vm.resetPass = resetPass;

        function resetPass(email) {
            if(email){
                auth.sendPasswordResetEmail(email).then(function() {
                    widgets.toast("Email Sended! check your inbox");
                }, function(error) {
                    if(error) widgets.toast("Authentication failed: "+error.message);
                }); 
            }
           
        }

    }

    helpCtrl.$inject = ['widgets'];


})();