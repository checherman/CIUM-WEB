(function() {
  "use strict";
  angular
    .module("App")
    .controller("SigninCtrl", function(
      $rootScope,
      $scope,
      $location,
      $localStorage,
      $stateParams,
      $cookies,
      $mdBottomSheet,
      $translate,
      $mdSidenav,
      $mdDialog,
      Auth,
      CrudDataApi,
      flash,
      MENU_PUBLICO,
      URLS
    ) {
      $scope.cargando = false;

      //inicio
      $scope.active_mensaje = false;
      $scope.loadCaptcha = function() {
        $(".recaptcha").html(
          '<div class="g-recaptcha" data-sitekey="' +
            URLS.CAPTCHA +
            '"></div>'
        );
        $.getScript("https://www.google.com/recaptcha/api.js", function() {});
      };

      $scope.loadCaptcha();

      //registra un nuevo usuario
      $scope.registrarUsuario = function() {
        if (
          $scope.registrar.nombre != "" &&
          $scope.registrar.username != "" &&
          $scope.registrar.email != "" &&
          $scope.registrar.password
        ) {
          if (
            $scope.registrar.password == $scope.registrar.password_confirm
          ) {
            if ($scope.ValidarEmail($scope.registrar.email)) {
              $scope.cargando = true;
              var datos = $scope.registrar;
              datos["g-recaptcha-response"] = $(
                "#g-recaptcha-response"
              ).val();
              CrudDataApi.crear(
                "/signup",
                datos,
                function(data) {
                  data = data.data;
                  $scope.cargando = false;
                  if (data.status == 200 || data.status == 201) {
                    $scope.imprimir_mensaje(data.mensaje, "success");
                  } else {
                    $scope.imprimir_mensaje(data.mensaje, "warning");
                  }
                },
                function(e) {
                  $scope.cargando = false;
                  console.log(e);
                }
              );
            } else {
              $scope.imprimir_mensaje(
                $translate.instant("EMAIL-ERROR"),
                "danger"
              );
            }
          } else {
            $scope.imprimir_mensaje(
              $translate.instant("PASSWORD-CONFIRM-ERROR"),
              "danger"
            );
          }
        } else {
          $scope.imprimir_mensaje($translate.instant("ALL-CAMPOS"), "danger");
        }
      };
      //recupera la contraseña de un usuario
      $scope.recordarPass = function() {
        try {
          if ($scope.ValidarEmail($scope.recordar.email)) {
            $scope.cargando = true;
            var datos = $scope.recordar;

            datos["g-recaptcha-response"] = $("#g-recaptcha-response").val();
            CrudDataApi.crear(
              "/password/recuperar",
              datos,
              function(data) {
                data = data.data;
                $scope.cargando = false;
                if (data.status == 200 || data.status == 201) {
                  $scope.imprimir_mensaje(data.mensaje, "success");
                } else {
                  $scope.imprimir_mensaje(data.mensaje, "warning");
                }
              },
              function(e) {
                $scope.cargando = false;
                console.log(e);
              }
            );
          } else {
            $scope.imprimir_mensaje(
              $translate.instant("EMAIL-ERROR"),
              "danger"
            );
          }
        } catch (e) {
          $scope.imprimir_mensaje(
            $translate.instant("EMAIL-ERROR"),
            "danger"
          );
        }
      };
      $scope.recuperar = {};
      $scope.recuperar.password = "";
      $scope.recuperar.password_confirm = "";

      $scope.registrar = {
        nombre: "",
        username: "",
        email: "",
        password: ""
      };
      $scope.mostrar = false;
      //resetea la contraseña de un usuario
      $scope.resetear = function() {
        if (
          $scope.recuperar.password != "" &&
          $scope.recuperar.password_confirm != ""
        ) {
          if (
            $scope.recuperar.password == $scope.recuperar.password_confirm
          ) {
            var datos = $scope.recuperar;
            $scope.cargando = true;
            CrudDataApi.crear(
              "/password/actualizar-password",
              datos,
              function(data) {
                data = data.data;
                $scope.cargando = false;
                if (data.status == 200 || data.status == 201) {
                  $scope.imprimir_mensaje(data.mensaje, "success");

                  setTimeout(function() {
                    location.href = "#!/signin";
                  }, 1500);
                } else {
                  location.href = "#!/signin";
                }
              },
              function(e) {
                $scope.cargando = false;
                console.log(e);
              }
            );
          } else {
            $scope.imprimir_mensaje(
              $translate.instant("PASSWORD-CONFIRM-ERROR"),
              "danger"
            );
          }
        } else {
          $scope.imprimir_mensaje(
            $translate.instant("PASSWORD-NEW"),
            "danger"
          );
        }
      };
      //valida que un campo email sea email
      $scope.ValidarEmail = function(email) {
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
      };

      $scope.imprimir_mensaje = function(mensaje, tipo, id) {
        flash(tipo, mensaje);
      };

      $scope.resetPassword = function() {
        var token = $stateParams.id;
        $scope.cargando = true;
        CrudDataApi.ver(
          "/password/reset",
          token,
          function(data) {
            data = data.data;
            $scope.cargando = false;
            if (data.status == 200) {
              $scope.recuperar.token = data.data.token;
            } else {
              $scope.imprimir_mensaje(data.mensaje, "warning");
            }
          },
          function(e) {
            $scope.cargando = false;
            location.href = "#!/signin";
          }
        );
      };
      $scope.activePassword = function() {
        var token = $stateParams.id;
        $scope.cargando = true;
        CrudDataApi.ver(
          "/password/active",
          token,
          function(data) {
            data = data.data;
            $scope.cargando = false;
            if (data.status == 200) {
              setTimeout(function() {
                $scope.active_mensaje = true;
                $scope.imprimir_mensaje(data.mensaje, "success");
                setTimeout(function() {
                  location.href = "#!/signin";
                }, 9500);
              }, 1500);
            } else {
              $scope.active_mensaje = false;
              $scope.imprimir_mensaje(data.mensaje, "warning");
            }
          },
          function(e) {
            $scope.cargando = false;
            $scope.active_mensaje = false;
            console.log(e);
            location.href = "#!/signin";
          }
        );
      };
      //fin
      /**
       * @ngdoc method
       * @name App.SigninCtrl#successAuth
       * @methodOf App.SigninCtrl
       *
       * @description
       * Metodo para redireccionar al dashboard
       */
      function successAuth(res) {
        $scope.cargando = false;
        $rootScope.errorSignin = null;
        if (res) $location.path("/dashboard");
      }

      function errorAuth(res) {
        $scope.cargando = false;
        $rootScope.errorSignin = null;
      }

      $scope.email = $cookies.get("login_email");
      $scope.password = $cookies.get("login_password");
      /**
       * @ngdoc method
       * @name App.SigninCtrl#signin
       * @methodOf App.SigninCtrl
       *
       * @description
       * Obtiene el token para hacer peticiones a la api
       */
      $scope.signin = function() {
        var email = $scope.email;
        $localStorage.cium.user_email = email;
        var formData = {
          email: $scope.email,
          password: $scope.password,
          remember: $scope.remember
        };
        $scope.cargando = true;
        Auth.signin(formData, successAuth, errorAuth);
      };

      /**
       * @ngdoc method
       * @name App.SigninCtrl#logout
       * @methodOf App.SigninCtrl
       *
       * @description
       * Cierra la session y elimina el local storage
       */
      $scope.logout = function() {
        $scope.cargando = false;
        Auth.logout(function() {
          $location.path("signin");
        });
      };

      $scope.access_token = $localStorage.cium.access_token;
      $scope.refresh_token = $localStorage.cium.refresh_token;
      $scope.user_email = $localStorage.cium.user_email;

      $scope.urlOlvidePassword = "#!/recuperar-password";
      $scope.urlRegistro = "#!/registro";

      $scope.menuSelected = "";

      /**
       * @ngdoc method
       * @name App.SigninCtrl#ir
       * @methodOf App.SigninCtrl
       *
       * @description
       * Redirecciona a la pagina solicitada
       */
      $scope.ir = function(path, fuera) {
        if (fuera == 1) {
          var a = document.createElement("a");
          a.target = path.indexOf("http") > -1 ? "_blank" : "_self";
          a.href = path.indexOf("http") > -1 ? path : URLS.BASE + path;
          a.click();
        } else {
          $scope.menuSelected = path;
          $location.path(path);
        }
      };

      $scope.menuPublico = MENU_PUBLICO;
      /**
       * @ngdoc method
       * @name App.SigninCtrl#mostrarIdiomas
       * @methodOf App.SigninCtrl
       *
       * @description
       * Muestra la seleccion del idioma
       */
      $scope.mostrarIdiomas = function($event) {
        $mdBottomSheet.show({
          templateUrl: "src/app/views/idiomas.html",
          controller: "ListaIdiomasCtrl",
          targetEvent: $event
        });
      };

      /**
       * @ngdoc method
       * @name App.SigninCtrl#toggleMenu
       * @methodOf App.SigninCtrl
       *
       * @description
       * Muestra el menu lateral si la apliación se abre en un dispositivo
       */
      $scope.toggleMenu = function() {
        $mdSidenav("left-publico").toggle();
      };

      $scope.url_base = URLS.BASE;
      $scope.url_etab = URLS.ETAB;
      $scope.menuAbierto = true;
      $scope.toggleSidenav = function() {
        $scope.menuAbierto = !$scope.menuAbierto;
        $scope.menuIsOpen = true;
        $mdSidenav("left").toggle();
      };
      $scope.link = '';
      $scope.mostrarAyuda = function(event, link) {
        $scope.link = "manual_usuario/login/Output/website/book/capitulo-1.html#" + link;
        $mdDialog.show({
          targetEvent: event,
          scope: $scope.$new(),
          templateUrl: "src/app/views/ayuda.html",
          clickOutsideToClose: true
        });
      };
    })

    .controller("ListaIdiomasCtrl", function(
      $scope,
      $mdBottomSheet,
      $translate
    ) {
      $scope.items = [{ codigo: "es" }, { codigo: "en" }];
      $scope.idiomaSeleccionado = $translate.use();

      $scope.cambiarIdioma = function($index) {
        var clickedItem = $scope.items[$index];
        $translate.use(clickedItem.codigo);
        $mdBottomSheet.hide(clickedItem);
      };
    })
    .controller("MenuCtrl", function(
      $rootScope,
      $translate,
      $window,
      $http,
      $scope,
      $mdDialog,
      $stateParams,
      CrudDataApi,
      $mdSidenav,
      $location,
      $mdBottomSheet,
      UsuarioData,
      Auth,
      Menu,
      errorFlash,
      flash,
      $mdToast,
      URLS,
      listaOpcion
    ) {
      // cambia de color el menu seleccionado
      $scope.menuSelected = "/" + $location.path().split("/")[1];
      $scope.menuIsOpen = false;
      $scope.menu = Menu.getMenu();
      $scope.loggedUser = UsuarioData.getDatosUsuario();

      $scope.menuCerrado = !UsuarioData.obtenerEstadoMenu();
      if (!$scope.menuCerrado) {
        $scope.menuIsOpen = true;
      }

      // muestra el menu para aquellos dispositivos que por su tamaño es oculto
      $scope.toggleMenu = function(isSm) {
        if (!$scope.menuCerrado && !isSm) {
          $mdSidenav("left").close();
          $scope.menuIsOpen = false;
          $scope.menuCerrado = true;
        } else {
          $mdSidenav("left").toggle();
          $scope.menuIsOpen = $mdSidenav("left").isOpen();
        }
        UsuarioData.guardarEstadoMenu($scope.menuIsOpen);
      };

      $scope.url_base = URLS.BASE;
      $scope.url_etab = URLS.ETAB;
      $scope.menuAbierto = true;
      $scope.toggleSidenav = function() {
        console.log(1);
        $scope.menuAbierto = !$scope.menuAbierto;
        $scope.menuIsOpen = true;
        $mdSidenav("left").toggle();
      };

      $scope.fecha_actual = new Date();

      // inicia la inimación de cargando
      $scope.cargando = true;

      // inicializa el modulo ruta y url se le asigna el valor de la página actual
      $scope.ruta = "";
      $scope.url = $location.url();

      $scope.mostrarIdiomas = function($event) {
        $mdBottomSheet.show({
          templateUrl: "src/app/views/idiomas.html",
          controller: "ListaIdiomasCtrl",
          targetEvent: $event
        });
      };

      $scope.logout = function() {
        Auth.logout(function() {
          $location.path("signin");
        });
      };

      $scope.ir = function(path, fuera) {
        if (fuera == 1) {
          var a = document.createElement("a");
          a.target = path.indexOf("http") > -1 ? "_blank" : "_self";
          a.href = path.indexOf("http") > -1 ? path : URLS.BASE + path;
          a.click();
        } else {
          $scope.menuSelected = path;
          $location.path(path);
        }
      };

      $scope.link = '';
      $scope.mostrarAyuda = function (event, link) {
        $scope.link = "manual_usuario/login/Output/website/book/capitulo-1.html#" + link;
        $mdDialog.show({
          targetEvent: event,
          scope: $scope.$new(),
          templateUrl: "src/app/views/ayuda.html",
          clickOutsideToClose: true
        });
      };
    });
})();
