/**
 * @ngdoc object
 * @name Sistema.UsuarioCtrl
 * @description
 * Complemento del controlador CrudCtrl  para tareas especificas en Usuario
 */
(function() {
  "use strict";
  angular
    .module("App")
    .controller("UsuarioCtrl", function(
      $rootScope,
      $translate,
      $scope,
      $localStorage,
      $stateParams,
      $mdSidenav,
      $mdDialog,
      $location,
      $mdBottomSheet,
      Auth,
      Menu,
      $http,
      $window,
      $timeout,
      
      flash,
      errorFlash,
      listaOpcion,
      UsuarioData,
      URLS,
      CrudDataApi
    ) {
      
      $scope.loggedUser = UsuarioData.getDatosUsuario();
      
      $scope.activar_super = $localStorage.cium.perfil.es_super;

      $scope.url_base = URLS.BASE;
      $scope.url_etab = URLS.ETAB;
      
      $scope.fecha_actual = new Date();

      // inicia la inimación de cargando
      $scope.cargando = true;

      // inicializa el modulo ruta y url se le asigna el valor de la página actual
      $scope.ruta = "";
      $scope.url = $location.url();


      // cambia los textos del paginado de cada grid
      $scope.paginationLabel = {
        text: $translate.instant("ROWSPERPAGE"),
        of: $translate.instant("DE")
      };

      // Inicializa el campo para busquedas disponibles para cada grid
      $scope.BuscarPor = [
        { id: "nombre", nombre: $translate.instant("NOMBRE") },        
        { id: "email", nombre: $translate.instant("EMAIL") },
        { id: "creadoAl", nombre: $translate.instant("CREADO") },
        { id: "modificadoAl", nombre: $translate.instant("MODIFICADO") }
      ];

      // inicia configuración para los data table (grid)
      $scope.selected = [];

      // incializa el modelo para el filtro, ordenamiento y paginación
      $scope.query = {
        filter: "",
        order: "id",
        limit: 25,
        page: 1
      };

      // Evento para incializar el ordenamiento segun la columna clickeada
      $scope.onOrderChange = function(order) {
        $scope.query.order = order;
        $scope.cargando = true;
        $scope.init();
      };

      // Evento para el control del paginado.
      $scope.onPaginationChange = function(page, limit) {
        $scope.paginacion = {
          pag: (page - 1) * limit,
          lim: limit,
          paginas: 0
        };
        $scope.cargando = true;
        $scope.init();
      };

      //fin data
      $scope.paginacion = {
        pag: 1,
        lim: 25,
        paginas: 0
      };
      $scope.datos = [];

      $scope.dato = {};
      $scope.dato.foto = '';
      $scope.dato.permisos = [];
      $scope.dato.sis_usuarios_grupos = [];

      // muestra el menu para aquellos dispositivos que por su tamaño es oculto
      $scope.toggleMenu = function() {
        $mdSidenav("left").toggle();
      };

      $scope.url_base = URLS.BASE;
      $scope.url_etab = URLS.ETAB;
      $scope.menuAbierto = true;
      $scope.toggleSidenav = function () {
        $scope.menuAbierto = !$scope.menuAbierto;
        $scope.menuIsOpen = true;
        $mdSidenav("left").toggle();
      }

      // muestra el templete para cambiar el idioma
      $scope.mostrarIdiomas = function($event) {
        $mdBottomSheet.show({
          templateUrl: "src/app/views/idiomas.html",
          controller: "ListaIdiomasCtrl",
          targetEvent: $event
        });
      };

      // cierra la session para salir del Catalogo
      $scope.logout = function() {
        Auth.logout(function() {
          $location.path("signin");
        });
      };

      // redirecciona a la página que se le pase como parametro
      $scope.ir = function(path, fuera) {
        if (fuera == 1) {
          var a = document.createElement('a'); a.target = path.indexOf('http') > -1 ? "_blank" : "_self"; a.href = path.indexOf('http') > -1 ? path : URLS.BASE + path; a.click();
        } else {
          $scope.menuSelected = path;
          $location.path(path).search({ id: null });
        }
      };

      // evento para el boton nuevo, redirecciona a la vista nuevo
      $scope.nuevo = function() {
        var uri = $scope.url.split("/");

        uri = "/" + uri[1] + "/nuevo";
        $location.path(uri).search({ id: null });
      };

      $scope.showSearch = false;
      $scope.listaTemp = {};
      $scope.moduloName = $location
        .path()
        .split("/")[1]
        .toUpperCase();

      $scope.moduloAccion = $location.path().split("/")[2] ? $location
            .path()
            .split("/")[2]
            .toUpperCase() : "";
      $scope.mostrarSearch = function(t) {
        $scope.showSearch = !$scope.showSearch;
        if (t == 0) {
          $scope.listaTemp = $scope.datos;
        } else {
          $scope.buscar = "";
          $scope.datos = $scope.listaTemp;
        }
      };
     

      /**
       * @ngdoc method
       * @name Sistema.UsuarioCtrl#querySearch
       * @methodOf Sistema.UsuarioCtrl
       *
       * @description
       * Carga los datos para el autocomplete
       * @param {string} query valor para hacer la busqueda
       */

      $scope.querySearch = function(query) {
        var juris = $scope.dato.jurisdiccion;
        return $http
          .get(URLS.BASE_API + "Clues", {
            params: { jurisdiccion: juris, termino: query }
          })
          .then(function(res) {
            return res.data.data;
          });
      };

      /**
       * @ngdoc method
       * @name Sistema.UsuarioCtrl#selectedItemChange
       * @methodOf Sistema.UsuarioCtrl
       *
       * @description
       * Evento para cuando se selecciona un elemento del autocomplete
       * @param {objet} item objeto del elemento
       */

      $scope.selectedItemChange = function(item) {
        if (!angular.isUndefined(item)) {
          if (angular.isUndefined(item.clues))
            $scope.CluesUsuario(item.jurisdiccion);
          else $scope.CluesUsuario(item.clues);
        }
      };
      /**
       * Create filter function for a query string
       */
      function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(item) {
          return item.value.indexOf(lowercaseQuery) === 0;
        };
      }

      /**
       * @ngdoc method
       * @name Sistema.Usuario#cargarCatalogo
       * @methodOf Sistema.UsuarioCtrl
       *
       * @description
       * Carga los datos como catalago de la url
       * @param {string} url url para hacer la petición
       * @param {string} cat nombre del catalogo a crear
       */

      $scope.cargarCatalogo = function(url, modelo, callback) {
        listaOpcion.options(url).then(function(data) {
          data = data.data;
          if (data.status == "407") $window.location = "acceso";

          if (data.status == 200) {
            modelo.length = 0;
            angular.forEach(data.data, function(val, key) {
              modelo.push(val);
            });
            if (!angular.isUndefined(callback)) callback();
          } else {
            errorFlash.error(data);
          }
        });
      };

      // fin permiso
      //export PDF
      $scope.exportar = function() {
        $scope.generarExport("pdf");
      };

      //export EXCEL
      $scope.excel = function() {
        $scope.generarExport("xlsx");
      };
      $scope.generarExport = function(tipo) {
        $scope.btexcel = true;
        $scope.btexportar = true;

        var url = $scope.ruta;
        var json = { tabla: url, tipo: tipo };
        CrudDataApi.crear(
          "Export",
          json,
          function(data) {
            data = data.data;
            $scope.btexcel = false;
            $scope.btexportar = false;
            $window.open(URLS.BASE + "export." + tipo);
          },
          function(e) {
            e = e.data;
            errorFlash.error(e);
            $scope.cargando = false;
            $scope.btexcel = false;
            $scope.btexportar = false;
          }
        );
      };
      // inicializa las rutas para crear los href correspondientes en la vista actual
      $scope.index = function(ruta) {
        $scope.ruta = ruta;
        var uri = $scope.url;

        if (uri.search("nuevo") == -1) $scope.init();
      };

      // obtiene los datos necesarios para crear el grid (listado)// obtiene los datos necesarios para crear el grid (listado)
      $scope.init = function(buscar, columna) {
        var url = $scope.ruta;
        buscar = document.getElementById("buscar_lista") ? document.getElementById("buscar_lista").value : undefined;
        var pagina = $scope.paginacion.pag;
        var limite = $scope.paginacion.lim;

        var order = $scope.query.order;

        if (!angular.isUndefined(buscar))
          limite =
            limite +
            "&columna=" +
            columna +
            "&valor=" +
            buscar +
            "&buscar=true";

        CrudDataApi.lista(
          url + "?pagina=" + pagina + "&limite=" + limite + "&order=" + order,
          function(data) {
            data = data.data;
            if (data.status == "407") $window.location = "acceso";

            if (data.status == 200) {
              $scope.datos = data.data;
              $scope.paginacion.paginas = data.total;
            } else {
              errorFlash.error(data);
            }
            $scope.cargando = false;
          },
          function(e) {
            e = e.data;
            errorFlash.error(e);
            $scope.cargando = false;
          }
        );
      };

      // incia la busqueda con los parametros, columna = campo donde buscar, buscar = valor para la busqueda
      $scope.buscarL = function(buscar, columna) {
        $scope.cargando = true;
        $scope.init(buscar, columna);
      };

      //Ver. Muestra el detalle del id del recurso
      $scope.ver = function(ruta) {
        $scope.ruta = ruta;
        var url = $scope.ruta;
        var id = $stateParams.id;

        CrudDataApi.ver(
          url,
          id,
          function(data) {
            data = data.data;
            if (data.status == "407") $window.location = "acceso";

            if (data.status == 200) {
              $scope.id = data.data.id;

              var list = data.data.permissions;
              $scope.dato = data.data;
              for (var key in list) {
                $scope.datos.push(key);
              }
            } else {
              errorFlash.error(data);
            }
            $scope.cargando = false;
          },
          function(e) {
            e = e.data;
            errorFlash.error(e);
            $scope.cargando = false;
          }
        );
      };

      //Modificar. Actualiza el recurso con los datos que envia el usuario
      $scope.modificar = function(id) {
        var url = $scope.ruta;
        var json = $scope.dato;

        if (json) {
          CrudDataApi.editar(
            url,
            id,
            json,
            function(data) {
              data = data.data;
              if (data.status == "407") $window.location = "acceso";

              if (data.status == 200) {
                flash("success", data.messages);
                if (data.data.id == $scope.loggedUser.id){
                  UsuarioData.guardarPerfil(data.data);
                }
              } else {
                errorFlash.error(data);
              }
              $scope.cargando = false;
            },
            function(e) {
              e = e.data;
              errorFlash.error(e);
              $scope.cargando = false;
            }
          );
        }
      };

      $scope.borrar = function(id, index) {
        var scope = $scope;

        var confirm = $mdDialog
          .confirm()
          .title($translate.instant("CONFIRM_DELETE"))
          .textContent($translate.instant("CONFIRM_DELETE_TEXT"))
          .ariaLabel("Delete")
          .ok("Aceptar")
          .cancel("Cancelar");

        $mdDialog.show(confirm).then(
          function() {
            scope.eliminar(id, index);
          },
          function() {}
        );
      };

      //Borrar. Elimina el calidad del parametro id
      $scope.eliminar = function(id, $index) {
        var op = 1;
        if (angular.isUndefined(id)) {
          id = $stateParams.id;
          op = 0;
        }

        var url = $scope.ruta;
        $scope.cargando = true;

        CrudDataApi.eliminar(
          url,
          id,
          function(data) {
            data = data.data;
            if (data.status == "407") $window.location = "acceso";

            if (data.status == 200) {
              if (op == 1) $scope.datos.splice($index, 1);
              else angular.element("#lista").click();
              flash("success", data.messages);

              $scope.cargando = false;
            } else {
              errorFlash.error(data);
            }
            $scope.cargando = false;
          },
          function(e) {
            e = e.data;
            errorFlash.error(e);
            $scope.cargando = false;
          }
        );
      };

      // Guardar
      $scope.guardar = function(form) {
        var url = $scope.ruta;
        var json = $scope.dato;

        CrudDataApi.crear(
          url,
          json,
          function(data) {
            data = data.data;
            if (data.status == "407") $window.location = "acceso";

            if (data.status == 201) {
              $scope.dato = angular.copy($scope.limpio);
              form.$setPristine();
              form.$setUntouched();
              flash("success", data.messages);
              var uri = $scope.url.split("/");

              uri = "/" + uri[1] + "/modificar/" + data.data.id;
              $location.path(uri);
            } else {
              errorFlash.error(data);
            }
            $scope.cargando = false;
          },
          function(e) {
            e = e.data;
            errorFlash.error(e);
            $scope.cargando = false;
          }
        );
      };

      
      /**
		* @ngdoc method
		* @name Crud.CrudCtrl#includeArray
		* @methodOf Crud.CrudCtrl
		*
		* @description
		* agregar valores a un array y evita repeticiones	
        * @param {string} item valor a agregar
        * @param {object} modelo modelo donde se almacenara los resultados		
		*/
      $scope.includeArray = function (item) {
        var i = -1;
        angular.forEach($scope.dato.sis_usuarios_grupos, function (val, key) {
          
          if (val.sis_grupos_id == item.id){
            i = key;
          }
        });
        if (i > -1) {
          $scope.dato.sis_usuarios_grupos.splice(i, 1);
        } else {
          var gr = {
            id: item.id,
            sis_grupos_id: item.id
          };
          $scope.dato.sis_usuarios_grupos.push(gr);
        }
      }

      $scope.inArray = function (item) {
        var i = -1;
        angular.forEach($scope.dato.sis_usuarios_grupos, function (val, key) {
          if (val.sis_grupos_id == item.id) {
            i = key;
          }
        });
        if (i > -1) {
          return true;
        } else {
          return false;
        }
      }
      /**
   * Este método pide confirmacion para borra una imagen de un modelo
   * @param modelo Modelo donde guardaremos la cadena en base64 de la imagen
   * @param carpeta carpeta en la que se encuentra la imagen
   * @return void
   */
      $scope.borrarImagen = function(modelo, carpeta) {

        var scope = $scope;

        var confirm = $mdDialog
          .confirm()
          .title($translate.instant("CONFIRM_DELETE"))
          .textContent($translate.instant("CONFIRM_DELETE_TEXT"))
          .ariaLabel("Delete")
          .ok("Aceptar")
          .cancel("Cancelar");

        $mdDialog.show(confirm).then(
          function () {
            scope.eliminarImagen(modelo, carpeta);
          },
          function () { }
        );
      }
    /**
   * Este método borra una imagen de un modelo
   * @param modelo Modelo donde guardaremos la cadena en base64 de la imagen
   * @param carpeta carpeta en la que se encuentra la imagen
   * @return void
   */
      $scope.eliminarImagen = function(modelo, carpeta) {
        $scope.cargando = true;
        var foto = modelo;
        var url = "/subir-archivo/eliminar";
        var json = { 'file': foto, 'ruta': carpeta };
        CrudDataApi.crear(
          url,
          json,
          function (data) {
            data = data.data;
            if (data.status == "407") $window.location = "acceso";

            if (data.status == 200) {
              $scope.dato.foto = '';
              flash("success", data.messages);
              
            } else {
              errorFlash.error(data);
            }
            $scope.cargando = false;
          },
          function (e) {
            e = e.data;
            errorFlash.error(e);
            $scope.cargando = false;
          }
        );

      }



    });
})();
