(function() {
	'use strict';

	angular.module('app')
		.controller('Vorod', function($auth) {
			var vm = this;
			vm.vorod = function() {
				$auth.authenticate('twitter');
			};

			vm.khoroj = function() {
				$auth.logout();
			};

			vm.taeidShode = $auth.isAuthenticated;
		});

})();
