(function() {
    'use strict';

    angular
        .module('indexApp')
        .config(['$routeProvider', '$locationProvider',  function($routeProvider, $locationProvider) {
	    	
	    	$routeProvider.when('/signup', 
	    	{templateUrl: 'partials/signup.html', 
	    	title: 'Signup', 
	    	controller: 'indexApp.signup as vm'});

	    	$routeProvider.when('/signin', 
	    	{templateUrl: 'partials/signin.html', 
	    	title: 'Signin', 
	    	controller: 'indexApp.signin as vm'});

	    	$routeProvider.when('/help', 
	    	{templateUrl: 'partials/help.html', 
	    	title: 'Help', 
	    	controller: 'indexApp.help as vm'});

	    	$routeProvider.when('/invite/:accid/:temp', 
	    	{templateUrl: 'partials/invite.html', 
	    	title: 'Invite', 
	    	controller: 'indexApp.invite as vm'});

	    	$routeProvider.when('/welcome', 
	    	{templateUrl: 'partials/welcome.html', 
	    	title: 'Welcome', 
	    	controller: 'indexApp.signup as vm'});
	    	

	    	$routeProvider.otherwise({redirectTo: '/signin'});

}]);
 
})();
