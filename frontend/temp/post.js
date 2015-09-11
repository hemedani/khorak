(function() {
	'use strict';

	angular.module('app')
		.controller('Post', function($http, $location, toastr) {
			var vm = this;

			var id = $location.search().id;

			vm.zaman = new Date();

			vm.minDate = new Date();

			vm.opened = false;

			vm.pak = pakPost;

			vm.open = function($event) {
				$event.preventDefault();
				$event.stopPropagation();

				vm.opened = !vm.opened;
			};

			function bigiPost() {
				$http.get('/api/post/' + id).then(function(post) {
					vm.peygham = post.data.peygham;

					var zamanbandi = new Date(post.data.zamanRoz);
					vm.roz = zamanbandi;
					vm.zaman = zamanbandi;
				});
			}

			if (virayeshMishe()) {
				vm.darVirayesh = true;
				bigiPost();
				vm.zakhire = virayeshPost;
			} else {
				vm.zakhire = postJadid;
			}

			function postJadid() {

				var zamanRoz = new Date(vm.roz.getFullYear(), vm.roz.getMonth(), vm.roz.getDate(), vm.zaman.getHours(), vm.zaman.getMinutes());

				$http.post('/api/post/tweet', {
					peygham: vm.peygham,
					zamanRoz: zamanRoz
				}).then(function() {
					toastr.success('poste jadid sakhte shod!!!');
				});
			}

			function virayeshPost() {
				var zamanRoz = new Date(vm.roz.getFullYear(), vm.roz.getMonth(), vm.roz.getDate(), vm.zaman.getHours(), vm.zaman.getMinutes());
				$http.post('/api/post/update/' + id, {
					peygham: vm.peygham,
					zamanRoz: zamanRoz
				}).then(function() {
					toastr.success('post virayesh shod!!!');
				});
			}

			function pakPost() {
				$http.post('/api/post/destroy/' + id).then(function() {
					toastr.info('postemon PAK shod!!!');
				});
			}

			function virayeshMishe() {
				return id;
			}
		});

	angular.module('app').directive('datepickerPopup', function() {
		return {
			restrict: 'EAC',
			require: 'ngModel',
			link: function(scope, element, attr, controller) {
				//remove the default formatter from the input directive to prevent conflict
				controller.$formatters.shift();
			}
		};
	});

})();
