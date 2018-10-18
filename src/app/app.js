(function() {
  "use strict";

  var app = angular.module("App", [
    "ngMaterial",
    "ngStorage",
    "ngCookies",
    "ngResource",
    "ngMessages",
    "pascalprecht.translate",
    "http-auth-interceptor",
    "md.data.table",
    "ngAnimate",
    "ngSanitize",
    "flash",
    "checklist-model",
    "angular.filter",
    "FBAngular",
    "lfNgMdFileInput",
    "ui.router",
    "oc.lazyLoad"
  ]);
  /**
   * @ngdoc service
   * @name App.service:config
   * @description
   * Contiene la configuración general del proyecto, precarga los iconos y el tema de material desing, ademas crea las rutas publicas.
   */

  app.run(
    function(
      $rootScope,
      $window,
      $location,
      $localStorage,
      $injector,
      $mdToast,
      authService,
      Menu
    ) {
      $rootScope.online = navigator.onLine;

      $window.addEventListener(
        "offline",
        function() {
          $mdToast.show({
            template:
              '<md-toast > <span flex ><md-icon md-svg-icon="wifi-off" style="color:#FFF"></md-icon> {{ "SIN_CONEXION" | translate}}</span> <md-button ng-click="closeToast()">X</md-button> </md-toast>',
            hideDelay: 3000,
            position: "bottom left",
            controller: function($scope) {
              $scope.closeToast = function() {
                $mdToast.hide();
              };
            }
          });
        },
        false
      );

      $rootScope.$on("event:auth-loginRequired", function() {        
        if ($localStorage.cium.access_token) {
          var Auth = $injector.get("Auth");

          Auth.refreshToken(
            { refresh_token: $localStorage.cium.refresh_token },
            function(res) {
              $localStorage.cium.access_token = res.access_token;
              authService.loginConfirmed();
            },
            function(e) {
              $rootScope.error = "CONNECTION_REFUSED";
              Auth.logout(function() {
                $location.path("/");
              });
            }
          );
        } else {
          // Dejamos que pase la peticion porque ni siquiera hay un access_token
          authService.loginConfirmed();
        }
      });

      $rootScope.$on("$routeChangeStart", function(event, next, current) {
        if ($localStorage.cium.access_token) {
          if (typeof next.$$route !== "undefined") {
            var path = next.$$route.originalPath.split("/");
            // Aquí deberiamos comprobar permisos para acciones de "subrutas"

            if (
              !Menu.existePath("/" + path[1]) &&
              "/" + path[1] != "/acerca-de" &&
              "/" + path[1] != "/acceso-denegado" &&
              "/" + path[1] != "/no-encontrado" &&
              "/" + path[1] != "/manual-usuario" &&
              "/" + path[1] != "/manual-web"
            ) {
              $location.path("/dashboard");
            }
          }
        } else {
          if (typeof next.$$route !== "undefined") {
            if (
              next.$$route.originalPath != "/signin" &&
              next.$$route.originalPath != "/recuperar-password" &&
              next.$$route.originalPath != "/registro" &&
              next.$$route.originalPath != "/active/:id" &&
              next.$$route.originalPath != "/reset/:id" &&
              next.$$route.originalPath != "/"
            ) {
              $location.path("/");
            }
          } else {
            $location.path("/");
          }
        }
      });
    }
  );
})();
