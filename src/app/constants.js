(function() {
  "use strict";

  angular
    .module("App")
    .constant("MENU", [
      {
        grupo: false,
        lista: [
          {
            titulo: "Dashboard",
            key: "DashboardController.index",
            path: "/dashboard",
            icono: "view-grid"
          }
        ]
      },

      {
        grupo: "EVALUACION",
        lista: [
          {
            titulo: "RECURSO",
            key: "EvaluacionRecursoController.index",
            path: "/evaluacion-recurso",
            icono: "recurso"
          },
          {
            titulo: "CALIDAD",
            key: "EvaluacionCalidadController.index",
            path: "/evaluacion-calidad",
            icono: "quality"
          },
          {
            titulo: "PC",
            key: "EvaluacionPCController.index",
            path: "/evaluacion-p-c",
            icono: "home-assistant"
          },
          {
            titulo: "HALLAZGO",
            key: "EvaluacionController.index",
            path: "/hallazgo",
            icono: "view-list"
          }
        ]
      },
      {
        grupo: "FORMULARIO_CAPTURA",
        lista: [
          {
            titulo: "FORMULARIO",
            key: "FormularioCapturaController.index",
            path: "/formulario-captura",
            icono: "note-plus-outline"
          },
          {
            titulo: "CAPTURA",
            key: "FormularioCapturaValorController.index",
            path: "/formulario-captura-valor",
            icono: "note-plus"
          }
        ]
      },
      {
        grupo: "CATALOGO",
        lista: [
          {
            titulo: "NUEVA-PC-PRIORIZADA",
            key: "ComunidadPriorizadaController.index",
            path: "/comunidad-priorizada",
            icono: "priority-high"
          },
          {
            titulo: "ACCION",
            key: "AccionController.index",
            path: "/accion",
            icono: "spellcheck"
          },
          {
            titulo: "ALERTA",
            key: "AlertaController.index",
            path: "/alerta",
            icono: "alert"
          },
          {
            titulo: "Clues",
            key: "CluesController.index",
            path: "/clues",
            icono: "hospital"
          },
          {
            titulo: "CONE",
            key: "ConeController.index",
            path: "/cone",
            icono: "seat-flat"
          },
          {
            titulo: "ZONA",
            key: "ZonaController.index",
            path: "/zona",
            icono: "google-maps"
          },
          {
            titulo: "LUGAR-VERIFICACION",
            key: "LugarVerificacionController.index",
            path: "/lugar-verificacion",
            icono: "map-marker"
          },
          {
            titulo: "INDICADOR",
            key: "IndicadorController.index",
            path: "/indicador",
            icono: "calendar-multiple-check"
          },
          {
            titulo: "CRITERIO",
            key: "CriterioController.index",
            path: "/criterio",
            icono: "content-paste"
          },
          {
            titulo: "PLAZO-ACCION",
            key: "PlazoAccionController.index",
            path: "/plazo-accion",
            icono: "calendar-clock"
          },
          {
            titulo: "VERSION-APP",
            key: "VersionAppController.index",
            path: "/versionApp",
            icono: "android"
          }
        ]
      },
      {
        grupo: "SISTEMA",
        lista: [
          {
            titulo: "Modulo",
            key: "SisModuloController.index",
            path: "/modulo",
            icono: "apps"
          },
          {
            titulo: "Grupo",
            key: "SisGrupoController.index",
            path: "/grupo",
            icono: "group"
          },
          {
            titulo: "Usuarios",
            key: "SisUsuarioController.index",
            path: "/usuario",
            icono: "account-multiple"
          }
        ]
      }
    ]);
  angular
    .module("App")
    .constant("MENU_PUBLICO", [
      { icono: "exit-to-app", titulo: "INICIAR_SESION", path: "signin" },
      { icono: "information-outline", titulo: "QUE_ES_APP", path: "que-es" }
    ]);

  angular
    .module("App")
    .constant("TIPOS", [
      { id: "time", nombre: "Hora" },
      { id: "date", nombre: "Fecha" },
      { id: "number", nombre: "Numero" },
      { id: "boolean", nombre: "Falso/Verdadero" }
    ]);

  angular
    .module("App")
    .constant("UNIDAD_MEDIDA", [
      { id: "", nombre: "Ninguno" },
      { id: "secs", nombre: "Segundos" },
      { id: "mins", nombre: "Minutos" },
      { id: "hours", nombre: "Horas" },
      { id: "days", nombre: "Dias" },
      { id: "weeks", nombre: "Semana" },
      { id: "months", nombre: " Meses" },
      { id: "2months", nombre: "Bimestre" },
      { id: "3months", nombre: "Trimestre" },
      { id: "6months", nombre: "Semestre" },
      { id: "years", nombre: "Año" }
    ]);

  angular
    .module("App")
    .constant("OPERADOR_LOGICO", [
      { id: "<", nombre: "Menor que" },
      { id: ">", nombre: "Mayor que" },
      { id: "<=", nombre: "Menor igual que" },
      { id: ">=", nombre: "Mayor igual que" },
      { id: "<>", nombre: "Diferente de" },
      { id: "=", nombre: "Igual a" }
    ]);

  angular
    .module("App")
    .constant("OPERADOR_ARITMETICO", [
      { id: "-", nombre: "Resta" },
      { id: "+", nombre: "Suma" }
    ]);
})();
