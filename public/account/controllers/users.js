(function() {
    'use strict';
    
    angular
        .module('indexApp')
        .controller('users', usersCtrl);


    function usersCtrl($scope, $firebaseArray, widgets, $mdDialog) {

        var vm = this;

        vm.save = save;

        firebase.auth().onAuthStateChanged(function(user) {
            getUsers(user.uid);
        });

        function getUsers(uid) {
            var fireProfile = firebase.database().ref('users').child(uid);
            $scope.users = $firebaseArray(fireProfile);
        };

        function save(data){
            var user = firebase.auth().currentUser;
            if(!data) widgets.toast('Please fill the blank fields!');
            if(data) widgets.POST('account/agent/temp/'+user.uid, data, callback);
            vm.newUser = '';
            
            function callback() {
                $scope.userEmail = data.email;
                $mdDialog.show({
                controller: 'users',
                controllerAs: 'vm',
                templateUrl: 'partials/modal/userNew.html',
                clickOutsideToClose:true,
                scope: $scope.$new(), 
                });
            }
        }
        this.dialogClose = function () {
            return widgets.dialogClose();
        }
     	this.dateConverter = function (time) {
            return moment(time).format('LL');
        }

    }

    usersCtrl.$inject = ['$scope', '$firebaseArray', 'widgets', '$mdDialog'];


})();