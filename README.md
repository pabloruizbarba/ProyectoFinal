# Proyecto Final
El presente proyecto consta de un backend realizado en Django,
y un frontend realizado en React,
Para ponerlo en funcionamiento necesitamos hacer 4 cosas:
- Clonar el repositorio a nuestro ordenador.
- Instalar lo necesario para ejecutar el servidor Django.
- Instalar lo necesario para ejecutar el código React.
- Lanzamiento.

Explicaré el procedimiento para Linux.

## Clonar el repositorio
En GitHub.com, navegamos a la página principal del repositorio. Encima de 
la lista de archivos, hacemos clic en  Código.

Copiamos la dirección URL del repositorio.

- Para clonar el repositorio con HTTPS, en «HTTPS» hacemos clic en copiar.
- Para clonar el repositorio mediante una clave SSH, incluido un certificado 
emitido por la entidad de certificación SSH de la organización, hacemos clic en 
Usar SSH y luego en copiar.
-Para clonar un repositorio mediante GitHub CLI, hacemos clic en GitHub CLI y, 
después, haz clic en copiar.

Abrimos el terminal.Cambiamos el directorio de trabajo actual a la ubicación 
en donde queramos clonar el repositorio. Escribimos git clone y pegamos la 
dirección URL que hemos copiado antes.
```sh
$ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
```
Presionamos **Enter** para crear el clon local.
```sh
$ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
> Cloning into `Spoon-Knife`...
> remote: Counting objects: 10, done.
> remote: Compressing objects: 100% (8/8), done.
> remove: Total 10 (delta 1), reused 10 (delta 1)
> Unpacking objects: 100% (10/10), done.
```
Con estos sencillos pasos hemos clonado el repositorio en nuestra máquina.

## Backend
El requisito previo es tener instalado MariaDB, para ello, desde el terminal de 
Linux, escribiremos:
```sh
$ sudo apt install mariadb-server
```
Una vez instalado, necesitamos configurarlo:
```sh
$ mysql_secure_installation
```
Seguiremos los siguientes pasos:
```sh
Enter current password for root (enter for none): Enter
Set root password? [Y/n] Y
Remove anonymous users? [Y/n] Y
Disallow root login remotely? [Y/n] Y
Remove test database and access to it? [Y/n] Y
Reload privilege tables now? [Y/n] Y
```
Una vez hecho esto, cuando queramos acceder a MariaDB escribiremos
```sh
$ mysql -u root -p
```
Ahora que tenemos instalado MariaDB, podemos continuar con nuestro servidor Django.

Primero instalaremos el gestor de paquetes y librerías pip3. Para ello, desde el 
terminal, escribimos:
```sh
$ sudo apt-get update
$ sudo apt-get install python3-pip
```
A continuación instalamos el paquete pymysql:
```sh
$ pip3 install pymysql
```
Para importar la base de datos, nos situaremos en el directorio en el que se 
encuentra el archivo manage.py y usaremos los siguientes comandos:
```sh
python3 manage.py makemigrations
python3 manage.py migrate
```
Otra forma de hacer esto, sería ejecutar en MariaDB los comandos de creación 
de base de datos y tablas incluidos en el archivo database.sql del repositorio, 
para crear la base de datos en nuestra máquina, y a continuación desde la terminal, 
situados en el mismo directorio que manage.py, escribimos:
```sh
python3 manage.py inspectdb > webserviceapp/models.py
```
En caso de no tenerlas, también habrá que instalar mediante el comando pip
todas las librerías importadas en el archivo views.py.

## Frontend
Una vez clonado el repositorio, desde la terminal nos situamos en la carpeta 
frontend de nuestro repositorio.

Para instalar npm en linux, usamos el siguiente comando:
```sh
$ sudo apt install npm
``` 
Y a continuación:
```sh
$ npm install
```

## Lanzamiento

Primero lanzaremos el servidor Django. Nos situamos en el mismo directorio
que el archivo manage.py y escribimos:
```sh
python3 manage.py runserver 0.0.0.0:8000
```
En el caso de que falle, será necesario instalar cors:
```sh
$ python -m pip3 install django-cors-headers
```
Y a continuación volvemos a lanzar el servidor Django.

Una vez hecho, desde otra terminal, nos situamos en la carpeta frontend 
y tecleamos:
```sh
npm run star
```
Si no sucede nada raro, debería abrirse una ventana de nuestro navegador web
con la página de inicio del sitio web.
