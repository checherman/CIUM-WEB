# Tablero

## Objetivo

<p style="text-align: justify;">
El tablero es un menu en cual se puede acceder a las diferentes opciones de reportes que tiene el sistema, desde aca tambien se pueden crear las evaluaciones.
</p>


![](1-dashboard.png)

>**Pantalla de inicio**

> - 1.- Menu general
>>      1.1.- Menu lateral con acceso a los diferentes modulos
>>      1.2.- Nombre del modulo en pantalla, menu de ocultar/aparecer el menu lateral y maccion de ocultar/mostra textos de menu lateral
> - 2.- Menus de accesos rapidos, estan agrupados por tres tipos de cada uno, Procesos, Recurso y Plataforma Comunitaria
> - 3.- Acciones generales del dashboard
>>      3.1.- Botones reset solo disponibles para usuarios root, sirven para resetear los reportes que se utilizan para la creación de los gráficos

En este menu puede acceder a cada uno de los siguientes pantallas

["COBERTURA"](#cobertura) 
["CRITERIO"](#criterio) 
["INDICADOR"](#indicador) 
["GAUGE"](#gauge) 
["TABLA DINÁMICA"](#pivot) 
["TENDENCIAS"](#tendencia) 

## Filtros

<p style="text-align: justify;">
Antes de empezar a explicar los gráficos, es importante conocer como operan los filtros, los filtros son los mismos para cada tipo de reporte por eso se explica de manera general en esta sección
</p>
![](filtros.png)

>**Filtros**

> - 1.- Categorias de filtros
> - 2.- Botones de accion
>>      2.1.- Boton aplicar filtro, se utiliza para que cada vez que interactuemos con los filtros le demos aplicar y se construlla la consulta
>>      2.2.- Boton quitar filtro, se utiliza para restablecer el gráfico a estado original


## Filtros por periodo

<p style="text-align: justify;">
Esta opción se refiere a las fechas disponibles para aplicar en el filtro de cada gráfico.
</p>
![](filtros1.png)

>**Periodos**

> - 1.- AÑO: seleccion multiples de años que tengan una evaluacion
> - 2.- TRIMESTRE: Timestres disponibles del año seleccinado
> - 3.- RANGOS: Se pueden omitir los 2 primeros y seleccionar un rando de fechas que contempla el desde y el hasta

<p style="text-align: justify;">
Filtros por uno o mas indicadores, que esten diponibles en el año del filtro anterior.
</p>
![](filtros2.png)

>**Indicador**

> - 1.- Opciones de filtro
>>      1.1.- Ver todos sin ningun filtro de indicadores
>>      1.2.- Por indicador lista los indicadores disponibles para filtrado
> - 2.- Lista de indicadores se puede seleccionar multiples

<p style="text-align: justify;">
Filtrar por regiónes o niveles de cone
</p>
![](filtro3.png)

>**Parametros**

> - 1.- Opciones de filtro
>>      1.1.- Ver todos sin ningun filtro de parametros
>>      1.2.- Por filtro habilita las opciones disponibles para filtrado
> - 2.- Filtrado por nivel de CONE
> - 3.- Filtrado por Jurisdiccion
> - 4.- Filtrado por Municipio o Zona


## Cobertura
## Cobertura calidad
## Cobertura recurso
## Cobertura p c

<p style="text-align: justify;">
El gráfico de cobertura muestra las visitas que el equipo de seguramiento de la calidad ha realizado a una unidad médica, las normas estipulan que el equip debe ir una vez cada trimestre a una unidad, esto quiere decir que el grafico al inicio de trimestre estara en rojo pero al final del mismo estara en verde.
</p>
![](cobertura.png)

>**Cobertura**

> - 1.- Nombre del gráfico
> - 2.- Opciones del dato ["VER OPCIONES"](#cobertura-opciones) 
> - 3.- Área donde se muestra el dato en el formato seleccionado
> - 4.- Opciones rapidas de filtrado
> - 5.- Opciones de filtrado ["VER FILTROS"](#filtros) 


## Cobertura opciones

<p style="text-align: justify;">
Este gráfico tiene diferentes formas de mostrar la información
</p>
![](cobertura-opciones.png)

>**De izquierda a derecha**

> - 1.- Modo estricto
> - 2.- Mostrar los dastos en forma de pastel
![](cobertura-pastel.png)
> - 3.- Mostrar los datos en forma de mapa, solo si se tiene un plan de datos de parte del instituto
![](cobertura-mapa.png)
> - 4.- Mostrar los datos en forma de tabla, estos datos se pueden exportar a excel
![](cobertura-tabla.png)


## Criterio
## Criterio calidad
## Criterio recurso
## Criterio p c

<p style="text-align: justify;">
El gráfico de criterio muestra los indicadores evaluados y el porcentaje obtenido segun el filtro de estricto.
</p>
![](criterio.png)

>**Criterio**

> - 1.- Nombre del gráfico
> - 2.- Opciones del modo estricto y exportar a excel
> - 3.- Área donde se muestra el dato ["VER DESAGREGACIÓN"](#desagregacion-criterio) 
> - 4.- Opciones de filtrado ["VER FILTROS"](#filtros) 


## Desagregación criterio

<p style="text-align: justify;">
Este gráfico tiene desagregaciones, es decir se puede dar clic a cada elemento y mostra mas detalle de este
</p>
> - 1.- Listado de criterios del indicador y su porcentaje
![](criterio1.png)
> - 2.- Listado de jurisdicciones del criterio
![](criterio2.png)
> - 3.- Listado de CLUES de la jurisdicción
![](criterio3.png)
> - 4.- Listado de evaluaciones en el período
![](criterio4.png)
> - 5.- Evaluación correspondinte
![](criterio5.png)

## Indicador
## Indicador calidad
## Indicador recurso
## Indicador p c

<p style="text-align: justify;">
El gráfico de indicador muestra los indicadores evaluados y el porcentaje obtenido segun el filtro de estricto.
</p>
![](indicador.png)

>**Indicador**

> - 1.- Nombre del gráfico
> - 2.- Opciones del modo estricto y exportar a excel
> - 3.- Área donde se muestra el dato ["VER DESAGREGACIÓN"](#desagregacion-indicador) 
> - 4.- Opciones de filtrado ["VER FILTROS"](#filtros) 


## Desagregación

<p style="text-align: justify;">
Este gráfico tiene desagregaciones, es decir se puede dar clic a cada elemento y mostra mas detalle de este
</p>
> - 1.- Listado de jurisdicciones por nivel de CONE
![](indicador1.png)
> - 2.- Listado de unidades medicas evaluadas
![](indicador2.png)
> - 3.- Evaluación correspondinte
![](indicador3.png)


## Gauge
## Gauge calidad
## Gauge recurso
## Gauge p c

<p style="text-align: justify;">
El gráfico de gauge muestra los hallagazgos encontrados en el período de evaluaciones
</p>
![](gauge.png)

>**Gauge**

> - 1.- Nombre del gráfico
> - 2.- Opciones del modo estricto y cambiar a tabla
> - 3.- Área donde se muestra el dato 
> - 4.- Opciones de filtrado ["VER FILTROS"](#filtros) 


## Desagregación

<p style="text-align: justify;">
Este gráfico tiene infomación para mostrar en tabla que se puede exportar a excel
</p>
![](gauge1.png)


## Pivot
## Pivot calidad
## Pivot recurso
## Pivot p c

<p style="text-align: justify;">
Una tabla dinámica es un reporte deonde el usuario puede visualizar los datos segun el resultado de la interacción con los elementos, la tabla dinámica tiene 2 ejes para arrastrar y soltar los elemento y de esta forma contruir los datos, estos datos se pueden exportar a excel.
</p>
![](pivot.png)

>**Pivot**

> - 1.- Opciones de visualización del dato
> - 2.- Opciones de operaciones aritmeticas y logicas para el dato
> - 3.- Elementos disponibles (Corresponde a una columna de datos)
> - 4.- Eje y donde podemos arrastra uno o varios elementos
> - 5.- Eje x donde podemos arrastra uno o varios elementos

<p style="text-align: justify;">
Cada elemento tiene una opción de filtrado dandole clic en la flechita a lado del nombre
</p>
![](pivot1.png)


## Tendecia

<p style="text-align: justify;">
Este gráfico muestra la tendencia de los indicadores (PROCESO y RECURSO) a travez del tiempo 
</p>
![](tendencia.png)

>**Pivot**

> - 1.- Nombre del gráfico
> - 2.- Opciones de tabla y filtrado ["VER FILTROS"](#filtros) 
> - 3.- Datos mostrados en el gráfico ["VER"](#filtro-1-clic) 
> - 4.- Área donde se muestra el dato ["VER TABLA"](#tendencia-tabla) 

## Filtro 1 click

<p style="text-align: justify;">
Si al elemento se le da un click este desaparece del gráfico
![](tendencia1.png)

## Filtro 2 click

<p style="text-align: justify;">
Si al elemento se le da doble click el elemento se conserva en el gráfico y los demas desaparecen
![](tendencia2.png)

## Tendencia tabla

<p style="text-align: justify;">
Muestra los datos en forma de tabla
![](tendencia3.png)
