# POC WORDLE

Prueba tecnica para DD3 usando nodejs

## Comenzando 🚀

Usando git en tu maquina local debes de clonar el proyecto y moverte a la rama dev.

```
git clone https://github.com/hitzu/dd3.git
git checkout dev
```

### Pre-requisitos 📋

1. [NodeJs](https://nodejs.org/es/download/)

### Instalación 🔧

Usando el gestor de archivos [NPM](https://www.npmjs.com/) que viene incluido con nodejs y posicionando la consola en la raiz de proyecto vamos a installar todas las dependencias del proyecto usando el comando:

```
npm install
```

Esto nos generara la carpeta node_modules y el archivo package_lock.json

### Correr proyecto 🏃‍♂️

Usando los scripts que tenemos en el archivo packaje.json:

Levantaremos una base de datos local con docker compose, correremos los migrations y los seeds con el siguiente comando (requisito tener docker compose instalado en nuestra computadora)

```
npm run install
```

Y ahora levantaremos nuestro server usando nodemon para agilizar el desarrollo

```
npm run start
```

## Definicion de rutas 🍻

1. login: permite obtener un token para hacer uso del sistema: (podemos ver la informacion de los usuarios dados de alta en la carpeta /src/orm/seeds/1590519635401-SeedUsers.ts)

```
POST
/auth/login
{
    "email" : "admin@admin.com",
    "password" : "pass1"
}
```

A partir de este momento todos los endpoints cuentan con una proteccion a nivel de servicio.

se debera incluir en los header el campo authorization y el token que nos es devuelto en el servicio 1

```
authorization : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbmNyeXB0ZWQiOiJVMkZzZEdWa1gxOXlmY0ZZWE9lVVVvcGs0YThleE1aYjR2ZWdKWE15eDd5N29GTUIvVmlqV3ZSd2l2OU5IeFdXZVB2em56NDBmc3YrOVlEUkpGb2JhbjN5QmJrS08rc3VKSnasdasdhzbXJpb1BtcnZ6bUgvVVk1Y3pCZll5dmluZ0dJOCIsImlhdCI6MTY2MTg5NTMwNywiZXhwIjoxNjYyMDAzMzA3fQ.YEbftnMH9JsJasd_PacWkCEhhcRBumNCGasdasdplU-V5gauhocI
```

2. play/word: Nos pedira una palabra y nos indicara los aciertos y errores que tuvimos al intentar adivinar usando el sistema de puntuaciones dado en la prueba tecnica, si tenemos el maximo de intentos o ya adivinamos la palabra nos mostrara un mensaje de error

```
GET
/play/word?word=perro
```

3. report/user: Nos brinda la informacion de juegos y de juegos ganados que ha realizado el usuario seleccionado.

```
GET
/report/user?userId=1
```

4. report/top-ten-user: Nos brinda los mejores 10 jugadores a partir de palabras adivinadas.

```
GET
/report/top-user
```

5. report/top-ten-wors: Nos brinda las 10 cartas que se han adivinado

```
GET
/report/word
```

## Documentacion 📖

Con el servidor levantado podras visitar la pagina localhost:400/api-docs/ para visualizar la documentación

## Ejecutando las pruebas ⚙️

```
npm run test
```

Se ejecutara el contenido dentro de la carpeta test.

### Y las pruebas de estilo de codificación ⌨️

Usando el package [linter](https://www.npmjs.com/package/eslint) y apoyandonos de [NPM](https://www.npmjs.com/) podemos ejecutar el script que puede corregir el formato de codigo (cambiar " por ', poner , al final de un objeto json, poner ; al final de sentencias etc...) y señala los errores que no pueden ser corregidos automaticamente (variables no usadas etc...) usando el comando:

```
npm run lint-fix
```

## Construido con 🛠️

Las herramientas que utilizadas para este proyecto

- [NPM](https://www.npmjs.com/) Manejador de dependencias
- [DOCKER](https://hub.docker.com/_/postgres) Levanta base de datos sin necesidad de instalar y portables
- [Express](https://expressjs.com/) - framework que permite levantar un servidor rest
- [joi](https://www.npmjs.com/package/joi) - Validador de payload y response
- [joi-to-swagger](https://www.npmjs.com/package/joi-to-swagger) - Permite generar documentacion a partir de los archivos de validacion.
- [supertest](https://www.npmjs.com/package/supertest) Se usa para lanzar peticiones y brinda herramientas para hacer test automaticos
  _[jest](https://www.npmjs.com/package/jest) Permite lanzar test mediante comandos npm
  _[husky](https://www.npmjs.com/package/husky) Utilizando los hooks de git permite lanzar comados npm, en este caso pre-commit lanza npm run lint-fix para corregir errores de codigo y pre-push lanza npm run test para hacer los test automaticos.

## Autores ✒️

- **Roberto Guillermo Torres Lopez** - _Trabajo Inicial_ - [github](https://github.com/hitzu)

## Licencia 📄

Este proyecto está bajo la Licencia (ISC)

## Expresiones de Gratitud 🎁

- Gracias por la oportunidad.
