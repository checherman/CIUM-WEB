# Catálogos


<p style="text-align: justify;">
En términos generales, un catálogo es la lista ordenada o clasificada que se hará sobre los datos que necesita el sistema para operar. Normalmente estos catálogos no cambian su contenido. Se crean una sola vez y después se utilizan muchas veces en operaciones y reportes.
<br>
Todos los módulos tiene un listado con las opciones como se describen. ["VER"](#caatalogos-listado) 
<br>
<br>
Todos los formularios tiene los elementos como se describen. ["VER"](#caatalogos-formulario) 
<br>
</p>

## Catálogos listado

![](sistema-lista.png)

>**Listado**

> - 1.- Nombre del modulo
> - 2.- Acciones en el modulo
> - 3.- Datos 
> - 4.- Acciones por registro
> - 4.- Paginación

<p style="text-align: justify;">
Acciones del modulo de izquierda a derecha
</p>
![](sistema-lista-accion.png)

> - 1.- Buscar
> - 2.- Actualizar cargar de nuevo los datos
> - 3.- Ir a formulario nuevo
> - 4.- Cambiar idioma
> - 5.- Ayuda
> - 6.- Salir del sistema


![](sistema-lista-buscar.png)

>**Listado buscar**

> - 1.- Regresar y restablecer las opciones
> - 2.- Campo de busqueda: escribir y dar enter para iniciar la busqueda

>**Listado actualizar**

> - 1.- Actualizar cargar de nuevo los datos

>**Listado nuevo**

> - 1.- Ir al formulario de nuevo elemento

![](sistema-lista-registro.png)

>**Listado aciones por registro**

> - 1.- Abrir el registro para visualizar la informacion e imprimir
> - 2.- Abrir el regsitro para ser editado
> - 2.- Eliminar el regsitro 

![](sistema-lista-paginacion.png)

>**Listado paginación**

> - 1.- Numero de registros por pagina
> - 2.- Numero total de paginas y registros
> - 2.- Botones de adelantar y regresar entre los registros

## Catálogos formulario

![](sistema-form.png)

>**Formulario**

> - 1.- Nombre del modulo
> - 2.- Acciones en el módulo
> - 3.- Datos (Formulario)
> - 4.- Si es en edición o ver agregar nuevo

<p style="text-align: justify;">
Acciones del modulo de izquierda a derecha
</p>
![](sistema-form-accion.png)

> - 1.- Regresar a la lista
> - 2.- Guardar los datos del formulario
> - 3.- Si esta en edicion ir a ver (Viseversa)
> - 4.- Si esta en edicion o ver puede eliminar
> - 5.- Cambiar idioma
> - 6.- Ayuda
> - 7.- Salir del sistema


## Comunidad priorizada


<p style="text-align: justify;">
Las comunidades priorizadas es un catalogo para la evaluacion de plataforma comunitaria, aca se especifica el numero a cubrir en el año y este dato sirve de numerador para los reportes
</p>

![](comunidad-priorizada.png)

>**Crear / Editar**

> - 1.- Año
> - 2.- Numero de comunidades priorizadas en el año
> - 3.- Lista de clues qeu contempla
> - 4.- Busqueda de clues 
> - 5.- Datos de las clues
> - 6.- Quitar de la lista


## Acciones


<p style="text-align: justify;">
Acciones contiene todos los datos a seleccionar cuando en una evaluación se encuentra un hallazgo. 
</p>

![](accion.png)

>**Crear / Editar**

> - 1.- Nombre de la accion
> - 2.- Tipo de acción

## Alertas


<p style="text-align: justify;">
Alerta contiene todos los datos a seleccionar para identifcar las alertas por el valor que tome los indicadores en las evaluaciones. 
</p>


![](alerta.png)

>**Crear / Editar**

> - 1.- Nombre de la alerta
> - 2.- Color, esta dividido en 3 slide Rojo, Verde y Azul

## Clues


<p style="text-align: justify;">
Clues contiene un listado de todas las unidades medicas con su informacion de la ficha tecnica. clues solo cuenta con 2 secciones listado y ficha tecnica para 
crear o modificar solicitarlo al administrador de los catalosgos de la seceretaia de salud
</p>

![](clues.png)


## Cone


<p style="text-align: justify;">
Cone (Cuidado obstétrico y neonatal esencial) este catálogo agrupa las unidades medicas, es de suma importancia ya que todo los criterios dependen del nivel de cone de cada unidad médica. 
</p>

![](cone.png)

>**Crear / Editar**

> - 1.- Nombre del cone
> - 2.- Buscar unidades medicas
> - 3.- Lista de unidades medicas que perteneceran a este nivel de cone
> - 4.- Quitar de la lista

## Zona


<p style="text-align: justify;">
Zona este catálogo contiene las zonas y las unidades médicas que la conforman, Debido a que cada zona puede tener muchas unidades médiacas y para no hacer tardio la carga del listado se recomienda descargar el listado y depues hacer un recorrido de cada uno de los resultados para extraer los datos del metodo show.
</p>

![](zona.png)

>**Crear / Editar**

> - 1.- Nombre del cone
> - 2.- Buscar unidades medicas
> - 3.- Lista de unidades medicas que perteneceran a este nivel de cone
> - 4.- Quitar de la lista



## Lugar de Verificación


<p style="text-align: justify;">
LugarVerificacion este catálogo contiene los lugares de verificacion para agrupar los criterios de cada indicador para las unidades médicas.
</p>

![](-verificacion.png)

>**Crear / Editar**

> - 1.- Nombre del lugar de verificación
> - 2.- Tipo de evaluación


## Indicador


<p style="text-align: justify;">
Indicador este catálogo contiene todos los indicadores para generar las evaluaciones. Se relaciona con alertaIndicador para generar los colores segun el porcentaje obtenido.
</p>

![](indicador-form.png)

>**Pestaña general**

> - 1.- Pestañas de opciones
> - 2.- Codigo del indicador
> - 3.- Nombre del indicador 
> - 4.- Categoria para la evaluación que estará disponible
> - 5.- color para identificar el indicador


![](indicador-alertas.png)

>**Pestaña alertas**

> - 6.- Agregar una alerta
> - 7.- Limpiar todas las alertas
> - 8.- Rango minimo
> - 9.- Rango maximo
> - 10.- Color
> - 11.- Quitar alerta

![](indicador-validacion.png)

>**Pestaña validacion**

> - 12.- Pestañas de opciones
> - 13.- Agregar una pregunta
> - 14.- Limpiar todas las preguntas
> - 15.- Pregunta
> - 16.- Tipo de campo para la respuesta
> - 17.- Es una valor constante o variable
> - 18.- Si es de tipo fecha esta correspondera a la fecha del sistema
> - 19.- Quitar pregunta

![](indicador-validacion-formula.png)

>**Pestaña validacion formula**

> - 20.- Agregar una formula
> - 21.- Limpiar las formulas
> - 22.- Probar la formula
> - 23.- Pregunta 1
> - 24.- Operacion aritmetica
> - 25.- Pregunta 2
> - 26.- Unidd de medida para el resultado
> - 27.- Operador logico de comparacion
> - 28.- Valor a comparar
> - 29.- Quitar la formula


![](indicador-indicacion.png)

>**Pestaña indicaciones**

<p style="text-align: justify;">
Aca se escribe una indicación para el evaluador en caso del que el indicador tenga complejidad y se necesite aclarar la fuente de datos
</p>


## Criterio


<p style="text-align: justify;">
Criterio este catálogo contiene todos los puntos a evaluar se relaciona con indicador, cone y lugar de verificación para obtener el listado correspondiente a cada de las unidades médicas, el lugar de verificación sirve para agrupar los criterios. 
</p>


![](ccriterio.png)

>**Crear / Editar**

> - 1.- Pestañas de opciones
> - 2.- Nombre del criterio
> - 3.- Orden en el que aprecera en las evaluaciones
> - 4.- Tipo de campo para la entrad de valor
> - 5.- Habilitar el no aplica en una evaluación
> - 6.- Tipo de evaluacion disponible
> - 7.- Seleccionar el indicador para el que va estar disponible
> - 8.- Niveles de cone para el que va estar disponible
> - 9.- Lugar de verificacion para agrupacion de criterios


>**Validacion preguntas**

<p style="text-align: justify;">
Un criterio puede tener formulas para determinar su valor, y funciona igual que las del indicador
</p>

## Plazo acción


<p style="text-align: justify;">
Plazo accion este catálogo contiene dias en que sera resolutivo un hallazgo en una unidad medica
</p>

![](plazo.png)

>**Crear / Editar**

> - 1.- Nombre del plazo de la acción
> - 2.- Valor dependiendo del tipo
> - 3.- Tipo (tiempo)


## Versión app


<p style="text-align: justify;">
Aca se maneja el control de versionamiento de la app movil (Se carga el apk)
</p>

![](app.png)

>**Crear / Editar**

> - 1.- Seleccionar el apk a subir
> - 2.- Nombre del path en el servidor
> - 3.- Versión de la app
> - 3.- Versión de la base de datos
> - 3.- Descripción de los cambios


