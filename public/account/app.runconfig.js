 (function() {
    'use strict';

    angular
        .module('indexApp')
        .run(['$rootScope', 'widgets', '$firebaseAuth', function($rootScope, widgets, $firebaseAuth){

        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            // TITLE AND
            if (current.hasOwnProperty('$$route')) {
                $rootScope.title = current.$$route.title;
            }
            // INTERCEPTOR
            firebase.auth().onAuthStateChanged(function(user) {
                if(!user){
                    return widgets.redirect('/#/signin', true);
                }
            });

        });

    }]);
 
    angular
    .module('indexApp')
    .config(firebaseConn);

    function firebaseConn() {
        var config = {
            apiKey: "AIzaSyBWRQNO4iBKBxBCJySq4BWd15weM_pU9ks",
            authDomain: "linnya.firebaseapp.com",
            databaseURL: "https://linnya.firebaseio.com",
            storageBucket: "project-5810392278591381337.appspot.com",
        };
        firebase.initializeApp(config);
    }

})();