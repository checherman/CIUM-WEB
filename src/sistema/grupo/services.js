(function(){
	'use strict';
	angular.module('App')
		/**
			* @ngdoc service
			* @name App.recargarPermisos
			* @description
			* Recarga los permisos del usuario.
			*/
		.factory('recargarPermisos', function (AuthService, Menu, actualizarMenu, $localStorage) {
			return {
				cargarPermisos: function () {
					return AuthService.getPermisos()
						.then(function (res) {
							Menu.setMenu(res.data.permisos);
							actualizarMenu.emitir("");
						});
				}
			};
		})
		.factory('actualizarMenu', function ($rootScope) {
			var actualizar = {};

			actualizar.menu = '';

			actualizar.emitir = function (msg) {
				this.menu = msg;
				this.difundir();
			};

			actualizar.difundir = function () {
				$rootScope.$broadcast('manejarMenu');
			};

			return actualizar;
		})	
	})();