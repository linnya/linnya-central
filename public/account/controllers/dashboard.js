(function() {
    'use strict';
    
    angular
        .module('indexApp')
        .controller('dashboard', dashboardCtrl);


    function dashboardCtrl(widgets, localStorageService) {
    	

    }

    dashboardCtrl.$inject = ['widgets', 'localStorageService'];


})();