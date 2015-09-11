(function () {
	'use strict';

	angular.module('app', ['satellizer', 'ui.bootstrap', 'ui.router', 'toastr', 'ngAnimate'])
		.config(function($authProvider, $stateProvider, toastrConfig) {
			$authProvider.twitter({
				url: '/api/user/login'
			});

			$stateProvider.state('postha', {
				url: '/',
				templateUrl: 'postham.html',
				controller: 'postHam as pos'
			}).state('post', {
				url: '/post?id',
				templateUrl: 'post.html',
				controller: 'Post as post'
			});

			toastrConfig.positionClass = 'toast-bottom-right';
		});
})();
