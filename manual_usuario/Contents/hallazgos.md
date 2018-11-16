# Hallazgos

<p style="text-align: justify;">
Hallazgos módulo que muestra de entrada los problemas principales actuales o historico segun el filtro por unidad médica, indicador y criterio.
Podemos acceder al modulo desde la pantalla de inicio "Reporte de hallazgos" o desde el menu lateral "Hallazgo".
</p>
![](hallazgo.png)

>**Pantalla de hallazgos**

> - 1.- Pestañas de opciones de mostrar la informacion ["INDICADOR"](#hallazgo-indicador) o ["UNIDADES MEDICAS"](#hallazgo-unidad-medica) 
> - 2.- Menu de acciones y filtro ["ACCION"](#hallazgo-accion) 
> - 3.- Información por indicadores
> - 4.- Acciones de filtrado
>>      4.1.- Cambiar tipo de evaluación
>>      4.2.- Ordenar Asc/Desc
>>      4.3.- Desagrupar/Agrupar.



## Hallazgo acción

<p style="text-align: justify;">
Estas acciones estan diponibles para la pantalla de hallazgos, de izquierda a derecha
</p>
![](hallazgo-accion.png)

>**Acciones**

> - 1.- Buscar, Activa el campo para buscar texto libre, puede ser una unidad medica, clues, jurisdicción, etc.
> - 2.- Filtros ["VER"](#hallazgo-filtros)
> - 3.- Indicadores con problemas ["VER"](#hallazgo-probelmas)
> - 4.- Historial muestra todos los indicadores con problemas desde el origen de los tiempos
> - 5.- Cambiar idioma
> - 6.- Ayuda
> - 7.- salir del sistema

## Hallazgo indicador

<p style="text-align: justify;">
La lista de indicadores es accecible y se puede desagregar pare ver el problema
</p>
![](hallazgo-accion.png)

>**Problemas**

> - 1.- Indicador, al hacer clic muestra la lista de hitos 
> - 2.- Hitos encontrados, al hacer clic muestra la lista de unidades que tiene el problema y al hacer click abre la evaluación
![](hallazgo-hito-um.png)


## Hallazgo unidad medica

<p style="text-align: justify;">
La lista de unidades medicas con problemas en las evaluaciones
</p>
![](hallazgo-um.png)



## Hallazgo Filtros

<p style="text-align: justify;">
Los filtros estan disponibles desde el menu de acciones en hallazgos
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
