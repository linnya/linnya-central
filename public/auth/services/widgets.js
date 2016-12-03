(function() {
    'use strict';
    
    angular
        .module('indexApp')
        .factory('widgets', widgetsFactory);


    function widgetsFactory($mdToast, $http, $mdDialog, $timeout, $window, localStorageService) {
        var URL = "http://localhost:3000/api/v1/";

        var prod = {
            toast: function(text) {
                $mdToast.show(
                    $mdToast.simple()
                    .content(text)
                    .position('top right')
                    .hideDelay(3000)
                );
            },
            toastAction: function(text, act, callback) {
                var toast = $mdToast.simple()
                            .textContent(text)
                            .action(act)
                            .highlightAction(true)
                            .position('top right');
                $mdToast.show(toast).then(function(response) {
                  callback(response);
                });
            },
            getCep: function(cep, cb){
                $http.get("http://escridata.com.br/widgets/web_cep.php?cep="+cep)
                .then(function(data){
                    cb(data);
                });
            },
            jsonConcat: function (o1, o2) {
             for (var key in o2) {
              o1[key] = o2[key];
             }
             return o1;
            },
            dialog: function (template, ctrl, callback) {
                $mdDialog.show({
                  controller: ctrl,
                  controllerAs: 'vm',
                  templateUrl: template,
                  clickOutsideToClose:true,
                  locals: null,
                  parent: angular.element(document.body)
                }).then(function(answer) {
                  callback(answer);
                });
            },
            dialogClose: function (answer) {
                return $mdDialog.hide(answer);
            },
            getArrIndex: function(arr, obj) {
              var key = Object.keys(obj)[0];
             if(obj){
                var index = arr.map(function(res) { return res[key]; }).indexOf(obj[key]);
              }
              return index;
            },
            focus: function(id) {
                $timeout(function() {
                  var element = $window.document.getElementById(id);
                  if(element)
                    element.focus();
                });
            },
            store: function (data) {
              var obj = JSON.stringify(data);
              return localStorageService.set('linnya', obj);
            },
            getStore: function () {
              var data = localStorageService.get('linnya');
              return JSON.parse(data);
            },
            redirect: function(url, now){
              if(now){
                $window.location = url;
              }else{
                  setTimeout(function(){
                    $window.location = url;
                  }, 3000);
              }
            },
            POST: function(route, data, callback){
              $http.post(URL+route, data)
                .then(function(data){
                    callback(data);
                }, function(err){
                    callback(err);
                });
            },
            GET: function(route, callback){
              $http.get(URL+route)
                .then(function(data){
                    callback(data);
                }, function(err){
                    callback(err);
                });
            }
            
          }
        return prod;

    }   

    widgetsFactory.$inject = ['$mdToast', '$http', '$mdDialog', '$timeout', '$window', 'localStorageService'];

})();