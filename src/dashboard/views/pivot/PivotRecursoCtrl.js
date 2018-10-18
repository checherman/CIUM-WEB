angular
    .module("App")
    .controller("pivotRecursoController", function (
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
        $mdSidenav,
        $translate,
        EvaluacionId,
        CrudDataApi
    ) {
        $scope.datos = [];

        $scope.email = $localStorage.cium.user_email;

        $scope.cargar_datos = function () {
            try {
                $scope.cargando = true;

                var derivers = $.pivotUtilities.derivers;
                var url = "/PivotRecurso";
                $scope.tamano = document.body.clientHeight;

                var renderers = $.extend(
                    $.pivotUtilities.renderers,
                    $.pivotUtilities.gchart_renderers
                );

                CrudDataApi.lista(url, function (mps) {
                    $scope.cargando = false;
                    $scope.datos = mps.data.data;
                    $("#output").pivotUI(mps.data.data, {
                        renderers: renderers
                    });s                    
                });
            } catch (e) { 
                console.log(e);
            }
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
        $scope.cargar_datos();
    });