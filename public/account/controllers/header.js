(function() {
    'use strict';
    
    angular
        .module('indexApp')
        .controller('header', headerCtrl);


    function headerCtrl($mdSidenav, $rootScope, widgets, $firebaseAuth, $firebaseObject) {
		this.logout = logout;
        this.pushNav = buildToggler('left');
        this.customClass = customClass;

        buildToggler('left');

        function buildToggler (navID) {
            return function() {
                $mdSidenav(navID)
                    .toggle();
            }
        }

		function logout (){
			firebase.auth().signOut().then(function() {
                widgets.toast("logout Sucess!");
            });
		}
      
        var menus = [
            {href: "#/home", icon: "home", title: "Home"},
            {icon: "home", title: "Applications"},
            {href: "#/chat", icon: "comment-multiple-outline", title: "Live Chat", 
            sub: [
                {href: "#/chat/dashboard", title: "Dashboard"},
                {href: "#/chat/connections", title: "Connections"},
                // {href: "#/chat/analytics", title: "Analytics"},
                // {href: "#/chat/actions", title: "Triggers and Actions"},
                {href: "#/chat/custom", title: "Custom"}
            ]
            },
            {href: "#/remote", icon: "desktop-mac", title: "Remote Access"},
            {href: "#/ticket", icon: "ticket-account", title: "Ticket"},
            {icon: "home", title: "Mananger"},
            {href: "#/users", icon: "account-multiple", title: "Users"},
            {href: "#/payment", icon: "credit-card-multiple", title: "Payment"},
            {href: "#/account", icon: "account", title: "My Account"}
            // {href: "#/widgets", icon: "apps", title: "AddOns"}
        ];
        this.menus = menus;

        function customClass(index){
            var className = 'batman';
            if(index == this.active) className += ' active';
            if(menus[index].sub && appLinks(index) == false) className += ' locked';
            if(menus[index].sub && appLinks(index) == true) className += ' unlocked';
            if(menus[index].sub && appLinks(index) == true && index == this.active) className += ' active';

            return className;
        }
        function appLinks(index){
            if(menus[index].href == '#/chat') return true;
        }

        function currentMenu(){
            var hash = window.location.hash;
            var index = widgets.getArrIndex(menus, {href: hash});
            return index;
        }

        this.active = currentMenu();
    }

    headerCtrl.$inject = ['$mdSidenav', '$rootScope', 'widgets', '$firebaseAuth', '$firebaseObject'];


})();