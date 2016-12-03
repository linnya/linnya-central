(function() {
    'use strict';
    
    angular
        .module('indexApp')
        .controller('indexApp.signup', signupCtrl);


    function signupCtrl(widgets, localStorageService) {
    	this.form = {};
    	this.form.signup = {};
		this.send = send;

    	function send(data) {
    		if(!data) widgets.toast('Please fill the blank fields!');
    		if(data){
    			if(!data.agree) widgets.toast('Please agree to our Terms of Service and Privacy Policy!');
	        	if(this.form.signup.$valid == true) {
    				if(data.password != data.password2) {
    					widgets.toast('Passwords dont match!');
    				}else{
    					widgets.POST('account/auth/signup', data, function(res){
    						if(res.status == 200){
                                widgets.toast(res.data.result);
                                auth(data);
                            };
                            if(res.status == 500) widgets.toast(res.data.result);
	        			});
    				}
	        		
	        	}
    		}

    	};

        function auth(data) {
            firebase.auth().onAuthStateChanged(function(user) {
                if(user) {
                    widgets.toast("Logged in as: "+ user.email);
                    widgets.redirect('account/#/dashboard');
                }
            });
            
            firebase.auth().signInWithEmailAndPassword(data.email, data.password).catch(function(error) {
              if(error) widgets.toast("Authentication failed:", error.message);
            });

        };
    }

    signupCtrl.$inject = ['widgets', 'localStorageService'];


})();