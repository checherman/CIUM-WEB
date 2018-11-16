/**
 * @ngdoc service
 * @name App.service:config
 * @description
 * Contiene la configuración general del proyecto, precarga los iconos y el tema de material desing, ademas crea las rutas publicas.
 */

(function () {
    "use strict";

    angular
        .module("App")
        .config(function (
            $mdDateLocaleProvider,
            $mdThemingProvider,
            $mdIconProvider,
            $httpProvider,
            $translateProvider,
            $qProvider,
            $stateProvider,
            $urlRouterProvider,
            $ocLazyLoadProvider,
            URLS
        ) {
            $qProvider.errorOnUnhandledRejections(false);
            $mdDateLocaleProvider.months = [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
            ];
            $mdDateLocaleProvider.shortMonths = [
                "Ene",
                "Feb",
                "Mar",
                "Abr",
                "May",
                "Jun",
                "Jul",
                "Ago",
                "Sep",
                "Oct",
                "Nov",
                "Dic"
            ];
            $mdDateLocaleProvider.days = [
                "Domingo",
                "Lunes",
                "Martes",
                "Miércoles",
                "Jueves",
                "Viernes",
                "Sábado"
            ];
            $mdDateLocaleProvider.shortDays = [
                "Dom",
                "Lun",
                "Mar",
                "Mie",
                "Jue",
                "Vie",
                "Sab"
            ];
            // Can change week display to start on Monday.
            $mdDateLocaleProvider.firstDayOfWeek = 0;

            // Configuramos iconos
            $mdIconProvider
                .defaultIconSet("assets/svg/mdi.svg")

                .icon("avatars", "assets/svg/avatars.svg", 48)
                .icon("logo", "assets/svg/cium.svg", 48)
                .icon("logo-white", "assets/svg/cium_white.svg", 48)
                .icon("salud-id", "assets/svg/salud_id_white.svg", 48)
                .icon("salud-id-alt", "assets/svg/salud_id_alt.svg", 48)
                .icon("ssa", "assets/svg/secretaria_salud.svg", 128)
                .icon("etab", "assets/svg/etab.svg", 128)
                .icon("marca", "assets/svg/chiapas_nos_une.svg", 128)
                .icon("escudo-chiapas-h", "assets/svg/escudo_chiapas_h.svg", 128)

                .icon("syringe-filled", "assets/svg/syringe_filled.svg", 128)
                .icon("hearts-filled", "assets/svg/hearts_filled.svg", 128)
                .icon("diabetes-filled", "assets/svg/diabetes_filled.svg", 128)
                .icon("coronavirus-filled", "assets/svg/coronavirus_filled.svg", 128)
                .icon("quality", "assets/svg/quality.svg", 128)
                .icon("recurso", "assets/svg/recurso.svg", 128)
                .icon("home-assistant", "assets/svg/home-assistant.svg", 128)

                .icon(
                    "criterio_calidad",
                    "assets/svg/dashboard/criterio_calidad.svg",
                    128
                )
                .icon(
                    "criterio_recurso",
                    "assets/svg/dashboard/criterio_recurso.svg",
                    128
                )
                .icon("criterio_pc", "assets/svg/dashboard/criterio_pc.svg", 128)
                .icon("dashboard", "assets/svg/dashboard/dashboard.svg", 128)
                .icon("hallazgo", "assets/svg/dashboard/hallazgo.svg", 128)
                .icon(
                    "hallazgo_calidad",
                    "assets/svg/dashboard/hallazgo_calidad.svg",
                    128
                )
                .icon(
                    "hallazgo_recurso",
                    "assets/svg/dashboard/hallazgo_recurso.svg",
                    128
                )
                .icon("hallazgo_pc", "assets/svg/dashboard/hallazgo_pc.svg", 128)
                .icon(
                    "indicador_calidad",
                    "assets/svg/dashboard/indicador_calidad.svg",
                    128
                )
                .icon(
                    "indicador_recurso",
                    "assets/svg/dashboard/indicador_recurso.svg",
                    128
                )

                .icon("indicador_pc", "assets/svg/dashboard/indicador_pc.svg", 128)
                .icon("nuevo_calidad", "assets/svg/dashboard/nuevo_calidad.svg", 128)
                .icon("nuevo_recurso", "assets/svg/dashboard/nuevo_recurso.svg", 128)
                .icon("nuevo_pc", "assets/svg/dashboard/nuevo_pc.svg", 128)
                .icon("pivot_calidad", "assets/svg/dashboard/pivot_calidad.svg", 128)
                .icon("pivot_recurso", "assets/svg/dashboard/pivot_recurso.svg", 128)
                .icon("pivot_pc", "assets/svg/dashboard/pivot_pc.svg", 128)
                .icon("visita_calidad", "assets/svg/dashboard/visita_calidad.svg", 128)
                .icon("visita_recurso", "assets/svg/dashboard/visita_recurso.svg", 128)
                .icon("visita_pc", "assets/svg/dashboard/visita_pc.svg", 128);

            // Configuramos tema de material design
            $mdThemingProvider
                .theme("default")
                .primaryPalette("blue")
                .accentPalette("red");
            $mdThemingProvider
                .theme("userInfoTheme")
                .primaryPalette("teal")
                .accentPalette("blue-grey")
                .backgroundPalette("blue-grey");
            $mdThemingProvider
                .theme("dashboardTheme")
                .primaryPalette("deep-orange")
                .accentPalette("orange");
            $mdThemingProvider
                .theme("altThemeg")
                .primaryPalette("green")
                .accentPalette("light-green");
            $mdThemingProvider
                .theme("altTheme")
                .primaryPalette("grey", { default: "200" })
                .accentPalette("orange");
            $mdThemingProvider
                .theme("searchTheme")
                .primaryPalette("light-blue", { default: "100" })
                .accentPalette("blue", { default: "200" });

            $ocLazyLoadProvider.config({
                debug: false,
                events: false,
                modules: [
                    {
                        name: "nvd3",
                        files: [
                            "bower_components/nvd3/build/nv.d3.js",
                            "bower_components/angular-nvd3/dist/angular-nvd3.js"
                        ]
                    },
                    {
                        name: "ngRadialGauge",
                        files: ["bower_components/ngRadialGauge/src/ng-radial-gauge-dir.js"]
                    },
                    {
                        name: "ngMap",
                        files: ["bower_components/ngmap/build/scripts/ng-map.min.js"]
                    }
                ]
            });


            $urlRouterProvider.otherwise("/signin");
            $stateProvider;
            $stateProvider

                .state("signin", {
                    url: "/signin",
                    templateUrl: "src/app/views/login.html",
                    controller: "SigninCtrl"
                })

                .state("registro", {
                    url: "/registro",
                    templateUrl: "src/app/views/registro.html",
                    controller: "SigninCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                "js!https://www.google.com/recaptcha/api.js?sensor=false"
                            );
                        }
                    }
                })

                .state("recuperar-password", {
                    url: "/recuperar-password",
                    templateUrl: "src/app/views/recuperar-password.html",
                    controller: "SigninCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                "js!https://www.google.com/recaptcha/api.js?sensor=false"
                            );
                        }
                    }
                })

                .state("reset", {
                    url: "/reset/:id",
                    templateUrl: "src/app/views/reset.html",
                    controller: "SigninCtrl"
                })

                .state("active", {
                    url: "/active/:id",
                    templateUrl: "src/app/views/active.html",
                    controller: "SigninCtrl"
                })

                .state("acceso-denegado", {
                    url: "/acceso-denegado",
                    templateUrl: "src/app/views/forbidden.html",
                    controller: "MenuCtrl"
                })
                .state("no-encontrado", {
                    url: "/no-encontrado",
                    templateUrl: "src/app/views/not-found.html",
                    controller: "MenuCtrl"
                })

                // RUTAS COMUNES
                .state("COMUN", {

                    templateUrl: "src/comun.html",
                    controller: "MenuCtrl"
                })

                .state("COMUN.acerca-de", {
                    url: "/acerca-de",
                    templateUrl: "src/app/views/acerca-de.html"
                })
                .state("COMUN.manual-usuario", {
                    url: "/manual-usuario",
                    templateUrl: "src/app/views/manual-usuario.html"
                })
                .state("COMUN.manual-web", {
                    url: "/manual-web",
                    templateUrl: "src/app/views/manual-web.html"
                })
                // DASHBOARD

                .state("DASHBOARD", {

                    templateUrl: "src/comun.html",
                    controller: "MenuCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                "src/dashboard/services.js",
                                "src/dashboard/DashboardCtrl.js"
                            ]);
                        }
                    }
                })

                .state("DASHBOARD.dashboard", {
                    url: "/dashboard",
                    templateUrl: "src/dashboard/views/lista.html",
                    controller: "DashboardCtrl"
                })
                .state("DASHBOARD.dash", {
                    url: "/dashboard/dash",
                    templateUrl: "src/dashboard/views/dashboard.html",
                    controller: "DashboardCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                "assets/js/d3.min.js",
                                "nvd3",
                                "ngMap",
                                "src/dashboard/services.js",
                                "src/dashboard/DashboardCtrl.js",
                                "src/dashboard/CalidadCtrl.js",
                                "src/dashboard/RecursoCtrl.js"
                            ]);
                        }
                    }
                })

                .state("DASHBOARD.indicador-recurso", {
                    url: "/dashboard/indicador-recurso",
                    templateUrl: "src/dashboard/views/dashboard/indicador-recurso.html",
                    controller: "DashboardCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/dashboard/RecursoCtrl.js");
                        }
                    }
                })
                .state("DASHBOARD.indicador-calidad", {
                    url: "/dashboard/indicador-calidad",
                    templateUrl: "src/dashboard/views/dashboard/indicador-calidad.html",
                    controller: "DashboardCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/dashboard/CalidadCtrl.js");
                        }
                    }
                })
                .state("DASHBOARD.indicador-p-c", {
                    url: "/dashboard/indicador-p-c",
                    templateUrl: "src/dashboard/views/dashboard/indicador-pc.html",
                    controller: "DashboardCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/dashboard/PCCtrl.js");
                        }
                    }
                })

                .state("DASHBOARD.criterio-recurso", {
                    url: "/dashboard/criterio-recurso",
                    templateUrl: "src/dashboard/views/dashboard/criterio-recurso.html",
                    controller: "DashboardCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/dashboard/RecursoCtrl.js");
                        }
                    }
                })
                .state("DASHBOARD.criterio-calidad", {
                    url: "/dashboard/criterio-calidad",
                    templateUrl: "src/dashboard/views/dashboard/criterio-calidad.html",
                    controller: "DashboardCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/dashboard/CalidadCtrl.js");
                        }
                    }
                })
                .state("DASHBOARD.criterio-p-c", {
                    url: "/dashboard/criterio-p-c",
                    templateUrl: "src/dashboard/views/dashboard/criterio-pc.html",
                    controller: "DashboardCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/dashboard/PCCtrl.js");
                        }
                    }
                })

                .state("GAUGE", {

                    templateUrl: "src/comun.html",
                    controller: "MenuCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                "bower_components/d3/d3.js",
                                "ngRadialGauge",
                                "src/dashboard/services.js",
                                "src/dashboard/DashboardCtrl.js"
                            ]);
                        }
                    }
                })
                .state("GAUGE.gauge-recurso", {
                    url: "/dashboard/gauge-recurso",
                    templateUrl: "src/dashboard/views/dashboard/gauge-recurso.html",
                    controller: "DashboardCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/dashboard/RecursoCtrl.js");
                        }
                    }
                })
                .state("GAUGE.gauge-calidad", {
                    url: "/dashboard/gauge-calidad",
                    templateUrl: "src/dashboard/views/dashboard/gauge-calidad.html",
                    controller: "DashboardCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/dashboard/CalidadCtrl.js");
                        }
                    }
                })
                .state("GAUGE.gauge-p-c", {
                    url: "/dashboard/gauge-p-c",
                    templateUrl: "src/dashboard/views/dashboard/gauge-pc.html",
                    controller: "DashboardCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/dashboard/PCCtrl.js");
                        }
                    }
                })

                .state("COBERTURA", {

                    templateUrl: "src/comun.html",
                    controller: "MenuCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad, URLS) {
                            return $ocLazyLoad.load([
                                "js!https://maps.google.com/maps/api/js?sensor=false&key=" + URLS.MAPS_KEY,
                                "assets/js/d3.min.js",
                                "nvd3",
                                "ngMap",
                                "src/dashboard/services.js",
                                "src/dashboard/DashboardCtrl.js"
                            ]);
                        }
                    }
                })

                .state("COBERTURA.cobertura-recurso", {
                    url: "/dashboard/cobertura-recurso",
                    templateUrl: "src/dashboard/views/dashboard/cobertura-recurso.html",
                    controller: "DashboardCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/dashboard/RecursoCtrl.js");
                        }
                    }
                })
                .state("COBERTURA.cobertura-calidad", {
                    url: "/dashboard/cobertura-calidad",
                    templateUrl: "src/dashboard/views/dashboard/cobertura-calidad.html",
                    controller: "DashboardCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/dashboard/CalidadCtrl.js");
                        }
                    }
                })
                .state("COBERTURA.cobertura-p-c", {
                    url: "/dashboard/cobertura-p-c",
                    templateUrl: "src/dashboard/views/dashboard/cobertura-pc.html",
                    controller: "DashboardCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/dashboard/PCCtrl.js");
                        }
                    }
                })

                .state("PIVOT", {

                    templateUrl: "src/comun.html",
                    controller: "MenuCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                "assets/js/pivotTable.js",
                                "assets/js/pivotTable/pivot.js",
                                "assets/js/pivotTable/pivot.es.js",
                                "assets/js/pivotTable/gcharts_renderers.js",
                                "assets/js/rasterizeHTML.allinone.js"
                            ]);
                        }
                    }
                })

                .state("PIVOT.pivot-calidad", {
                    url: "/dashboard/pivot-calidad",
                    templateUrl: "src/dashboard/views/pivot/calidad.html",
                    controller: "DashboardCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                "src/dashboard/views/pivot/PivotCalidadCtrl.js"
                            );
                        }
                    }
                })
                .state("PIVOT.pivot-recurso", {
                    url: "/dashboard/pivot-recurso",
                    templateUrl: "src/dashboard/views/pivot/recurso.html",
                    controller: "DashboardCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                "src/dashboard/views/pivot/PivotRecursoCtrl.js"
                            );
                        }
                    }
                })
                .state("PIVOT.pivot-p-c", {
                    url: "/dashboard/pivot-p-c",
                    templateUrl: "src/dashboard/views/pivot/pc.html",
                    controller: "DashboardCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                "src/dashboard/views/pivot/PivotPCCtrl.js"
                            );
                        }
                    }
                })
                // fin DASHBOARD
                // formularios

                .state("CATALOGO", {

                    templateUrl: "src/comun.html",
                    controller: "MenuCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/catalogos/controllers.js");
                        }
                    }
                })

                .state("CATALOGO.accion", {
                    url: "/accion",
                    templateUrl: "src/catalogos/accion/views/lista.html",
                    controller: "CrudCtrl"
                })
                .state("CATALOGO.accion-nuevo", {
                    url: "/accion/nuevo",
                    templateUrl: "src/catalogos/accion/views/nuevo.html",
                    controller: "CrudCtrl"
                })
                .state("CATALOGO.accion-modificar", {
                    url: "/accion/modificar/:id",
                    templateUrl: "src/catalogos/accion/views/modificar.html",
                    controller: "CrudCtrl"
                })
                .state("CATALOGO.accion-ver", {
                    url: "/accion/ver/:id",
                    templateUrl: "src/catalogos/accion/views/ver.html",
                    controller: "CrudCtrl"
                })

                .state("CATALOGO.alerta", {
                    url: "/alerta",
                    templateUrl: "src/catalogos/alerta/views/lista.html",
                    controller: "CrudCtrl"
                })
                .state("CATALOGO.alerta-nuevo", {
                    url: "/alerta/nuevo",
                    templateUrl: "src/catalogos/alerta/views/nuevo.html",
                    controller: "CrudCtrl"
                })
                .state("CATALOGO.alerta-modificar", {
                    url: "/alerta/modificar/:id",
                    templateUrl: "src/catalogos/alerta/views/modificar.html",
                    controller: "CrudCtrl"
                })
                .state("CATALOGO.alerta-ver", {
                    url: "/alerta/ver/:id",
                    templateUrl: "src/catalogos/alerta/views/ver.html",
                    controller: "CrudCtrl"
                })

                .state("CATALOGO.clues", {
                    url: "/clues",
                    templateUrl: "src/catalogos/clues/views/lista.html",
                    controller: "CrudCtrl"
                })
                .state("CATALOGO.clues-ver", {
                    url: "/clues/ver:id",
                    templateUrl: "src/catalogos/clues/views/ver.html",
                    controller: "CrudCtrl"
                })

                .state("CATALOGO.cone", {
                    url: "/cone",
                    templateUrl: "src/catalogos/cone/views/lista.html",
                    controller: "CrudCtrl"
                })
                .state("CATALOGO.cone-nuevo", {
                    url: "/cone/nuevo",
                    templateUrl: "src/catalogos/cone/views/nuevo.html",
                    controller: "CrudCtrl"
                })
                .state("CATALOGO.cone-modificar", {
                    url: "/cone/modificar/:id",
                    templateUrl: "src/catalogos/cone/views/modificar.html",
                    controller: "CrudCtrl"
                })
                .state("CATALOGO.cone-ver", {
                    url: "/cone/ver/:id",
                    templateUrl: "src/catalogos/cone/views/ver.html",
                    controller: "CrudCtrl"
                })

                .state("CATALOGO.zona", {
                    url: "/zona",
                    templateUrl: "src/catalogos/zona/views/lista.html",
                    controller: "CrudCtrl"
                })
                .state("CATALOGO.zona-nuevo", {
                    url: "/zona/nuevo",
                    templateUrl: "src/catalogos/zona/views/nuevo.html",
                    controller: "CrudCtrl"
                })
                .state("CATALOGO.zona-modificar", {
                    url: "/zona/modificar/:id",
                    templateUrl: "src/catalogos/zona/views/modificar.html",
                    controller: "CrudCtrl"
                })
                .state("CATALOGO.zona-ver", {
                    url: "/zona/ver/:id",
                    templateUrl: "src/catalogos/zona/views/ver.html",
                    controller: "CrudCtrl"
                })

                .state("CATALOGO.lugar-verificacion", {
                    url: "/lugar-verificacion",
                    templateUrl: "src/catalogos/lugarVerificacion/views/lista.html",
                    controller: "CrudCtrl"
                })
                .state("CATALOGO.lugar-verificacion-nuevo", {
                    url: "/lugar-verificacion/nuevo",
                    templateUrl: "src/catalogos/lugarVerificacion/views/nuevo.html",
                    controller: "CrudCtrl"
                })
                .state("CATALOGO.lugar-verificacion-modificar", {
                    url: "/lugar-verificacion/modificar/:id",
                    templateUrl: "src/catalogos/lugarVerificacion/views/modificar.html",
                    controller: "CrudCtrl"
                })
                .state("CATALOGO.lugar-verificacion-ver", {
                    url: "/lugar-verificacion/ver/:id",
                    templateUrl: "src/catalogos/lugarVerificacion/views/ver.html",
                    controller: "CrudCtrl"
                })

                .state("CATALOGO.plazo-accion", {
                    url: "/plazo-accion",
                    templateUrl: "src/catalogos/plazoAccion/views/lista.html",
                    controller: "CrudCtrl"
                })
                .state("CATALOGO.plazo-accion-nuevo", {
                    url: "/plazo-accion/nuevo",
                    templateUrl: "src/catalogos/plazoAccion/views/nuevo.html",
                    controller: "CrudCtrl"
                })
                .state("CATALOGO.plazo-accion-modificar", {
                    url: "/plazo-accion/modificar/:id",
                    templateUrl: "src/catalogos/plazoAccion/views/modificar.html",
                    controller: "CrudCtrl"
                })
                .state("CATALOGO.plazo-accion-ver", {
                    url: "/plazo-accion/ver/:id",
                    templateUrl: "src/catalogos/plazoAccion/views/ver.html",
                    controller: "CrudCtrl"
                })

                .state("CATALOGO.versionApp", {
                    url: "/versionApp",
                    templateUrl: "src/catalogos/versionApp/views/lista.html",
                    controller: "CrudCtrl"
                })
                .state("CATALOGO.versionApp-nuevo", {
                    url: "/versionApp/nuevo",
                    templateUrl: "src/catalogos/versionApp/views/nuevo.html",
                    controller: "VersionAppCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/catalogos/versionApp/controller.js");
                        }
                    }
                })
                .state("CATALOGO.versionApp-modificar", {
                    url: "/versionApp/modificar/:id",
                    templateUrl: "src/catalogos/versionApp/views/modificar.html",
                    controller: "VersionAppCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/catalogos/versionApp/controller.js");
                        }
                    }
                })
                .state("CATALOGO.versionApp-ver", {
                    url: "/versionApp/ver/:id",
                    templateUrl: "src/catalogos/versionApp/views/ver.html",
                    controller: "CrudCtrl"
                })

                .state("CATALOGO.comunidad-priorizada", {
                    url: "/comunidad-priorizada",
                    templateUrl: "src/catalogos/comunidad-priorizada/views/lista.html",
                    controller: "CrudCtrl"
                })
                .state("CATALOGO.comunidad-priorizada-nuevo", {
                    url: "/comunidad-priorizada/nuevo",
                    templateUrl: "src/catalogos/comunidad-priorizada/views/nuevo.html",
                    controller: "CrudCtrl"
                })
                .state("CATALOGO.comunidad-priorizada-modificar", {
                    url: "/comunidad-priorizada/modificar/:id",
                    templateUrl:
                        "src/catalogos/comunidad-priorizada/views/modificar.html",
                    controller: "CrudCtrl"
                })
                .state("CATALOGO.comunidad-priorizada-ver", {
                    url: "/comunidad-priorizada/ver/:id",
                    templateUrl: "src/catalogos/comunidad-priorizada/views/ver.html",
                    controller: "CrudCtrl"
                })

                .state("CATALOGO.criterio", {
                    url: "/criterio",
                    templateUrl: "src/catalogos/criterio/views/lista.html",
                    controller: "CriterioCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/catalogos/criterio/controller.js");
                        }
                    }
                })
                .state("CATALOGO.criterio-nuevo", {
                    url: "/criterio/nuevo",
                    templateUrl: "src/catalogos/criterio/views/nuevo.html",
                    controller: "CriterioCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/catalogos/criterio/controller.js");
                        }
                    }
                })
                .state("CATALOGO.criterio-modificar", {
                    url: "/criterio/modificar/:id",
                    templateUrl: "src/catalogos/criterio/views/modificar.html",
                    controller: "CriterioCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/catalogos/criterio/controller.js");
                        }
                    }
                })
                .state("CATALOGO.criterio-ver", {
                    url: "/criterio/ver/:id",
                    templateUrl: "src/catalogos/criterio/views/ver.html",
                    controller: "CriterioCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/catalogos/criterio/controller.js");
                        }
                    }
                })

                .state("CATALOGO.indicador", {
                    url: "/indicador",
                    templateUrl: "src/catalogos/indicador/views/lista.html",
                    controller: "IndicadorCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/catalogos/indicador/controller.js");
                        }
                    }
                })
                .state("CATALOGO.indicador-nuevo", {
                    url: "/indicador/nuevo",
                    templateUrl: "src/catalogos/indicador/views/nuevo.html",
                    controller: "IndicadorCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/catalogos/indicador/controller.js");
                        }
                    }
                })
                .state("CATALOGO.indicador-modificar", {
                    url: "/indicador/modificar/:id",
                    templateUrl: "src/catalogos/indicador/views/modificar.html",
                    controller: "IndicadorCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/catalogos/indicador/controller.js");
                        }
                    }
                })
                .state("CATALOGO.indicador-ver", {
                    url: "/indicador/ver/:id",
                    templateUrl: "src/catalogos/indicador/views/ver.html",
                    controller: "IndicadorCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/catalogos/indicador/controller.js");
                        }
                    }
                })

                //SISTEMA
                .state("SISTEMA", {

                    templateUrl: "src/comun.html",
                    controller: "MenuCtrl"
                })

                // modulo
                .state("SISTEMA.modulo", {
                    url: "/modulo",
                    templateUrl: "src/SISTEMA/modulo/views/lista.html",
                    controller: "ModuloCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/sistema/modulo/controller.js");
                        }
                    }
                })

                .state("SISTEMA.modulo-nuevo", {
                    url: "/modulo/nuevo",
                    templateUrl: "src/SISTEMA/modulo/views/nuevo.html",
                    controller: "ModuloCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/sistema/modulo/controller.js");
                        }
                    }
                })

                .state("SISTEMA.modulo-modificar", {
                    url: "/modulo/modificar/:id",
                    templateUrl: "src/SISTEMA/modulo/views/modificar.html",
                    controller: "ModuloCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/sistema/modulo/controller.js");
                        }
                    }
                })

                .state("SISTEMA.modulo-ver", {
                    url: "/modulo/ver/:id",
                    templateUrl: "src/SISTEMA/modulo/views/ver.html",
                    controller: "ModuloCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/sistema/modulo/controller.js");
                        }
                    }
                })

                //grupo
                .state("SISTEMA.grupo", {
                    url: "/grupo",
                    templateUrl: "src/SISTEMA/grupo/views/lista.html",
                    controller: "GrupoCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                "src/sistema/grupo/services.js",
                                "src/sistema/grupo/controller.js"
                            ]);
                        }
                    }
                })

                .state("SISTEMA.grupo-nuevo", {
                    url: "/grupo/nuevo",
                    templateUrl: "src/SISTEMA/grupo/views/nuevo.html",
                    controller: "GrupoCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                "src/sistema/grupo/services.js",
                                "src/sistema/grupo/controller.js"
                            ]);
                        }
                    }
                })

                .state("SISTEMA.grupo-modificar", {
                    url: "/grupo/modificar/:id",
                    templateUrl: "src/SISTEMA/grupo/views/modificar.html",
                    controller: "GrupoCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                "src/sistema/grupo/services.js",
                                "src/sistema/grupo/controller.js"
                            ]);
                        }
                    }
                })

                .state("SISTEMA.grupo-ver", {
                    url: "/grupo/ver/:id",
                    templateUrl: "src/SISTEMA/grupo/views/ver.html",
                    controller: "GrupoCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load([
                                "src/sistema/grupo/services.js",
                                "src/sistema/grupo/controller.js"
                            ]);
                        }
                    }
                })

                //usuario
                .state("SISTEMA.usuario", {
                    url: "/usuario",
                    templateUrl: "src/SISTEMA/usuario/views/lista.html",
                    controller: "UsuarioCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/sistema/usuario/controller.js");
                        }
                    }
                })

                .state("SISTEMA.usuario-nuevo", {
                    url: "/usuario/nuevo",
                    templateUrl: "src/SISTEMA/usuario/views/nuevo.html",
                    controller: "UsuarioCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/sistema/usuario/controller.js");
                        }
                    }
                })

                .state("SISTEMA.usuario-modificar", {
                    url: "/usuario/modificar/:id",
                    templateUrl: "src/SISTEMA/usuario/views/modificar.html",
                    controller: "UsuarioCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/sistema/usuario/controller.js");
                        }
                    }
                })

                .state("SISTEMA.usuario-ver", {
                    url: "/usuario/ver/:id",
                    templateUrl: "src/SISTEMA/usuario/views/ver.html",
                    controller: "UsuarioCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/sistema/usuario/controller.js");
                        }
                    }
                })

                .state("SISTEMA.perfil", {
                    url: "/usuario/perfil/:id",
                    templateUrl: "src/SISTEMA/usuario/views/perfil.html",
                    controller: "UsuarioCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/sistema/usuario/controller.js");
                        }
                    }
                })

                // evaluaciones

                .state("EVALUACION", {

                    templateUrl: "src/comun.html",
                    controller: "MenuCtrl"
                })

                // calidad
                .state("EVALUACION.calidad", {
                    url: "/evaluacion-calidad",
                    templateUrl: "src/transaccion/evaluacionCalidad/views/lista.html",
                    controller: "CalidadCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                "src/transaccion/evaluacionCalidad/controller.js"
                            );
                        }
                    }
                })
                .state("EVALUACION.calidad-Criterios", {
                    url: "/evaluacion-calidad/Criterios",
                    templateUrl: "src/transaccion/evaluacionCalidad/views/Criterios.html",
                    controller: "CalidadCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                "src/transaccion/evaluacionCalidad/controller.js"
                            );
                        }
                    }
                })
                .state("EVALUACION.calidad-nuevo", {
                    url: "/evaluacion-calidad/nuevo",
                    templateUrl: "src/transaccion/evaluacionCalidad/views/nuevo.html",
                    controller: "CalidadCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                "src/transaccion/evaluacionCalidad/controller.js"
                            );
                        }
                    }
                })
                .state("EVALUACION.calidad-modificar", {
                    url: "/evaluacion-calidad/modificar/:id",
                    templateUrl: "src/transaccion/evaluacionCalidad/views/modificar.html",
                    controller: "CalidadCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                "src/transaccion/evaluacionCalidad/controller.js"
                            );
                        }
                    }
                })
                .state("EVALUACION.calidad-ver", {
                    url: "/evaluacion-calidad/ver/:id",
                    templateUrl: "src/transaccion/evaluacionCalidad/views/ver.html",
                    controller: "CalidadCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                "src/transaccion/evaluacionCalidad/controller.js"
                            );
                        }
                    }
                })
                .state("EVALUACION.calidad-evaluacionImpresa", {
                    url: "/evaluacion-calidad/evaluacionImpresa",
                    templateUrl:
                        "src/transaccion/evaluacionCalidad/views/evaluacionImpresa.html",
                    controller: "CalidadCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                "src/transaccion/evaluacionCalidad/controller.js"
                            );
                        }
                    }
                })

                // recurso
                .state("EVALUACION.recurso", {
                    url: "/evaluacion-recurso",
                    templateUrl: "src/transaccion/evaluacionRecurso/views/lista.html",
                    controller: "RecursoCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                "src/transaccion/evaluacionRecurso/controller.js"
                            );
                        }
                    }
                })
                .state("EVALUACION.recurso-Criterios", {
                    url: "/evaluacion-recurso/Criterios",
                    templateUrl: "src/transaccion/evaluacionRecurso/views/Criterios.html",
                    controller: "RecursoCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                "src/transaccion/evaluacionRecurso/controller.js"
                            );
                        }
                    }
                })
                .state("EVALUACION.recurso-nuevo", {
                    url: "/evaluacion-recurso/nuevo",
                    templateUrl: "src/transaccion/evaluacionRecurso/views/nuevo.html",
                    controller: "RecursoCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                "src/transaccion/evaluacionRecurso/controller.js"
                            );
                        }
                    }
                })
                .state("EVALUACION.recurso-modificar", {
                    url: "/evaluacion-recurso/modificar/:id",
                    templateUrl: "src/transaccion/evaluacionRecurso/views/modificar.html",
                    controller: "RecursoCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                "src/transaccion/evaluacionRecurso/controller.js"
                            );
                        }
                    }
                })
                .state("EVALUACION.recurso-ver", {
                    url: "/evaluacion-recurso/ver/:id",
                    templateUrl: "src/transaccion/evaluacionRecurso/views/ver.html",
                    controller: "RecursoCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                "src/transaccion/evaluacionRecurso/controller.js"
                            );
                        }
                    }
                })
                .state("EVALUACION.recurso-evaluacionImpresa", {
                    url: "/evaluacion-recurso/evaluacionImpresa",
                    templateUrl:
                        "src/transaccion/evaluacionRecurso/views/evaluacionImpresa.html",
                    controller: "RecursoCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                "src/transaccion/evaluacionRecurso/controller.js"
                            );
                        }
                    }
                })

                // recurso
                .state("EVALUACION.PC", {
                    url: "/evaluacion-p-c",
                    templateUrl: "src/transaccion/evaluacionPC/views/lista.html",
                    controller: "PCCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                "src/transaccion/evaluacionPC/controller.js"
                            );
                        }
                    }
                })
                .state("EVALUACION.PC-Criterios", {
                    url: "/evaluacion-p-c/Criterios",
                    templateUrl: "src/transaccion/evaluacionPC/views/Criterios.html",
                    controller: "PCCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                "src/transaccion/evaluacionPC/controller.js"
                            );
                        }
                    }
                })
                .state("EVALUACION.PC-nuevo", {
                    url: "/evaluacion-p-c/nuevo",
                    templateUrl: "src/transaccion/evaluacionPC/views/nuevo.html",
                    controller: "PCCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                "src/transaccion/evaluacionPC/controller.js"
                            );
                        }
                    }
                })
                .state("EVALUACION.PC-modificar", {
                    url: "/evaluacion-p-c/modificar/:id",
                    templateUrl: "src/transaccion/evaluacionPC/views/modificar.html",
                    controller: "PCCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                "src/transaccion/evaluacionPC/controller.js"
                            );
                        }
                    }
                })
                .state("EVALUACION.PC-ver", {
                    url: "/evaluacion-p-c/ver/:id",
                    templateUrl: "src/transaccion/evaluacionPC/views/ver.html",
                    controller: "PCCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                "src/transaccion/evaluacionPC/controller.js"
                            );
                        }
                    }
                })
                .state("EVALUACION.PC-evaluacionImpresa", {
                    url: "/evaluacion-p-c/evaluacionImpresa",
                    templateUrl:
                        "src/transaccion/evaluacionPC/views/evaluacionImpresa.html",
                    controller: "PCCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load(
                                "src/transaccion/evaluacionPC/controller.js"
                            );
                        }
                    }
                })

                .state("EVALUACION.hallazgo", {
                    url: "/hallazgo",
                    templateUrl: "src/transaccion/hallazgo/views/lista.html",
                    controller: "HallazgoCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/transaccion/hallazgo/controller.js");
                        }
                    }
                })
                .state("EVALUACION.hallazgo-ver", {
                    url: "/hallazgo/ver/:id",
                    templateUrl: "src/transaccion/hallazgo/views/ver.html",
                    controller: "HallazgoCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/transaccion/hallazgo/controller.js");
                        }
                    }
                })
                .state("EVALUACION.hallazgo-indicadores", {
                    url: "/hallazgo/indicadores",
                    templateUrl: "src/transaccion/hallazgo/views/indicadores.html",
                    controller: "HallazgoCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/transaccion/hallazgo/controller.js");
                        }
                    }
                })
                .state("EVALUACION.hallazgo-evaluaciones", {
                    url: "/hallazgo/evaluaciones",
                    templateUrl: "src/transaccion/hallazgo/views/evaluaciones.html",
                    controller: "HallazgoCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/transaccion/hallazgo/controller.js");
                        }
                    }
                })

                // formularios

                .state("FORMULARIO_CAPTURA", {

                    templateUrl: "src/comun.html",
                    controller: "MenuCtrl",
                    resolve: {
                        loadPlugin: function ($ocLazyLoad) {
                            return $ocLazyLoad.load("src/formulario/controller.js");
                        }
                    }
                })

                .state("FORMULARIO_CAPTURA.formulario-dashboard", {
                    url: "/formulario-dashboard",
                    templateUrl: "src/formulario/formulario-dashboard/views/lista.html",
                    controller: "CapturaIndicadorCtrl"
                })

                .state("FORMULARIO_CAPTURA.formulario-captura", {
                    url: "/formulario-captura",
                    templateUrl: "src/formulario/formulario-indicador/views/lista.html",
                    controller: "CapturaIndicadorCtrl"
                })
                .state("FORMULARIO_CAPTURA.formulario-captura-nuevo", {
                    url: "formulario-captura/nuevo",
                    templateUrl: "src/formulario/formulario-indicador/views/nuevo.html",
                    controller: "CapturaIndicadorCtrl"
                })
                .state("FORMULARIO_CAPTURA.formulario-captura-modificar", {
                    url: "/formulario-captura/modificar/:id",
                    templateUrl:
                        "src/formulario/formulario-indicador/views/modificar.html",
                    controller: "CapturaIndicadorCtrl"
                })
                .state("FORMULARIO_CAPTURA.formulario-captura-ver", {
                    url: "/formulario-captura/ver/:id",
                    templateUrl: "src/formulario/formulario-indicador/views/ver.html",
                    controller: "CapturaIndicadorCtrl"
                })

                .state("FORMULARIO_CAPTURA.formulario-captura-valor", {
                    url: "/formulario-captura-valor",
                    templateUrl: "src/formulario/formulario-captura/views/lista.html",
                    controller: "CapturaIndicadorCtrl"
                })
                .state("FORMULARIO_CAPTURA.formulario-captura-valor-nuevo", {
                    url: "/formulario-captura-valor/nuevo",
                    templateUrl: "src/formulario/formulario-captura/views/nuevo.html",
                    controller: "CapturaIndicadorCtrl"
                })
                .state("FORMULARIO_CAPTURA.formulario-captura-valor-modificar", {
                    url: "/formulario-captura-valor/modificar/:id",
                    templateUrl: "src/formulario/formulario-captura/views/modificar.html",
                    controller: "CapturaIndicadorCtrl"
                })
                .state("FORMULARIO_CAPTURA.formulario-captura-valor-ver", {
                    url: "/formulario-captura-valor/ver/:id",
                    templateUrl: "src/formulario/formulario-captura/views/ver.html",
                    controller: "CapturaIndicadorCtrl"
                });

            $httpProvider.interceptors.push(function (
                $rootScope,
                $q,
                $location,
                $localStorage,
                URLS
            ) {
                if (angular.isUndefined($localStorage.cium)) $localStorage.cium = {};

                return {
                    request: function (config) {
                        config.headers = config.headers || {};
                        if ($localStorage.cium.access_token) {
                            config.headers = {
                                Authorization: "Bearer " + $localStorage.cium.access_token,
                                "X-Usuario": $localStorage.cium.user_email,
                                Disponible: URLS.OAUTH_DISPONIBLE
                            };
                        }
                        return config;
                    },
                    responseError: function (response) {
                        if (response.status === 401 || response.status === 403) {
                            if (response.data.status == 403 || response.status === 403) {
                                var deferred = $q.defer();
                                var req = { config: response.config, deferred: deferred };
                                $rootScope.$broadcast("event:auth-loginRequired");
                                return deferred.promise;
                            } else {
                                if (response.data.error) {
                                    return response.data;
                                } else {
                                    $location.path("/signin");
                                }
                            }
                        }
                        return $q.reject(response);
                    }
                };
            });

            $translateProvider.useStaticFilesLoader({
                prefix: "src/app/i18n/",
                suffix: ".json"
            });

            $translateProvider.useLocalStorage();
            $translateProvider.preferredLanguage("es");
            $translateProvider.useSanitizeValueStrategy("escaped");
        });
})();
