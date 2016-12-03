(function() {
    'use strict';
    
    angular
        .module('indexApp')
        .controller('indexApp.invite', inviteCtrl);


    function inviteCtrl($scope, widgets, $routeParams) {
        var vm = this;
        vm.send = send;

        var accid = $routeParams.accid;
        var code = $routeParams.temp;

        widgets.GET('public/temp/'+accid+'/'+code, function(res) {
            $scope.user = res.data.data.data;
        });

        function send(data) {
            if(!data) widgets.toast('Please fill the blank fields!');
            if(data){
                if(!data.agree) widgets.toast('Please agree to our Terms of Service and Privacy Policy!');
                if(this.form.signup.$valid == true) {
                    if(data.password != data.password2) {
                        widgets.toast('Passwords dont match!');
                    }else{
                        data.accid = accid;
                        widgets.POST('account/agent/confirm/'+accid+'/'+code, data, function(res){
                            if(res.status == 200){
                                widgets.toast(res.data.result);
                                widgets.redirect('/#/welcome');
                            };
                            if(res.status == 500) widgets.toast(res.data.result);
                        });
                    }
                    
                }
            }
        }


    }

    inviteCtrl.$inject = ['$scope', 'widgets', '$routeParams'];


})();