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
    .controller("DashboardCtrl", function(
      $rootScope,
      $scope,
      $translate,
      $localStorage,
      $stateParams,
      $mdSidenav,
      $location,
      $mdBottomSheet,
      Auth,
      UsuarioData,
      Menu,
      $http,
      $window,
      $timeout,
      
      flash,
      errorFlash,
      listaOpcion,
      Criterios,
      CrudDataApi,
      URLS
    ) {
      $scope.modulos = [
        {
          row: 1,
          col: 1,
          color: "#25a24a",
          icono: "visita_calidad",
          titulo: "VISITA_CALIDAD",
          url: "/dashboard/cobertura-calidad"
        },
        {
          row: 1,
          col: 1,
          color: "#EC6608",
          icono: "visita_recurso",
          titulo: "VISITA_RECURSO",
          url: "/dashboard/cobertura-recurso"
        },
        {
          row: 1,
          col: 1,
          color: "pink",
          icono: "visita_pc",
          titulo: "VISITA_PC",
          url: "/dashboard/cobertura-p-c"
        },
        {
          row: 1,
          col: 1,
          color: "goldenrod",
          icono: "criterio_calidad",
          titulo: "CRITERIO_CALIDAD",
          url: "/dashboard/criterio-calidad"
        },
        {
          row: 1,
          col: 1,
          color: "rgb(111, 184, 150)",
          icono: "criterio_recurso",
          titulo: "CRITERIO_RECURSO",
          url: "/dashboard/criterio-recurso"
        },
        {
          row: 1,
          col: 1,
          color: "darkorchid",
          icono: "criterio_pc",
          titulo: "CRITERIO_PC",
          url: "/dashboard/criterio-p-c"
        },
        {
          row: 1,
          col: 2,
          color: "#84A225",
          icono: "indicador_calidad",
          titulo: "INDICADOR_CALIDAD",
          url: "/dashboard/indicador-calidad"
        },
        {
          row: 1,
          col: 2,
          color: "lightcoral",
          icono: "indicador_recurso",
          titulo: "INDICADOR_RECURSO",
          url: "/dashboard/indicador-recurso"
        },
        {
          row: 1,
          col: 2,
          color: "yellow",
          icono: "indicador_pc",
          titulo: "INDICADOR_PC",
          url: "/dashboard/indicador-p-c"
        },
        {
          row: 1,
          col: 1,
          color: "aquamarine",
          icono: "hallazgo_calidad",
          titulo: "HALLAZGO_CALIDAD",
          url: "/dashboard/gauge-calidad"
        },
        {
          row: 1,
          col: 1,
          color: "#6FB896",
          icono: "hallazgo_recurso",
          titulo: "HALLAZGO_RECURSO",
          url: "/dashboard/gauge-recurso"
        },
        {
          row: 1,
          col: 1,
          color: "red",
          icono: "hallazgo_pc",
          titulo: "HALLAZGO_PC",
          url: "/dashboard/gauge-p-c"
        },
        {
          row: 1,
          col: 1,
          color: "#cad843",
          icono: "pivot_calidad",
          titulo: "PIVOT_CALIDAD",
          url: "/dashboard/pivot-calidad"
        },
        {
          row: 1,
          col: 1,
          color: "#33B549",
          icono: "pivot_recurso",
          titulo: "PIVOT_RECURSO",
          url: "/dashboard/pivot-recurso"
        },
        {
          row: 1,
          col: 1,
          color: "darkviolet",
          icono: "pivot_pc",
          titulo: "PIVOT_PC",
          url: "/dashboard/pivot-p-c"
        },
        {
          row: 1,
          col: 1,
          color: "orange",
          icono: "nuevo_calidad",
          titulo: "NUEVA_EVA_CALIDAD",
          url: "/evaluacion-calidad/nuevo"
        },
        {
          row: 1,
          col: 1,
          color: "#ed64d1",
          icono: "nuevo_recurso",
          titulo: "NUEVA_EVA_RECURSO",
          url: "/evaluacion-recurso/nuevo"
        },
        {
          row: 1,
          col: 1,
          color: "sienna",
          icono: "nuevo_pc",
          titulo: "NUEVA_EVA_PC",
          url: "/evaluacion-p-c/nuevo"
        },
        {
          row: 1,
          col: 2,
          color: "#68a7f1",
          icono: "dashboard",
          titulo: "DASHBOARD",
          url: "/dashboard/dash"
        },
        {
          row: 1,
          col: 1,
          color: "rgb(230, 78, 55)",
          icono: "hallazgo",
          titulo: "HALLAZGO",
          url: "/hallazgo"
        }
      ];
      // cambia de color el menu seleccionado
      $scope.email = $localStorage.cium.user_email;

      $scope.loggedUser = UsuarioData.getDatosUsuario();

      $scope.url_base = URLS.BASE;
      $scope.url_etab = URLS.ETAB;
      

      // inicializa el modulo ruta y url se le asigna el valor de la página actual
      $scope.ruta = "";
      $scope.url = $location.url();
      $scope.modulo = $scope.url.split("#!")[0];
      $scope.modulo = $scope.modulo.split("-")[1];

      // muestra el templete para cambiar el idioma
      $scope.mostrarIdiomas = function($event) {
        $mdBottomSheet.show({
          templateUrl: "src/app/views/idiomas.html",
          controller: "ListaIdiomasCtrl",
          targetEvent: $event
        });
      };

      // cierra la session para salir del sistema
      $scope.logout = function() {
        Auth.logout(function() {
          $location.path("signin");
        });
      };

      // redirecciona a la página que se le pase como parametro
      $scope.ir = function(path, fuera) {
        if (fuera == 1 || path.indexOf("http") > -1) {
          var a = document.createElement("a");
          a.target = "_blank";
          a.href = path;
          a.click();
        } else {
          $scope.menuSelected = path;
          $location.path(path).search({ id: null });
        }
      };

      $scope.resetear_reporte = function() {
        CrudDataApi.lista(
          "/ResetearReportes",
          function(data) {
            data = data.data;

            if (data.status == 200) {
              flash("success", data.messages);
            } else {
              flash("warning", data.messages);
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

      $scope.resetear_resincronizacion = function() {
        CrudDataApi.lista(
          "/ResetearResincronizacion",
          function(data) {
            data = data.data;

            if (data.status == 200) {
              flash("success", data.messages);
            } else {
              flash("warning", data.messages);
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

      $scope.excel = function (titulo) {
        let colspan = $("#tabla_datos").find("tr:first th").length;
        let excelData =
          "<table><tr><th colspan='" +
          colspan +
          "'><h1>" +
          titulo +
          " <h1></th></tr></table>";

        excelData += document.getElementById("exportar_datos").innerHTML;
        let blob = new Blob([excelData], {
          type: "text/comma-separated-values;charset=utf-8"
        });
        saveAs(blob, titulo + ".xls");
      };
    });
})();
