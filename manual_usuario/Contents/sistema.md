# Sistema


<p style="text-align: justify;">
En este apartado esta todo lo relacionado con el usuario, grupos y acciones. se pueden configurara permisos por acción lo que hace mas seguro y mas robusto el modelo de permisos.
<br>
Todos los módulos tiene un listado con las opciones como se describen. ["VER"](#sistema-listado) 
<br>
<br>
Todos los formularios tiene los elementos como se describen. ["VER"](#sistema-formulario) 
<br>
</p>

## Sistema listado

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

## Sistema formulario

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

## Modulos


<p style="text-align: justify;">
Aca se administra el catalogo de modulos y acciones para cada modulo, que conformaran un permiso disponible para crear un grupo
</p>

![](sistema-modulos.png)

>**Listado**

> - 1.- Nombre del modulo
> - 2.- Nombre del controlador asociado en la API
> - 3.- Catálogo al que pertenece
> - 4.- Tiene vista y si esta disponible para todos o es permiso especial
> - 5.- Metodos (Acciones)
> - 6.- Agregar, default y limpiar los metodos
> - 7.- Nombre de la acción
> - 8.- Metodo en la API asociado a la acción
> - 9.- Tipo de petición para las cabeceras
> - 10.- Si es permiso especial disponible solo para root


## Grupos


<p style="text-align: justify;">
Aca se administra el catalogo de grupos que contendran las acciones por modulo que tendra acceso el usuario
</p>

![](sistema-grupos.png)

>**Listado**

> - 1.- Nombre del grupo
> - 2.- Agrupación de los módulos
> - 3.- Nombre del modulo
> - 4.- Acciones del módulo



## Usuarios


<p style="text-align: justify;">
Aca se administra el catalogo de usuarios
</p>

![](sistema-usuarios.png)

>**Listado**

> - 1.- Pestaña datos generales y grupos
> - 2.- Nombre del usuario
> - 3.- Correo electronico
> - 4.- Apodo o username
> - 5.- Cambiar contraseña
> - 6.- Contraseña
> - 7.- Repetir contraseña
> - 8.- Ultimo acceso al sistema
> - 9.- Si el usuario esta activo
> - 10.- Si el usuario valido el correo al momento del alta
> - 11.- Si el susuario tendra privilegios de super
> - 12.- Foto del usuario
> - 13.- Avatar del usuario este es una URL
