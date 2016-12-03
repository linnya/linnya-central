(function() {
    'use strict';
    
    angular
        .module('indexApp')
        .controller('payment', paymentCtrl);


    function paymentCtrl(widgets) {
        this.selected = [];
    	this.openDetail = openDetail;

        function openDetail(bid) {
            widgets.redirect('#/payment/123', true);

        }
    }

    paymentCtrl.$inject = ['widgets'];


})();