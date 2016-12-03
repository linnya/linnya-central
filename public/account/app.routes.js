(function() {
    'use strict';

    angular
        .module('indexApp')
        .config(['$routeProvider', '$locationProvider',  function($routeProvider, $locationProvider) {
	    	
	    	$routeProvider.when('/chat', 
	    	{templateUrl: 'partials/chat.html', 
	    	title: 'Chat', 
	    	controller: 'chat as vm'});

	    	$routeProvider.when('/chat/dashboard', 
	    	{templateUrl: 'partials/chat/dashboard.html', 
	    	title: 'Chat Dashboard', 
	    	controller: 'chat.dashboard as vm'});

	    	$routeProvider.when('/chat/connections', 
	    	{templateUrl: 'partials/chat/connections.html', 
	    	title: 'Chat Connections', 
	    	controller: 'chat.connections as vm'});

	    	$routeProvider.when('/chat/analytics', 
	    	{templateUrl: 'partials/chat/analytics.html', 
	    	title: 'Chat Analytics', 
	    	controller: 'chat.analytics as vm'});

	    	$routeProvider.when('/chat/custom', 
	    	{templateUrl: 'partials/chat/custom.html', 
	    	title: 'Chat Custom', 
	    	controller: 'chat.custom as vm'});

	    	$routeProvider.when('/users', 
	    	{templateUrl: 'partials/users.html', 
	    	title: 'Users', 
	    	controller: 'users as vm'});

	    	$routeProvider.when('/payment', 
	    	{templateUrl: 'partials/payment.html', 
	    	title: 'Payment', 
	    	controller: 'payment as vm'});

	    	$routeProvider.when('/payment/:bid', 
	    	{templateUrl: 'partials/payment.detail.html', 
	    	title: 'Payment Detail', 
	    	controller: 'payment as vm'});

	    	$routeProvider.otherwise({redirectTo: '/error'});

}]);
 
})();
