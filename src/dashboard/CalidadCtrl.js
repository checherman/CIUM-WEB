/**
 * @ngdoc object
 * @name Dashboard.DashboardCtrl
 * @description
 * Manejo de los eventos del gráfico en el dashboard
 */
(function() {
  "use strict";

  angular
    .module("App")
    .controller("calidadController", function(
      $scope,
      $http,
      $window,
      $location,
      $timeout,
      flash,
      errorFlash,
      URLS,
      $mdDialog,
      $mdUtil,
      $mdSidenav,
      $translate,
      EvaluacionShow,
      EvaluacionId,
      CrudDataApi
    ) {
      $scope.calidadCalidad = true;

      $scope.datos = {};

      $scope.showModal = false;
      $scope.showModalCriterio = false;
      $scope.chart;
      $scope.vercalidadCalidad = "";
      $scope.dimension = [];
      $scope.datosOk = true;

      $scope.tempIndicador = [];
      $scope.toggle = function(item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) list.splice(idx, 1);
        else {
          list.push(item);
        }
      };
      //lenar los check box tipo array
      $scope.exists = function(item, list) {
        return list.indexOf(item) > -1;
      };
      $scope.dato_mapa = 1;
      $scope.CambiarTipoMapa = function(tipo) {
        $scope.dato_mapa = tipo;
      };
      $scope.cambiarVerTodoIndicador = function() {
        if ($scope.filtro.verTodosIndicadores) {
          $scope.filtro.indicador = [];
          $scope.chipIndicador = [];
          $scope.tempIndicador = [];
        }
      };
      $scope.cambiarVerTodoUM = function() {
        if ($scope.filtro.verTodosUM) {
          $scope.filtro.um = {};
          $scope.filtro.um.tipo = "municipio";
        }
      };

      $scope.cambiarVerTodoClues = function() {
        $scope.filtro.clues = [];
      };

      var d = new Date();
      $scope.opcion = true;

      $scope.filtro = {};
      $scope.filtro.tipo = "Calidad";
      $scope.filtro.visualizar = "tiempo";
      $scope.filtro.anio = d.getFullYear();
      $scope.filtro.um = {};
      $scope.filtro.um.tipo = "municipio";
      $scope.filtro.clues = [];
      $scope.mostrarCategoria = [];
      $scope.filtro.verTodosIndicadores = true;
      $scope.filtro.verTodosUM = true;
      $scope.filtro.verTodosClues = true;
      $scope.chipIndicador = [];
      $scope.filtros = {};
      $scope.filtros.activo = false;
      $scope.verInfo = false;
      //aplicar los filtros al area del grafico
      $scope.aplicarFiltro = function(avanzado, item) {
        $scope.filtros.activo = true;
        $scope.filtro.indicador = $scope.tempIndicador;
        if (!avanzado) {
          $scope.filtro.indicador = [];
          $scope.filtro.verTodosIndicadores = false;
          if ($scope.filtro.indicador.indexOf(item.codigo) == -1) {
            $scope.filtro.indicador.push(item.codigo);
            $scope.chipIndicador[item.codigo] = item;
          }
        }
        $scope.contador = 0;
        $scope.intento = 0;
        $scope.init();
        $mdSidenav("calidad").close();
      };
      $scope.contador = 0;

      //quitar los filtros seleccionados del dialog
      $scope.quitarFiltro = function(avanzado) {
        $scope.filtro.indicador = [];
        $scope.filtro.clues = [];
        $scope.filtro.um = {};
        $scope.filtro.um.tipo = "municipio";
        $scope.filtro.verTodosIndicadores = true;
        $scope.filtro.verTodosUM = true;
        $scope.filtros.activo = false;

        $scope.intento = 0;
        $scope.contador = 0;
        $scope.init();
        $mdSidenav("calidad").close();
      };

      // cerrar el dialog
      $scope.hide = function() {
        $mdDialog.hide();
      };
      //cambiar a pantalla completa
      $scope.isFullscreen = false;

      $scope.toggleFullScreen = function(e) {
        $scope.isFullscreen = !$scope.isFullscreen;
      };
      $scope.cargarFiltro = 0;
      $scope.toggleRightOpciones = function(navID) {
        $mdSidenav(navID)
          .toggle()
          .then(function() {
            if ($scope.cargarFiltro < 1) {
              $scope.getDimension("anio", 0);
              $scope.getDimension("month", 1);
              $scope.getDimension(
                "codigo,indicador,color, 'Calidad' as categoriaEvaluacion",
                2
              );
              $scope.getDimension("jurisdiccion", 3);
              $scope.getDimension("municipio", 4);
              $scope.getDimension("zona", 5);
              $scope.getDimension("cone", 6);
              $scope.cargarFiltro++;
            }
          });
      };
      $scope.cambiarAnio = function(anio) {
        $scope.filtro.bimestre = [];
        $scope.filtro.anio = anio;
        $scope.getDimension("month", 1);
        $scope.getDimension(
          "codigo,indicador,color, '" +
            $scope.filtro.tipo +
            "' as categoriaEvaluacion",
          2
        );
        $scope.getDimension("jurisdiccion", 3);
        $scope.getDimension("municipio", 4);
        $scope.getDimension("zona", 5);
        $scope.getDimension("cone", 6);
      };
      $scope.cambiarBimestre = function(bimestre) {
        $scope.filtro.bimestre = bimestre;
        $scope.getDimension(
          "codigo,indicador,color, '" +
            $scope.filtro.tipo +
            "' as categoriaEvaluacion",
          2
        );
        $scope.getDimension("jurisdiccion", 3);
        $scope.getDimension("municipio", 4);
        $scope.getDimension("zona", 5);
        $scope.getDimension("cone", 6);
      };
      $scope.cambiarCategoria = function() {
        $scope.getDimension(
          "codigo,indicador,color, '" +
            $scope.filtro.tipo +
            "' as categoriaEvaluacion",
          2
        );
      };

      $scope.intentoOpcion = 0;
      $scope.getDimension = function(nivel, c) {
        $scope.opcion = true;
        var url = "/calidadDimension";
        if ($scope.filtro.tipo == "Calidad") url = "/calidadDimension";
        $scope.datos[c] = [];
        CrudDataApi.lista(
          url + "?filtro=" + JSON.stringify($scope.filtro) + "&nivel=" + nivel,
          function(data) {
            data = data.data;
            $scope.datos[c] = data.data;
            $scope.opcion = false;
          },
          function(e) {
            if ($scope.intentoOpcion < 1) {
              $scope.getDimension(nivel, c);
              $scope.intentoOpcion++;
            }
            $scope.opcion = false;
          }
        );
      };

      // obtiene los datos necesarios para crear el grid (listado)
      $scope.intento = 0;
      $scope.init = function() {
        var url = "/calidad";

        $scope.calidad = true;
        CrudDataApi.lista(
          url + "?filtro=" + JSON.stringify($scope.filtro),
          function(data) {
            data = data.data;

            if (data.status == "407") $window.location = "acceso";
            $scope.data = data.data;
            console.log($scope.data);
            $scope.datos = data.datos;
            $scope.total = data.total;
            $scope.calidad = false;
            $scope.datosOk = true;
          },
          function(e) {
            if ($scope.intento < 1) {
              $scope.init();
              $scope.intento++;
            }
            $scope.calidad = false;
          }
        );
      };

      $scope.mostrarGrafica = true;

      $scope.options = {
        chart: {
          type: "lineChart",
          height: 450,
          margin: {
            top: 20,
            right: 20,
            bottom: 40,
            left: 55
          },
          x: function(d) {
            return d.x;
          },
          y: function(d) {
            return d.y / 100;
          },
          useInteractiveGuideline: true,
          dispatch: {
            stateChange: function(e) {
              console.log("stateChange");
            },
            changeState: function(e) {
              console.log("changeState");
            },
            tooltipShow: function(e) {
              console.log("tooltipShow");
            },
            tooltipHide: function(e) {
              console.log("tooltipHide");
            }
          },
          xAxis: {
            axisLabel: $translate.instant("TIEMPO"),
            tickFormat: function(d) {
              return d3.time.format("%Y-%m")(new Date(d));
            },
            showMaxMin: false,
            staggerLabels: true,
            axisLabelDistance: 30
          },
          yAxis: {
            axisLabel: $translate.instant("PORCENTAJE"),
            tickFormat: function(d) {
              return d3.format(",.1%")(d);
            },
            axisLabelDistance: 20
          },
          callback: function(chart) {
            console.log("!!! lineChart callback !!!");
          }
        }
      };

      $scope.init();
    });

  angular
    .module("App")
    .controller("pieCalidadController", function(
      $scope,
      $http,
      $window,
      $location,
      $timeout,
      flash,
      errorFlash,
      URLS,
      $mdDialog,
      $mdUtil,
      $translate,
      CrudDataApi,
      $filter,
      NgMap
    ) {
      $scope.pieCalidad = true;

      $scope.datos = {};

      $scope.showModal = false;
      $scope.showModalCriterio = false;
      $scope.chart;
      $scope.verpieCalidad = "";
      $scope.dimension = [];
      $scope.datosOk = true;

      $scope.tempIndicador = [];
      $scope.toggle = function(item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) list.splice(idx, 1);
        else {
          list.push(item);
        }
      };
      //lenar los check box tipo array
      $scope.exists = function(item, list) {
        return list.indexOf(item) > -1;
      };
      $scope.dato_mapa = 1;
      $scope.CambiarTipoMapa = function(tipo) {
        $scope.dato_mapa = tipo;
      };
      $scope.cambiarVerTodoIndicador = function() {
        if ($scope.filtro.verTodosIndicadores) {
          $scope.filtro.indicador = [];
          $scope.chipIndicador = [];
          $scope.tempIndicador = [];
        }
      };
      $scope.cambiarVerTodoUM = function() {
        if ($scope.filtro.verTodosUM) {
          $scope.filtro.um = {};
          $scope.filtro.um.tipo = "municipio";
        }
      };

      $scope.cambiarVerTodoClues = function() {
        $scope.filtro.clues = [];
      };

      var d = new Date();
      $scope.opcion = true;

      $scope.filtro = {};
      $scope.filtro.tipo = "Calidad";
      $scope.filtro.visualizar = "tiempo";
      $scope.filtro.anio = d.getFullYear();
      $scope.filtro.um = {};
      $scope.filtro.um.tipo = "municipio";
      $scope.filtro.clues = [];
      $scope.mostrarCategoria = [];
      $scope.filtro.verTodosIndicadores = true;
      $scope.filtro.verTodosUM = true;
      $scope.filtro.verTodosClues = true;
      $scope.chipIndicador = [];
      $scope.filtros = {};
      $scope.filtros.activo = false;
      $scope.verInfo = false;
      //aplicar los filtros al area del grafico
      $scope.aplicarFiltro = function(avanzado, item) {
        $scope.filtros.activo = true;
        $scope.filtro.indicador = $scope.tempIndicador;
        if (!avanzado) {
          $scope.filtro.indicador = [];
          $scope.filtro.verTodosIndicadores = false;
          if ($scope.filtro.indicador.indexOf(item.codigo) == -1) {
            $scope.filtro.indicador.push(item.codigo);
            $scope.chipIndicador[item.codigo] = item;
          }
        }
        $scope.contador = 0;
        $scope.intento = 0;
        $scope.init();
      };
      $scope.contador = 0;

      //quitar los filtros seleccionados del dialog
      $scope.quitarFiltro = function(avanzado) {
        $scope.filtro.indicador = [];
        $scope.filtro.clues = [];
        $scope.filtro.um = {};
        $scope.filtro.um.tipo = "municipio";
        $scope.filtro.verTodosIndicadores = true;
        $scope.filtro.verTodosUM = true;
        $scope.filtros.activo = false;

        $scope.intento = 0;
        $scope.contador = 0;
        $scope.init();
      };

      // cerrar el dialog
      $scope.hide = function() {
        $mdDialog.hide();
      };
      //cambiar a pantalla completa
      $scope.isFullscreen = false;

      $scope.toggleFullScreen = function(e) {
        $scope.isFullscreen = !$scope.isFullscreen;
      };
      $scope.cargarFiltro = 0;
      $scope.toggleRightOpciones = function(navID) {
        $scope.getDimension("anio", 0);
        $scope.getDimension("month", 1);
        $scope.getDimension(
          "codigo,indicador,color, 'Calidad' as categoriaEvaluacion",
          2
        );
        $scope.getDimension("jurisdiccion", 3);
        $scope.getDimension("municipio", 4);
        $scope.getDimension("zona", 5);
        $scope.getDimension("cone", 6);
        $scope.cargarFiltro++;
      };
      $scope.cambiarAnio = function(anio) {
        $scope.filtro.bimestre = [];
        $scope.filtro.anio = anio;
        $scope.getDimension("month", 1);
        $scope.getDimension(
          "codigo,indicador,color, '" +
            $scope.filtro.tipo +
            "' as categoriaEvaluacion",
          2
        );
        $scope.getDimension("jurisdiccion", 3);
        $scope.getDimension("municipio", 4);
        $scope.getDimension("zona", 5);
        $scope.getDimension("cone", 6);
      };
      $scope.cambiarBimestre = function(bimestre) {
        $scope.filtro.bimestre = bimestre;
        $scope.getDimension(
          "codigo,indicador,color, '" +
            $scope.filtro.tipo +
            "' as categoriaEvaluacion",
          2
        );
        $scope.getDimension("jurisdiccion", 3);
        $scope.getDimension("municipio", 4);
        $scope.getDimension("zona", 5);
        $scope.getDimension("cone", 6);
      };
      $scope.cambiarCategoria = function() {
        $scope.getDimension(
          "codigo,indicador,color, '" +
            $scope.filtro.tipo +
            "' as categoriaEvaluacion",
          2
        );
      };

      $scope.intentoOpcion = 0;
      $scope.getDimension = function(nivel, c) {
        $scope.opcion = true;
        var url = "/calidadDimension";
        if ($scope.filtro.tipo == "Calidad") url = "/calidadDimension";
        $scope.datos[c] = [];
        CrudDataApi.lista(
          url + "?filtro=" + JSON.stringify($scope.filtro) + "&nivel=" + nivel,
          function(data) {
            data = data.data;
            $scope.datos[c] = data.data;
            $scope.opcion = false;
          },
          function(e) {
            if ($scope.intentoOpcion < 1) {
              $scope.getDimension(nivel, c);
              $scope.intentoOpcion++;
            }
            $scope.opcion = false;
          }
        );
      };

      // obtiene los datos necesarios para crear el grid (listado)
      $scope.intento = 0;
      $scope.init = function() {
        var url = "/pieVisita";

        $scope.pieCalidad = true;
        $scope.clues_view = [];
        CrudDataApi.lista(
          url + "?filtro=" + JSON.stringify($scope.filtro),
          function(data) {
            data = data.data;
            if (data.status == "407") $window.location = "acceso";

            if (data.status == 200) {
              $scope.dato = data.data;
              $scope.visitado = data.visitado;
              $scope.no_visitado = data.no_visitado;
              $scope.total = data.total;
              $scope.anios = data.anio;
              $scope.pieCalidad = false;

              $scope.data = [
                {
                  key: $translate.instant("VISITADO"),
                  y: data.visitado
                },
                {
                  key: $translate.instant("NO-VISITADO"),
                  y: data.no_visitado
                }
              ];
            } else {
              $scope.pieCalidad = false;
              errorFlash.error(data);
            }
            $scope.pieCalidad = false;
          },
          function(e) {
            if ($scope.intento < 1) {
              $scope.init();
              $scope.intento++;
            }
            $scope.pieCalidad = false;
          }
        );
      };
      $scope.mostrarGrafica = "pie";
      $scope.init();

      $scope.pintar_mapa = function() {
        var vm = this;
        vm.dynMarkers = [];

        NgMap.getMap().then(function(map) {
          for (var i = 0; i < $scope.dato.length; i++) {
            var icono = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
            if ($scope.dato[i].visitado == 1) {
              icono = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";
            }
            var latLng = new google.maps.LatLng(
              $scope.dato[i].latitud,
              $scope.dato[i].longitud
            );
            vm.dynMarkers.push(
              new google.maps.Marker({
                position: latLng,
                icon: icono
              })
            );
          }
          vm.markerClusterer = new MarkerClusterer(map, vm.dynMarkers, {});
        });
      };
      $scope.options = {
        chart: {
          type: "pieChart",
          height: 500,
          x: function(d) {
            return d.key;
          },
          y: function(d) {
            return d.y;
          },
          showLabels: true,
          duration: 500,
          color: ["rgb(96, 240, 128)", "rgb(242, 98, 99)"],
          labelThreshold: 0.01,
          labelSunbeamLayout: true,
          legend: {
            margin: {
              top: 5,
              right: 35,
              bottom: 5,
              left: 0
            }
          }
        }
      };
    });

  angular
    .module("App")
    .controller("criterioCalidadController", function(
      $scope,
      $localStorage,
      $stateParams,
      $http,
      $window,
      $location,
      $timeout,
      flash,
      errorFlash,
      URLS,
      $mdDialog,
      $mdUtil,
      $translate,
      CrudDataApi
    ) {
      $scope.criterioCalidad = true;

      $scope.datos = {};

      $scope.showModal = false;
      $scope.showModalCriterio = false;
      $scope.chart;
      $scope.vercriterioCalidad = "";
      $scope.dimension = [];
      $scope.datosOk = true;

      $scope.tempIndicador = [];
      $scope.toggle = function(item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) list.splice(idx, 1);
        else {
          list.push(item);
        }
      };
      $scope.valorGuardado = [];
      $scope.getCriterioDetalle = function(ev, value) {
        $scope.indicadorSeleccionado = value;
        $scope.showDialog = $mdDialog;
        $scope.tipo = 0;
        delete $scope.filtro.valor;
        delete $scope.filtro.grado;
        var url = "/criterioDetalle";
        $scope.cargando = true;
        $scope.criterioDetalle = true;
        $scope.filtro.id = value.codigo;
        CrudDataApi.lista(
          url + "?filtro=" + JSON.stringify($scope.filtro),
          function(data) {
            data = data.data;
            if (data.status == "407") $window.location = "acceso";

            if (data.status == 200) {
              $scope.valorGuardado[0] = value;
              $scope.indicadorDetalle = data.data;
              $scope.criterioDetalle = false;

              $scope.showDialog.show({
                targetEvent: ev,
                scope: $scope.$new(),
                templateUrl:
                  "src/dashboard/views/dashboard/criterio-detalle.html",
                clickOutsideToClose: true
              });
              $scope.datosOk = true;
            } else {
              $scope.criterioDetalle = false;
              $scope.datosOk = false;
            }
            $scope.cargando = false;
            $scope.criterioDetalle = false;
          },
          function(e) {
            $scope.criterio = false;
            $scope.cargando = false;
          }
        );
      };
      $scope.criterioDetalle = false;
      $scope.tipo = 0;
      $scope.dimen = ["criterio", "jurisdiccion", "clues"];

      $scope.getCriterioDetalleClick2 = function(ev, value, tipo) {
        $scope.showDialog.show({
          targetEvent: ev,
          scope: $scope.$new(),
          templateUrl: "src/dashboard/views/dashboard/criterio-detalle.html",
          clickOutsideToClose: true
        });
        $scope.getCriterioDetalleClick(ev, value, tipo);
      };
      $scope.getCriterioDetalleClick = function(ev, value, tipo) {
        $scope.tipo = tipo;
        var url = "/criterioDetalle";
        $scope.criterioDetalle = true;
        $scope.filtro.id = $scope.indicadorSeleccionado.codigo;
        $scope.filtro.valor = $scope.filtro.valor + "|" + value;
        $scope.filtro.grado = tipo;

        angular.forEach($scope.valorGuardado, function(v, k) {
          if (k > tipo) {
            $scope.valorGuardado[k] = "";
            delete $scope.valorGuardado[k];
          }
        });
        CrudDataApi.lista(
          url + "?filtro=" + JSON.stringify($scope.filtro),
          function(data) {
            data = data.data;
            if (data.status == "407") $window.location = "acceso";

            if (data.status == 200) {
              $scope.valorGuardado[tipo] = value;
              $scope.indicadorDetalle = data.data;
            }
            $scope.criterioDetalle = false;
          },
          function(e) {
            $scope.criterioDetalle = false;
          }
        );
      };

      $scope.getCluesCriterios = function(ev, value, tipo) {
        $scope.filtro.valor = $scope.filtro.valor + "|" + value;
        $scope.filtro.grado = tipo;
        $scope.filtro.indicador = $scope.indicadorSeleccionado.codigo;
        var url = "/criterioDetalle";
        $scope.criterioDetalle = true;
        CrudDataApi.lista(
          url + "?filtro=" + JSON.stringify($scope.filtro),
          function(data) {
            data = data.data;
            if (data.status == "407") $window.location = "acceso";

            if (data.status == 200) {
              $scope.datoClues = data.data;
              $scope.editDialog = $mdDialog;
              $scope.editDialog.show({
                targetEvent: ev,
                scope: $scope.$new(),
                templateUrl:
                  "src/dashboard/views/dashboard/criterio-clues.html",
                clickOutsideToClose: true
              });
            } else {
              $scope.criterioDetalle = false;
              errorFlash.error(data);
            }
            $scope.criterioDetalle = false;
          },
          function(e) {
            e = e.data;
            errorFlash.error(e);
            $scope.criterioDetalle = false;
          }
        );
      };

      //lenar los check box tipo array
      $scope.exists = function(item, list) {
        return list.indexOf(item) > -1;
      };

      $scope.cambiarVerTodoIndicador = function() {
        if ($scope.filtro.verTodosIndicadores) {
          $scope.filtro.indicador = [];
          $scope.chipIndicador = [];
          $scope.tempIndicador = [];
        }
      };
      $scope.cambiarVerTodoUM = function() {
        if ($scope.filtro.verTodosUM) {
          $scope.filtro.um = {};
          $scope.filtro.um.tipo = "municipio";
        }
      };

      $scope.cambiarVerTodoClues = function() {
        $scope.filtro.clues = [];
      };

      var d = new Date();
      $scope.opcion = true;

      $scope.filtro = {};
      $scope.filtro.tipo = "Calidad";
      $scope.filtro.visualizar = "tiempo";
      $scope.filtro.anio = d.getFullYear();
      $scope.filtro.um = {};
      $scope.filtro.um.tipo = "municipio";
      $scope.filtro.clues = [];
      $scope.mostrarCategoria = [];
      $scope.filtro.verTodosIndicadores = true;
      $scope.filtro.verTodosUM = true;
      $scope.filtro.verTodosClues = true;
      $scope.chipIndicador = [];
      $scope.filtros = {};
      $scope.filtros.activo = false;
      $scope.verInfo = false;
      $scope.filtro.estricto = false;
      $scope.filtro.valor = "";

      //aplicar los filtros al area del grafico
      $scope.aplicarFiltro = function(avanzado, item) {
        $scope.filtros.activo = true;
        $scope.filtro.indicador = $scope.tempIndicador;
        if (!avanzado) {
          $scope.filtro.indicador = [];
          $scope.filtro.verTodosIndicadores = false;
          if ($scope.filtro.indicador.indexOf(item.codigo) == -1) {
            $scope.filtro.indicador.push(item.codigo);
            $scope.chipIndicador[item.codigo] = item;
          }
        }
        $scope.contador = 0;
        $scope.intento = 0;
        $scope.init();
      };
      $scope.contador = 0;

      //quitar los filtros seleccionados del dialog
      $scope.quitarFiltro = function(avanzado) {
        $scope.filtro.indicador = [];
        $scope.filtro.clues = [];
        $scope.filtro.um = {};
        $scope.filtro.um.tipo = "municipio";
        $scope.filtro.verTodosIndicadores = true;
        $scope.filtro.verTodosUM = true;
        $scope.filtros.activo = false;

        $scope.intento = 0;
        $scope.contador = 0;
        $scope.init();
      };

      // cerrar el dialog
      $scope.hide = function() {
        $mdDialog.hide();
      };
      //cambiar a pantalla completa
      $scope.isFullscreen = false;

      $scope.toggleFullScreen = function(e) {
        $scope.isFullscreen = !$scope.isFullscreen;
      };
      $scope.cargarFiltro = 0;
      $scope.toggleRightOpciones = function(navID) {
        if ($scope.cargarFiltro < 1) {
          $scope.getDimension("anio", 0);
          $scope.getDimension("month", 1);
          $scope.getDimension(
            "codigo,indicador,color, '" +
              $scope.filtro.tipo +
              "' as categoriaEvaluacion",
            2
          );
          $scope.getDimension("jurisdiccion", 3);
          $scope.getDimension("municipio", 4);
          $scope.getDimension("zona", 5);
          $scope.getDimension("cone", 6);
          $scope.cargarFiltro++;
        }
      };
      $scope.cambiarAnio = function(anio) {
        $scope.filtro.bimestre = [];
        $scope.filtro.anio = anio;
        $scope.getDimension("month", 1);
        $scope.getDimension(
          "codigo,indicador,color, '" +
            $scope.filtro.tipo +
            "' as categoriaEvaluacion",
          2
        );
        $scope.getDimension("jurisdiccion", 3);
        $scope.getDimension("municipio", 4);
        $scope.getDimension("zona", 5);
        $scope.getDimension("cone", 6);
      };
      $scope.cambiarBimestre = function(bimestre) {
        $scope.filtro.bimestre = bimestre;
        $scope.getDimension(
          "codigo,indicador,color, '" +
            $scope.filtro.tipo +
            "' as categoriaEvaluacion",
          2
        );
        $scope.getDimension("jurisdiccion", 3);
        $scope.getDimension("municipio", 4);
        $scope.getDimension("zona", 5);
        $scope.getDimension("cone", 6);
      };
      $scope.cambiarCategoria = function() {
        $scope.getDimension(
          "codigo,indicador,color, '" +
            $scope.filtro.tipo +
            "' as categoriaEvaluacion",
          2
        );
      };

      $scope.intentoOpcion = 0;
      $scope.getDimension = function(nivel, c) {
        $scope.opcion = true;
        var url = "/calidadDimension";
        if ($scope.filtro.tipo == "Calidad") url = "/calidadDimension";
        $scope.datos[c] = [];
        CrudDataApi.lista(
          url + "?filtro=" + JSON.stringify($scope.filtro) + "&nivel=" + nivel,
          function(data) {
            data = data.data;
            $scope.datos[c] = data.data;
            $scope.opcion = false;
          },
          function(e) {
            if ($scope.intentoOpcion < 1) {
              $scope.getDimension(nivel, c);
              $scope.intentoOpcion++;
            }
            $scope.opcion = false;
          }
        );
      };

      // obtiene los datos necesarios para crear el grid (listado)
      $scope.intento = 0;
      $scope.init = function() {
        var url = "/criterioDash";
        if ($scope.filtro.estricto) url = "/criterioEstricto";

        $scope.criterioDetalle = true;
        CrudDataApi.lista(
          url + "?filtro=" + JSON.stringify($scope.filtro),
          function(data) {
            data = data.data;
            if (data.status == "407") $window.location = "acceso";

            if (data.status == 200) {
              $scope.dato = data.data;
              $scope.total = data.total;
              $scope.anios = data.anio;
              $scope.criterioDetalle = false;
              $scope.datosOk = true;
            } else {
              $scope.criterioDetalle = false;
              $scope.datosOk = false;
            }
            $scope.criterioDetalle = false;
          },
          function(e) {
            if ($scope.intento < 1) {
              $scope.init();
              $scope.intento++;
            }
            $scope.criterioDetalle = false;
          }
        );
      };
      $scope.init();
    });
  // fin criterios

  angular
    .module("App")
    .controller("alertaCalidadController", function(
      $scope,
      $localStorage,
      $stateParams,
      $http,
      $window,
      $location,
      $timeout,
      flash,
      errorFlash,
      URLS,
      $mdDialog,
      $mdUtil,
      $translate,
      CrudDataApi
    ) {
      $scope.alertaCalidad = true;

      $scope.datos = {};

      $scope.showModal = false;
      $scope.showModalCriterio = false;
      $scope.chart;
      $scope.veralertaCalidad = "";
      $scope.dimension = [];
      $scope.datosOk = true;

      $scope.tempIndicador = [];
      $scope.toggle = function(item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) list.splice(idx, 1);
        else {
          list.push(item);
        }
      };
      $scope.valorGuardado = [];
      $scope.getAlertaDetalle = function(ev, value) {
        $scope.indicadorSeleccionado = value;
        $scope.showDialog = $mdDialog;
        $scope.tipo = 0;
        delete $scope.filtro.jurisdiccion;
        delete $scope.filtro.cone;
        var url = "/alertaDetalle";
        $scope.cargando = true;
        $scope.alertaCalidad = true;
        $scope.filtro.id = value.codigo;
        CrudDataApi.lista(
          url + "?filtro=" + JSON.stringify($scope.filtro),
          function(data) {
            data = data.data;
            if (data.status == "407") $window.location = "acceso";

            if (data.status == 200) {
              $scope.indicadorDetalle = data.data;
              $scope.alertaCalidad = false;

              $scope.showDialog.show({
                targetEvent: ev,
                scope: $scope.$new(),
                templateUrl: "src/dashboard/views/alerta_detalle.html",
                clickOutsideToClose: true
              });
              $scope.datosOk = true;
            } else {
              $scope.alertaCalidad = false;
              $scope.datosOk = false;
            }
            $scope.cargando = false;
            $scope.alertaCalidad = false;
          },
          function(e) {
            $scope.alerta = false;
            $scope.cargando = false;
          }
        );
      };
      $scope.alertaDetalle = false;
      $scope.tipo = 0;
      $scope.dimen = ["jurisdiccion", "municipio", "cone"];

      $scope.getAlertaDetalleClick = function(ev, jurisdiccion, cone) {
        var url = "/alertaDetalle";
        $scope.alertaDetalle = true;
        $scope.filtro.id = $scope.indicadorSeleccionado.codigo;
        $scope.filtro.jurisdiccion = jurisdiccion;
        $scope.filtro.cone = cone;

        CrudDataApi.lista(
          url + "?filtro=" + JSON.stringify($scope.filtro),
          function(data) {
            data = data.data;
            if (data.status == "407") $window.location = "acceso";

            if (data.status == 200) {
              $scope.indicadorDetalle = data.data;
            }
            $scope.alertaDetalle = false;
          },
          function(e) {
            $scope.alertaDetalle = false;
          }
        );
      };

      //lenar los check box tipo array
      $scope.exists = function(item, list) {
        return list.indexOf(item) > -1;
      };

      $scope.cambiarVerTodoIndicador = function() {
        if ($scope.filtro.verTodosIndicadores) {
          $scope.filtro.indicador = [];
          $scope.chipIndicador = [];
          $scope.tempIndicador = [];
        }
      };
      $scope.cambiarVerTodoUM = function() {
        if ($scope.filtro.verTodosUM) {
          $scope.filtro.um = {};
          $scope.filtro.um.tipo = "municipio";
        }
      };

      $scope.cambiarVerTodoClues = function() {
        $scope.filtro.clues = [];
      };

      var d = new Date();
      $scope.opcion = true;

      $scope.filtro = {};
      $scope.filtro.tipo = "Calidad";
      $scope.filtro.visualizar = "tiempo";
      $scope.filtro.anio = d.getFullYear();
      $scope.filtro.um = {};
      $scope.filtro.um.tipo = "municipio";
      $scope.filtro.clues = [];
      $scope.mostrarCategoria = [];
      $scope.filtro.verTodosIndicadores = true;
      $scope.filtro.verTodosUM = true;
      $scope.filtro.verTodosClues = true;
      $scope.chipIndicador = [];
      $scope.filtros = {};
      $scope.filtros.activo = false;
      $scope.verInfo = false;
      $scope.filtro.estricto = false;

      //aplicar los filtros al area del grafico
      $scope.aplicarFiltro = function(avanzado, item) {
        $scope.filtros.activo = true;
        $scope.filtro.indicador = $scope.tempIndicador;
        if (!avanzado) {
          $scope.filtro.indicador = [];
          $scope.filtro.verTodosIndicadores = false;
          if ($scope.filtro.indicador.indexOf(item.codigo) == -1) {
            $scope.filtro.indicador.push(item.codigo);
            $scope.chipIndicador[item.codigo] = item;
          }
        }
        $scope.contador = 0;
        $scope.intento = 0;
        $scope.init();
      };
      $scope.contador = 0;

      //quitar los filtros seleccionados del dialog
      $scope.quitarFiltro = function(avanzado) {
        $scope.filtro.indicador = [];
        $scope.filtro.clues = [];
        $scope.filtro.um = {};
        $scope.filtro.um.tipo = "municipio";
        $scope.filtro.verTodosIndicadores = true;
        $scope.filtro.verTodosUM = true;
        $scope.filtros.activo = false;

        $scope.intento = 0;
        $scope.contador = 0;
        $scope.init();
      };

      // cerrar el dialog
      $scope.hide = function() {
        $mdDialog.hide();
      };
      //cambiar a pantalla completa
      $scope.isFullscreen = false;

      $scope.toggleFullScreen = function(e) {
        $scope.isFullscreen = !$scope.isFullscreen;
      };
      $scope.cargarFiltro = 0;
      $scope.toggleRightOpciones = function(navID) {
        if ($scope.cargarFiltro < 1) {
          $scope.getDimension("anio", 0);
          $scope.getDimension("month", 1);
          $scope.getDimension(
            "codigo,indicador,color, '" +
              $scope.filtro.tipo +
              "' as categoriaEvaluacion",
            2
          );
          $scope.getDimension("jurisdiccion", 3);
          $scope.getDimension("municipio", 4);
          $scope.getDimension("zona", 5);
          $scope.getDimension("cone", 6);
          $scope.cargarFiltro++;
        }
      };
      $scope.cambiarAnio = function(anio) {
        $scope.filtro.bimestre = [];
        $scope.filtro.anio = anio;
        $scope.getDimension("month", 1);
        $scope.getDimension(
          "codigo,indicador,color, '" +
            $scope.filtro.tipo +
            "' as categoriaEvaluacion",
          2
        );
        $scope.getDimension("jurisdiccion", 3);
        $scope.getDimension("municipio", 4);
        $scope.getDimension("zona", 5);
        $scope.getDimension("cone", 6);
      };
      $scope.cambiarBimestre = function(bimestre) {
        $scope.filtro.bimestre = bimestre;
        $scope.getDimension(
          "codigo,indicador,color, '" +
            $scope.filtro.tipo +
            "' as categoriaEvaluacion",
          2
        );
        $scope.getDimension("jurisdiccion", 3);
        $scope.getDimension("municipio", 4);
        $scope.getDimension("zona", 5);
        $scope.getDimension("cone", 6);
      };
      $scope.cambiarCategoria = function() {
        $scope.getDimension(
          "codigo,indicador,color, '" +
            $scope.filtro.tipo +
            "' as categoriaEvaluacion",
          2
        );
      };

      $scope.intentoOpcion = 0;
      $scope.getDimension = function(nivel, c) {
        $scope.opcion = true;
        var url = "/calidadDimension";
        if ($scope.filtro.tipo == "Calidad") url = "/calidadDimension";
        $scope.datos[c] = [];
        CrudDataApi.lista(
          url + "?filtro=" + JSON.stringify($scope.filtro) + "&nivel=" + nivel,
          function(data) {
            data = data.data;
            $scope.datos[c] = data.data;
            $scope.opcion = false;
          },
          function(e) {
            if ($scope.intentoOpcion < 1) {
              $scope.getDimension(nivel, c);
              $scope.intentoOpcion++;
            }
            $scope.opcion = false;
          }
        );
      };

      // obtiene los datos necesarios para crear el grid (listado)
      $scope.intento = 0;
      $scope.init = function() {
        var url = "/alertaDash";
        if ($scope.filtro.estricto) url = "/alertaEstricto";

        $scope.alertaCalidad = true;
        CrudDataApi.lista(
          url + "?filtro=" + JSON.stringify($scope.filtro),
          function(data) {
            data = data.data;
            if (data.status == "407") $window.location = "acceso";

            if (data.status == 200) {
              $scope.dato = data.data;
              $scope.total = data.total;
              $scope.anios = data.anio;
              $scope.alertaCalidad = false;
              $scope.datosOk = true;
            } else {
              $scope.alertaCalidad = false;
              $scope.datosOk = false;
            }
            $scope.alertaCalidad = false;
          },
          function(e) {
            if ($scope.intento < 1) {
              $scope.init();
              $scope.intento++;
            }
            $scope.alertaCalidad = false;
          }
        );
      };
      $scope.init();
    });

  angular
    .module("App")
    .controller("globalCalidadController", function(
      $scope,
      $http,
      $window,
      $location,
      $timeout,
      flash,
      errorFlash,
      URLS,
      $mdDialog,
      $mdUtil,
      $translate,
      CrudDataApi
    ) {
      $scope.globalCalidad = true;

      $scope.datos = {};

      $scope.showModal = false;
      $scope.showModalCriterio = false;
      $scope.chart;
      $scope.verGlobalCalidad = "";
      $scope.dimension = [];
      $scope.datosOk = true;

      $scope.tempIndicador = [];
      $scope.toggle = function(item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) list.splice(idx, 1);
        else {
          list.push(item);
        }
      };
      //lenar los check box tipo array
      $scope.exists = function(item, list) {
        return list.indexOf(item) > -1;
      };

      $scope.cambiarVerTodoIndicador = function() {
        if ($scope.filtro.verTodosIndicadores) {
          $scope.filtro.indicador = [];
          $scope.chipIndicador = [];
          $scope.tempIndicador = [];
        }
      };
      $scope.cambiarVerTodoUM = function() {
        if ($scope.filtro.verTodosUM) {
          $scope.filtro.um = {};
          $scope.filtro.um.tipo = "municipio";
        }
      };

      $scope.cambiarVerTodoClues = function() {
        $scope.filtro.clues = [];
      };

      $scope.showAlert = function(ev) {
        $mdDialog.show(
          $mdDialog
            .alert()
            .parent(angular.element(document.getElementById("principal")))
            .title($translate.instant("TITULO_DIALOG"))
            .content($translate.instant("MENSAJE_DIALOG"))
            .ariaLabel("info")
            .ok("Ok")
            .targetEvent(ev)
        );
      };

      var d = new Date();
      $scope.opcion = true;
      $scope.catVisible = false;

      $scope.filtro = {};
      $scope.filtro.top = 5;
      $scope.mostrarTop = [];
      $scope.mostrarTop["TOP_MAS"] = true;
      $scope.mostrarTop["TOP_MENOS"] = true;
      $scope.filtro.tipo = "Calidad";
      $scope.filtro.visualizar = "tiempo";
      $scope.filtro.anio = d.getFullYear();
      $scope.filtro.um = {};
      $scope.filtro.um.tipo = "municipio";
      $scope.filtro.clues = [];
      $scope.mostrarCategoria = [];
      $scope.filtro.verTodosIndicadores = true;
      $scope.filtro.verTodosUM = true;
      $scope.filtro.verTodosClues = true;
      $scope.chipIndicador = [];
      $scope.filtros = {};
      $scope.filtros.activo = false;
      $scope.verInfo = false;

      $scope.valorMostrarTop = 0;
      $scope.cambiarVistaTop = function(valor) {
        if (valor == 1) {
          $scope.mostrarTop["TOP_MAS"] = true;
          $scope.mostrarTop["TOP_MENOS"] = false;
        }
        if (valor == 2) {
          $scope.mostrarTop["TOP_MAS"] = false;
          $scope.mostrarTop["TOP_MENOS"] = true;
        }
        if (valor == 0) {
          $scope.mostrarTop["TOP_MAS"] = true;
          $scope.mostrarTop["TOP_MENOS"] = true;
        }
      };
      //aplicar los filtros al area del grafico
      $scope.aplicarFiltro = function(avanzado, item) {
        $scope.filtros.activo = true;
        $scope.filtro.indicador = $scope.tempIndicador;
        if (!avanzado) {
          $scope.filtro.indicador = [];
          $scope.filtro.verTodosIndicadores = false;
          if ($scope.filtro.indicador.indexOf(item.codigo) == -1) {
            $scope.filtro.indicador.push(item.codigo);
            $scope.chipIndicador[item.codigo] = item;
          }
        }
        $scope.contador = 0;
        $scope.intento = 0;
        $scope.init();
        if (
          ($scope.filtro.visualizar == "parametro") &
          ($scope.filtro.um.nivel == "clues")
        ) {
          $scope.verInfo = true;
          $scope.showAlert();
        }
      };
      $scope.contador = 0;

      //quitar los filtros seleccionados del dialog
      $scope.quitarFiltro = function(avanzado) {
        $scope.filtro.indicador = [];
        $scope.filtro.clues = [];
        $scope.filtro.um = {};
        $scope.filtro.um.tipo = "municipio";
        $scope.filtro.verTodosIndicadores = true;
        $scope.filtro.verTodosUM = true;
        $scope.filtros.activo = false;

        $scope.intento = 0;
        $scope.contador = 0;
        $scope.init();
      };

      // cerrar el dialog
      $scope.hide = function() {
        $mdDialog.hide();
      };
      //cambiar a pantalla completa
      $scope.isFullscreen = false;

      $scope.toggleFullScreen = function(e) {
        $scope.isFullscreen = !$scope.isFullscreen;
      };
      $scope.cargarFiltro = 0;
      $scope.toggleRightOpciones = function(navID) {
        $scope.catVisible = false;

        if ($scope.cargarFiltro < 1) {
          $scope.getDimension("anio", 0);
          $scope.getDimension("month", 1);
          $scope.getDimension(
            "codigo,indicador,color, '" +
              $scope.filtro.tipo +
              "' as categoriaEvaluacion",
            2
          );
          $scope.getDimension("jurisdiccion", 3);
          $scope.getDimension("municipio", 4);
          $scope.getDimension("zona", 5);
          $scope.getDimension("cone", 6);
          $scope.cargarFiltro++;
        }
      };
      $scope.cambiarAnio = function(anio) {
        $scope.filtro.bimestre = [];
        $scope.filtro.anio = anio;
        $scope.getDimension("month", 1);
        $scope.getDimension(
          "codigo,indicador,color, '" +
            $scope.filtro.tipo +
            "' as categoriaEvaluacion",
          2
        );
        $scope.getDimension("jurisdiccion", 3);
        $scope.getDimension("municipio", 4);
        $scope.getDimension("zona", 5);
        $scope.getDimension("cone", 6);
      };
      $scope.cambiarBimestre = function(bimestre) {
        $scope.filtro.bimestre = bimestre;
        $scope.getDimension(
          "codigo,indicador,color, '" +
            $scope.filtro.tipo +
            "' as categoriaEvaluacion",
          2
        );
        $scope.getDimension("jurisdiccion", 3);
        $scope.getDimension("municipio", 4);
        $scope.getDimension("zona", 5);
        $scope.getDimension("cone", 6);
      };
      $scope.cambiarCategoria = function() {
        $scope.getDimension(
          "codigo,indicador,color, '" +
            $scope.filtro.tipo +
            "' as categoriaEvaluacion",
          2
        );
      };

      $scope.intentoOpcion = 0;
      $scope.getDimension = function(nivel, c) {
        $scope.opcion = true;
        var url = "/calidadDimension";
        $scope.datos[c] = [];
        CrudDataApi.lista(
          url + "?filtro=" + JSON.stringify($scope.filtro) + "&nivel=" + nivel,
          function(data) {
            data = data.data;
            $scope.datos[c] = data.data;
            $scope.opcion = false;
          },
          function(e) {
            if ($scope.intentoOpcion < 1) {
              $scope.getDimension(nivel, c);
              $scope.intentoOpcion++;
            }
            $scope.opcion = false;
          }
        );
      };

      // obtiene los datos necesarios para crear el grid (listado)
      $scope.intento = 0;
      $scope.init = function() {
        var url = "/TopCalidadGlobal";

        $scope.globalCalidad = true;
        CrudDataApi.lista(
          url + "?filtro=" + JSON.stringify($scope.filtro),
          function(data) {
            data = data.data;
            if (data.status == "407") $window.location = "acceso";

            if (!angular.isUndefined(data.data.TOP_MAS)) {
              $scope.indicadores = data.indicadores;
              $scope.dato = data.data;
              $scope.total = data.total;
              $scope.anios = data.anio;
              $scope.globalCalidad = false;
            } else {
              $scope.globalCalidad = false;
              $scope.datosOk = false;
            }
            $scope.globalCalidad = false;
          },
          function(e) {
            if ($scope.intento < 1) {
              $scope.init();
              $scope.intento++;
            }
            $scope.globalCalidad = false;
          }
        );
      };
      $scope.init();
    });

  angular
    .module("App")
    .controller("gaugeCalidadController", function(
      $scope,
      $http,
      $window,
      $location,
      $timeout,
      flash,
      errorFlash,
      URLS,
      $mdDialog,
      $mdUtil,
      $translate,
      CrudDataApi
    ) {
      $scope.gaugeCalidad = true;

      $scope.datos = {};

      $scope.showModal = false;
      $scope.showModalCriterio = false;
      $scope.chart;
      $scope.verGaugeCalidad = "";
      $scope.dimension = [];
      $scope.datosOk = true;

      $scope.tempIndicador = [];
      $scope.toggle = function(item, list) {
        var idx = list.indexOf(item);
        if (idx > -1) list.splice(idx, 1);
        else {
          list.push(item);
        }
      };
      //lenar los check box tipo array
      $scope.exists = function(item, list) {
        return list.indexOf(item) > -1;
      };

      $scope.cambiarVerTodoIndicador = function() {
        if ($scope.filtro.verTodosIndicadores) {
          $scope.filtro.indicador = [];
          $scope.chipIndicador = [];
          $scope.tempIndicador = [];
        }
      };
      $scope.cambiarVerTodoUM = function() {
        if ($scope.filtro.verTodosUM) {
          $scope.filtro.um = {};
          $scope.filtro.um.tipo = "municipio";
        }
      };

      $scope.cambiarVerTodoClues = function() {
        $scope.filtro.clues = [];
      };

      var d = new Date();
      $scope.opcion = true;

      $scope.filtro = {};
      $scope.filtro.tipo = "Calidad";
      $scope.filtro.visualizar = "tiempo";
      $scope.filtro.anio = d.getFullYear();
      $scope.filtro.um = {};
      $scope.filtro.um.tipo = "municipio";
      $scope.filtro.clues = [];
      $scope.mostrarCategoria = [];
      $scope.filtro.verTodosIndicadores = true;
      $scope.filtro.verTodosUM = true;
      $scope.filtro.verTodosClues = true;
      $scope.chipIndicador = [];
      $scope.filtros = {};
      $scope.filtros.activo = false;
      $scope.verInfo = false;
      $scope.indicadores = [];
      $scope.filtro.estricto = false;
      //aplicar los filtros al area del grafico
      $scope.aplicarFiltro = function(avanzado, item) {
        $scope.filtros.activo = true;
        $scope.filtro.indicador = $scope.tempIndicador;
        if (!avanzado) {
          $scope.filtro.indicador = [];
          $scope.filtro.verTodosIndicadores = false;
          if ($scope.filtro.indicador.indexOf(item.codigo) == -1) {
            $scope.filtro.indicador.push(item.codigo);
            $scope.chipIndicador[item.codigo] = item;
          }
        }
        $scope.contador = 0;
        $scope.intento = 0;
        $scope.init();
      };
      $scope.contador = 0;

      //quitar los filtros seleccionados del dialog
      $scope.quitarFiltro = function(avanzado) {
        $scope.filtro.indicador = [];
        $scope.filtro.clues = [];
        $scope.filtro.um = {};
        $scope.filtro.um.tipo = "municipio";
        $scope.filtro.verTodosIndicadores = true;
        $scope.filtro.verTodosUM = true;
        $scope.filtros.activo = false;

        $scope.intento = 0;
        $scope.contador = 0;
        $scope.init();
      };

      // cerrar el dialog
      $scope.hide = function() {
        $mdDialog.hide();
      };
      //cambiar a pantalla completa
      $scope.isFullscreen = false;

      $scope.toggleFullScreen = function(e) {
        $scope.isFullscreen = !$scope.isFullscreen;
      };
      $scope.cargarFiltro = 0;
      $scope.toggleRightOpciones = function(navID) {
        if ($scope.cargarFiltro < 1) {
          $scope.getDimension("anio", 0);
          $scope.getDimension("month", 1);
          $scope.getDimension(
            "codigo,indicador,color, '" +
              $scope.filtro.tipo +
              "' as categoriaEvaluacion",
            2
          );
          $scope.getDimension("jurisdiccion", 3);
          $scope.getDimension("municipio", 4);
          $scope.getDimension("zona", 5);
          $scope.getDimension("cone", 6);
          $scope.cargarFiltro++;
        }
      };
      $scope.cambiarAnio = function(anio) {
        $scope.filtro.bimestre = [];
        $scope.filtro.anio = anio;
        $scope.getDimension("month", 1);
        $scope.getDimension(
          "codigo,indicador,color, '" +
            $scope.filtro.tipo +
            "' as categoriaEvaluacion",
          2
        );
        $scope.getDimension("jurisdiccion", 3);
        $scope.getDimension("municipio", 4);
        $scope.getDimension("zona", 5);
        $scope.getDimension("cone", 6);
      };
      $scope.cambiarBimestre = function(bimestre) {
        $scope.filtro.bimestre = bimestre;
        $scope.getDimension(
          "codigo,indicador,color, '" +
            $scope.filtro.tipo +
            "' as categoriaEvaluacion",
          2
        );
        $scope.getDimension("jurisdiccion", 3);
        $scope.getDimension("municipio", 4);
        $scope.getDimension("zona", 5);
        $scope.getDimension("cone", 6);
      };

      $scope.intentoOpcion = 0;
      $scope.getDimension = function(nivel, c) {
        $scope.opcion = true;
        var url = "/calidadDimension";
        $scope.datos[c] = [];
        CrudDataApi.lista(
          url + "?filtro=" + JSON.stringify($scope.filtro) + "&nivel=" + nivel,
          function(data) {
            data = data.data;
            $scope.datos[c] = data.data;
            $scope.opcion = false;
          },
          function(e) {
            if ($scope.intentoOpcion < 1) {
              $scope.getDimension(nivel, c);
              $scope.intentoOpcion++;
            }
            $scope.opcion = false;
          }
        );
      };

      // obtiene los datos necesarios para crear el grid (listado)
      $scope.intento = 0;
      $scope.init = function() {
        var url = "/hallazgoGauge";

        $scope.gaugeCalidad = true;
        CrudDataApi.lista(
          url + "?filtro=" + JSON.stringify($scope.filtro),
          function(data) {
            data = data.data;
            if (data.status == "407") $window.location = "acceso";

            if (data.status == 200) {
              $scope.value = 1;

              $scope.upperLimit = data.total;
              $scope.lowerLimit = 0;
              $scope.unit = "UM";
              $scope.precision = 0;
              $scope.ranges = data.rangos;

              $scope.dato = data.data;
              $scope.anios = data.anio;
              $scope.gaugeCalidad = false;

              update(data.valor);
            } else {
              $scope.gaugeCalidad = false;
              errorFlash.error(data);
            }
            $scope.gaugeCalidad = false;
          },
          function(e) {
            if ($scope.intento < 1) {
              $scope.init();
              $scope.intento++;
            }
            $scope.gaugeCalidad = false;
          }
        );
      };
      $scope.mostrarGrafica = true;
      $scope.init();

      function update(valor) {
        $timeout(function() {
          $scope.value = $scope.value + 5;
          if ($scope.value < valor) {
            update(valor);
          }
        }, 50);
      }
    });

  function DialogCalidad(
    $scope,
    $mdDialog,
    EvaluacionShow,
    EvaluacionId,
    errorFlash,
    listaOpcion
  ) {
    $scope.acciones = [];
    $scope.hallazgos = {};
    $scope.imprimirDetalle = true;
    listaOpcion.options("/Accion").success(function(data) {
      data = data.data;
      $scope.acciones = data.data;
    });

    $scope.plazos = [];
    listaOpcion.options("/PlazoAccion").success(function(data) {
      data = data.data;
      $scope.plazos = data.data;
    });

    var id = EvaluacionId.getId();
    EvaluacionShow.ver(
      "/EvaluacionCalidad",
      id,
      function(data) {
        data = data.data;
        if (data.status == "407") $window.location = "acceso";

        if (data.status == 200) {
          $scope.dato = data.data;
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

    EvaluacionShow.ver(
      "/EvaluacionCalidadCriterio",
      id,
      function(data) {
        data = data.data;
        if (data.status == "407") $window.location = "acceso";

        if (data.status == 200) {
          $scope.total = data.total;
          $scope.criterios = data.data.criterios;
          $scope.marcados = data.data.datos;
          $scope.columnas = {};
          $scope.indicadorColumna = [];
          $scope.hallazgos = data.hallazgos;
          $scope.indicadores = [];

          angular.forEach(data.data.indicadores, function(val, key) {
            $scope.indicadores.push(val);
            $scope.indicadorColumna[val.codigo] = [];
            var c = 0;
            angular.forEach(val.columnas, function(v, k) {
              $scope.columnas[v.expediente] = v.expediente;
              $scope.indicadorColumna[val.codigo][v.expediente] = v;
              c++;
            });
          });
          $scope.cargando = false;
        } else {
          $scope.cargando = false;
          flash(
            "danger",
            "Ooops! Ocurrio un error (" + data.status + ") ->" + data.messages
          );
        }
        $scope.cargando = false;
      },
      function(e) {
        errorFlash.error(e);
        $scope.cargando = false;
      }
    );

    $scope.hide = function() {
      $mdDialog.hide();
    };
  }
})();
