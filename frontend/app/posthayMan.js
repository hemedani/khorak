(function() {
	'use strict';

	/**
	 * app Module
	 *
	 * Description
	 */
	angular.module('app').controller('postHam', function($http) {

		var vm = this;

		$http.get('/api/post/posthayMan').then(function(postha) {
			vm.postha = postha.data;
		});

	});
})();
