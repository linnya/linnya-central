(function() {
    'use strict';
    
    angular
        .module('indexApp')
        .controller('chat', profileCtrl);


    function profileCtrl(widgets, $scope) {
    	this.getStarted = getStarted;
        this.generateQR = generateQR;
        $scope.currentStep = 2;

        function generateQR(data){
            var credentials = firebase.auth().currentUser;

            if(!data) widgets.toast('Please fill the blank fields!');
            if(data){
                if(this.form.$valid == true) {
                    widgets.POST('account/agent/temp/'+credentials.uid, data, function(res){
                        $scope.currentStep = 4;
                        $scope.qrcode = res.data.json;
                        $scope.accid = credentials.uid;
                    });
                }
            }
        }
    	function getStarted(){
     		widgets.dialog('partials/modal/getStarted.chat.html', 'chat');
    	}

    }

    profileCtrl.$inject = ['widgets', '$scope'];


})();