(function() {
    'use strict';
    
    angular
        .module('indexApp')
        .factory('widgets', widgetsFactory);


    function widgetsFactory($mdToast, $http, $mdDialog, $timeout, $window, $q) {
        var URL = "http://localhost:3000/api/v1/";
        // var URL = "http://192.168.25.198:3000/api/v1/";

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
            dialogText: function (title, text, ok, cancel, callback) {
              var confirm = $mdDialog.confirm()
                    .title(title)
                    .textContent(text)
                    .ariaLabel('Dialog')
                    .ok(ok)
                    .cancel(cancel);
              $mdDialog.show(confirm).then(function(answer) {
                callback(answer);
              });
            
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
            count: function (arr) {
              var count = 0;
              for (var k in arr) {
                if (arr.hasOwnProperty(k)) count++;
              }
              return count;
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
                  }, 2000);
              }
            },
            removeString: function(string, find, reverse){
              var s = string;
              var n = s.indexOf(find);
              if(!reverse) s = s.substring(0, n != -1 ? n : s.length);
              if(reverse) s = s.substring(n + 1, s.length);
              return s;
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
            },
            getShortDaysNames: function(callback){

              if(navigator.globalization){
                var shortDays = [];

                navigator.globalization.getDateNames(
                  function (names) {
                    for (var i = 0; i < names.value.length; i++) {
                      if(i == 0 || i == 6) {var active = false}else{ var active = true};
                      var obj = {desc: names.value[i].substring(0, 3), active:active};
                      shortDays.push(obj);
                      if(i == 6) callback(shortDays);
                    }
                  },
                  function () { alert('Error getting names\n'); },
                    { type: 'wide', item: 'days' }
                  );
              }else{
                var shortDays = [{desc:'Dom', active:false},{desc:'Seg', active: true},{desc:'Ter', active: true},{desc:'Qua', active: true},{desc:'Qui', active: true},{desc:'Sex', active: true},{desc:'Sáb', active: false}];
                callback(shortDays);
              }
            }

          }
        return prod;

    }   

    widgetsFactory.$inject = ['$mdToast', '$http', '$mdDialog', '$timeout', '$window', '$q'];

})();