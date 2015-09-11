(function() {
	'use strict';

	angular.module('app')
		.controller('Zamanbandi', function($http) {
			var vm = this;
			vm.tweet = function() {

				var zamanRoz = new Date(vm.roz.getFullYear(), vm.roz.getMonth(), vm.roz.getDate(), vm.zaman.getHours(), vm.zaman.getMinutes());

				$http.post('/api/post/tweet', {
					peygham: vm.peygham,
					zamanRoz: zamanRoz
				}).then(function() {

				});
			};

			vm.zaman = new Date();

			vm.minDate = new Date();


			vm.opened = false;

			vm.open = function($event) {
				$event.preventDefault();
				$event.stopPropagation();

				vm.opened = !vm.opened;
			};
		});

})();
