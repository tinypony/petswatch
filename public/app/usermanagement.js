angular.module('vamotors.usermanagement', ['vamotors.config'])
	.factory('AuthService', ['$http', 'va.error', function($http, Error) {
		var currentUser;
		var authenticated = false;

		function setUser(resp) {
			currentUser = resp.data.user;
			authenticated = resp.data.authenticated;
		}

		return {
			fetch: function() {
				$http.get('/current_user').then(function(resp) {
					setUser(resp);
				},function() {
					console.log('faaaail');
				});
			},
		    login: function(loginInfo, succ, fail) { 
		    	$http.post('/login', loginInfo).then(
					function(data, status) {
						$http.get('/current_user').then(
							function(resp){
								setUser(resp);
							},
							function(resp){

							});
						if(succ) {
							succ();
						}
					}, 
					function(resp) {
						if(resp.data.code === Error.WRONG_PASSWORD) {
							console.log('wrong password');
						} else if (resp.data.code === Error.USER_NOT_FOUND){
							console.log('user not found');
						}
						if(fail) {
							fail(resp);
						}
					});
		    },
		    logout: function() { 
		    	$http.get('/logout').then(function() {
		    		currentUser = null;
		    		authenticated = false;
		    	});
		    },
		    isAdmin: function() {
		    	return authenticated && _.contains(currentUser.groups, 'admin');
		    },
		    isLoggedIn: function() { 
		    	return authenticated;
		    },
		    user: function() { 
		    	return currentUser;
		    }
		};
	}]);