/**
 * @ngdoc object
 * @name Sistema.GrupoCtrl
 * @description
 * Complemento del controlador CrudCtrl  para tareas especificas en Grupo
 */
(function() {
  "use strict";
  angular
    .module("App")
    .controller("GrupoCtrl", function(
      $rootScope,
      $translate,
      $scope,
      $localStorage,
      $stateParams,
      $mdSidenav,
      $mdDialog,
      $mdColorPalette,
      $location,
      $mdBottomSheet,
      Auth,
      Menu,
      $http,
      $window,
      $timeout,
      
      flash,
      errorFlash,
      UsuarioData,
      listaOpcion,
      CrudDataApi,
      URLS,
      recargarPermisos
    ) {
     
      $scope.loggedUser = UsuarioData.getDatosUsuario();

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
      /**
       * @ngdoc method
       * @name Sistema.GrupoCtrl#onOrderChange
       * @methodOf Sistema.GrupoCtrl
       *
       * @description
       * Evento para incializar el ordenamiento segun la columna clickeada
       * @param {string} order campo para el ordenamiento
       */
      $scope.onOrderChange = function(order) {
        $scope.query.order = order;
        $scope.cargando = true;
        $scope.init();
      };
      /**
       * @ngdoc method
       * @name Sistema.GrupoCtrl#onOrderChange
       * @methodOf Sistema.GrupoCtrl
       *
       * @description
       * Evento para el control del paginado.
       * @param {int} page pagina actual
       * @param {int} limit resultados por pagina
       */
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
      $scope.dato.permisos = [];
      $scope.permisos = [];

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
          var a = document.createElement("a");
          a.target = path.indexOf("http") > -1 ? "_blank" : "_self";
          a.href = path.indexOf("http") > -1 ? path : URLS.BASE + path;
          a.click();
        } else {
          $scope.menuSelected = path;
          $location.path(path).search({ id: null });
        }
      };

      /**
       * @ngdoc method
       * @name Sistema.GrupoCtrl#recargar
       * @methodOf Sistema.GrupoCtrl
       *
       * @description
       * Recarga los datos del modelo
       */
      $scope.recargar = function() {
        $scope.ver($scope.ruta);
      };

      /**
       * @ngdoc method
       * @name Sistema.GrupoCtrl#todosAccion
       * @methodOf Sistema.GrupoCtrl
       *
       * @description
       * Lena los permisos por modulo
       * @param {string} padre Nombre a donde se asigna
       * @param {object} accion Acciones a agregar
       * @param {int} valor Valor del elemento
       * @param {object} model modelo donde se almacenara los resultados
       */

      $scope.todosAccion = function(padre, accion, valor, modelo) {
        angular.forEach(accion, function(value, key) {
          if (valor == 0) {
            delete modelo[padre + "." + value.recurso];
          } else {
            modelo[padre + "." + value.recurso] = valor;
          }
        });
      };

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

      $scope.moduloAccion = $location.path().split("/")[2]
        ? $location
            .path()
            .split("/")[2]
            .toUpperCase()
        : "";
      /**
       * @ngdoc method
       * @name Sistema.GrupoCtrl#mostrarSearch
       * @methodOf Sistema.GrupoCtrl
       *
       * @description
       * Oculta o muestra la barra de busqueda en las vistas tipo lista.
       * @param {int} t bandera para regresar los datos antes de la busqueda
       */

      $scope.mostrarSearch = function(t) {
        $scope.showSearch = !$scope.showSearch;
        if (t == 0) {
          $scope.listaTemp = $scope.datos;
        } else {
          $scope.buscar = "";
          $scope.datos = $scope.listaTemp;
        }
      };

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
          "/Export",
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
      /**
       * @ngdoc method
       * @name Sistema.GrupoCtrl#index
       * @methodOf Sistema.GrupoCtrl
       *
       * @description
       * inicializa las rutas para crear los href correspondientes en la vista actual
       * @param {string} ruta ruta del módulo actual
       */

      $scope.index = function(ruta) {
        $scope.ruta = ruta;
        var uri = $scope.url;

        if (uri.search("nuevo") == -1) $scope.init();
      };

      /**
       * @ngdoc method
       * @name Sistema.GrupoCtrl#init
       * @methodOf Sistema.GrupoCtrl
       *
       * @description
       * obtiene los datos necesarios para crear el grid (listado) con ayuda del servicio CrudDataApi
       * @param {string} buscar contiene el texto a buscar en la base de datos
       * @param {string} columna contiene el nombre de la columna en donde hacer la busqueda
       */

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

        $scope.cargando = true;
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
      /**
       * @ngdoc method
       * @name Sistema.GrupoCtrl#buscarL
       * @methodOf Sistema.GrupoCtrl
       *
       * @description
       * incia la busqueda con los parametros, columna = campo donde buscar, buscar = valor para la busqueda
       * @param {string} buscar contiene el texto a buscar en la base de datos
       * @param {string} columna contiene el nombre de la columna en donde hacer la busqueda
       */

      $scope.buscarL = function(buscar, columna) {
        $scope.cargando = true;
        $scope.init(buscar, columna);
      };

      /**
       * @ngdoc method
       * @name Sistema.GrupoCtrl#querySearch
       * @methodOf Sistema.GrupoCtrl
       *
       * @description
       * Carga los datos para el autocomplete
       * @param {string} query valor para hacer la busqueda
       */

      $scope.querySearch = function(query) {
        var juris = $scope.dato.jurisdiccion;
        return $http
          .get(URLS.BASE_API + "/Clues", {
            params: { jurisdiccion: juris, termino: query }
          })
          .then(function(res) {
            return res.data.data;
          });
      };

      /**
       * @ngdoc method
       * @name Sistema.GrupoCtrl#selectedItemChange
       * @methodOf Sistema.GrupoCtrl
       *
       * @description
       * Evento para cuando se selecciona un elemento del autocomplete
       * @param {objet} item objeto del elemento
       */

      $scope.selectedItemChange = function(item, modelo) {
        if (!angular.isUndefined(item)) {
          if (angular.isUndefined(item.clues))
            $scope.agregarClues(item.jurisdiccion, modelo);
          else $scope.agregarClues(item.clues, modelo);
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
       * @name Sistema.GrupoCtrl#cambiarTipo
       * @methodOf Sistema.GrupoCtrl
       *
       * @description
       * Evento para cambiar el llenado del autocomplete por clues o por jurisdicción
       * @param {string} tipo valor
       */

      $scope.cambiarTipo = function(tipo) {
        if (tipo == "clues") $scope.repos = $scope.Clues;
        if (tipo == "jurisdiccion") $scope.repos = $scope.Jurisdiccion;
      };
      //fin autocomplete

      /**
       * @ngdoc method
       * @name Sistema.GrupoCtrl#cargarCatalogo
       * @methodOf Sistema.GrupoCtrl
       *
       * @description
       * Carga los datos como catalago de la url
       * @param {string} url url para hacer la petición
       * @param {string} modelo nombre del catalogo a crear
       */

      $scope.cargarCatalogo = function(url, modelo, callback) {
        CrudDataApi.lista(
          url,
          function(data) {
            data = data.data;
            if (data.status == "407") $window.location = "acceso";

            if (data.status == 200) {
              $scope.intento1 = 0;
              angular.forEach(data.data, function(value, key) {
                modelo.push(value);
                angular.forEach(value.hijos, function(val, k) {
                  $scope.permisos[val.controlador] = 0;
                });
              });
              if (!angular.isUndefined(callback)) callback();
            }
          },
          function(e) {
            setTimeout(function() {
              if ($scope.intento1 < 1) {
                $scope.cargarCatalogo(url, modelo, callback);
                $scope.intento1++;
              }
            }, 200);
          }
        );
      };

      /**
       * @ngdoc method
       * @name Sistema.GrupoCtrl#ver
       * @methodOf Sistema.GrupoCtrl
       *
       * @description
       * Muestra los datos del elemento que se le pase como parametro
       * @param {string} ruta contiene la ruta para hacer la petición a la api
       */

      $scope.color = {};
      $scope.ver = function(ruta) {
        $scope.ruta = ruta;
        var url = $scope.ruta;
        var id = $stateParams.id;
        $scope.cargando = true;
        CrudDataApi.ver(
          url,
          id,
          function(data) {
            data = data.data;
            if (data.status == "407") $window.location = "acceso";

            if (data.status == 200) {
              $scope.intento3 = 0;
              $scope.id = data.data.id;
              $scope.dato = data.data;
              if (!angular.isUndefined(data.data.permisos)) {
                var temp = JSON.parse(data.data.permisos);
                $scope.dato.permisos = [];
                angular.forEach(temp, function(value, key) {
                  $scope.dato.permisos[key] = value;
                });
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
      /**
       * @ngdoc method
       * @name Sistema.GrupoCtrl#modificar
       * @methodOf Sistema.GrupoCtrl
       *
       * @description
       * Actualiza el recurso con los datos que envia el usuario
       * @param {int} id contiene el identificador del elemento a modificar
       */

      $scope.modificar = function(id) {
        var url = $scope.ruta;
        if (!angular.isUndefined($scope.dato.permisos)) {
          var permisos = {};
          angular.extend(permisos, $scope.dato.permisos);
          $scope.dato.permisos = permisos;
        }
        var json = $scope.dato;
        if (json) {
          $scope.cargando = true;
          CrudDataApi.editar(
            url,
            id,
            json,
            function(data) {
              data = data.data;
              if (data.status == "407") $window.location = "acceso";

              if (data.status == 200) {
                flash("success", data.messages);
                recargarPermisos.cargarPermisos();
              } else {
                errorFlash.error(data);
              }
              $scope.cargando = false;
            },
            function(e) {
              errorFlash.error(e);
              $scope.cargando = false;
            }
          );
        }
      };

      /**
       * @ngdoc method
       * @name Sistema.GrupoCtrl#borrar
       * @methodOf Sistema.GrupoCtrl
       *
       * @description
       * Elimina el recurso especificado
       * @param {int} id contiene el identificador del elemento a eliminar
       * @param {int} $index contiene el identificador del elemento a quitar del moodelo en caso de que el evento se ejecute en un listado
       */

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
              if (op == 1) {
                $scope.datos.splice($index, 1);
              } else {
                angular.element("#lista").click();
              }
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

      /**
       * @ngdoc method
       * @name Sistema.GrupoCtrl#guardar
       * @methodOf Sistema.GrupoCtrl
       *
       * @description
       * Envia la petición para crear un nuevo registro con los datos especificados
       * @param {object} form para identificar el formulario que lanzo la petición para procesar los datos y limpiar el formulario una vez se reciba un mensaje de confirmacion de parte de la api
       */

      $scope.guardar = function(form) {
        var url = $scope.ruta;
        if (!angular.isUndefined($scope.dato.permisos)) {
          var permisos = {};
          angular.extend(permisos, $scope.dato.permisos);
          $scope.dato.permisos = permisos;
        }
        var json = $scope.dato;

        CrudDataApi.crear(
          url,
          json,
          function(data) {
            data = data.data;
            if (data.status == "407") $window.location = "acceso";

            if (data.status == 201) {
              recargarPermisos.cargarPermisos();
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
    });
})();
