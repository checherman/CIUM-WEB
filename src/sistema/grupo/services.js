(function() {
  "use strict";
  angular.module("App");

  /**
   * @ngdoc directive
   * @name App.directive:menuIzquierdo
   * @description
   * Crea el menu lateral izquierdo con los permisos del usuario.
   */
  angular
    .module("App")
    .directive("menuIzquierdo", function(
      $rootScope,
      $localStorage,
      $location,
      $timeout,
      Menu,
      MENU_PUBLICO,
      actualizarMenu,
      UsuarioData
    ) {
      return {
        templateUrl: "src/app/views/menu.html",
        controller: function(
          $scope,
          $attrs,
          $location,
          actualizarMenu,
          UsuarioData,
          Menu
        ) {
          $scope.$on("manejarMenu", function() {
            // cambia de color el menu seleccionado
            $scope.menuSelected = "/" + $location.path().split("/")[1];
            $scope.menu = Menu.getMenu();
            $scope.loggedUser = UsuarioData.getDatosUsuario();
          });
        }
      };
    });

  /**
   * @ngdoc service
   * @name App.recargarPermisos
   * @description
   * Recarga los permisos del usuario.
   */
  angular
    .module("App")
    .factory("recargarPermisos", function(
      AuthService,
      Menu,
      actualizarMenu,
      $localStorage
    ) {
      return {
        cargarPermisos: function() {
          return AuthService.getPermisos().then(
            function(res) {
              res = res.data;
              Menu.setMenu(res.permisos);
              actualizarMenu.emitir("");
            },
            function(res) {
              console.log(res);
            }
          );
        }
      };
    });

  angular.module("App").factory("actualizarMenu", function($rootScope) {
    var actualizar = {};

    actualizar.menu = "";

    actualizar.emitir = function(msg) {
      this.menu = msg;
      this.difundir();
    };

    actualizar.difundir = function() {
      $rootScope.$broadcast("manejarMenu");
    };

    return actualizar;
  });
})();
