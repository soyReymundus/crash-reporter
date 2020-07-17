# Generador de Crash Report

Esta libreria contiene una unica clase capaz de generar reportes de errores.

## Ejemplos

Generar reporte y cerrar app:
```js
const Reporter = require("@toelf/crash-reporter");

process.on("uncaughtException", (exception) => {
    let currentError = new Reporter(exception); //Inicializo la clase.
    currentError.createReport(true); //Creo el reporte y cierro la app.
});
```

Generar reporte y **NO** cerrar app:
```js
const Reporter = require("@toelf/crash-reporter");

process.on("uncaughtException", (exception) => {
    let currentError = new Reporter(exception); //Inicializo la clase.
    currentError.createReport(false); //Creo el reporte y cierro la app.
});
```

## Documentacion

### Class `Reporter(Error[, Date])`
- Error [Error](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Error) Error no capturado usado para generar el reporte.
- Date [Date](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date) Fecha en la que ocurrio el error, se genera una utomaticamente.

Clase capaz de generar un Crash Report.

#### `Reporter.createReport([Exit])`
- Exit [Bool](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Boolean) Booleano que determina si finalizar por el error la aplicacion o no. 

Creas archivo de reporte y tienes la opcion de finalizar la aplicacion.

#### `Reporter.actionsAndLogs(Error[, Exit][, Code])`
- Error [Error](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Error) Error a mostrar.
- Exit [Bool](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Boolean) Este booleano esta para saber si cerrar la app o no.
- Code [Number](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Number) Codigo de salida.

Muestra en la consola el error y puede cerrar la aplicacion.

#### `Reporter.date`
- [Date](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Date)

Fecha en la que ocurrio el error.

#### `Reporter.error`
- [Error](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Error)

Error no capturado usado para generar el reporte.

#### `Reporter.filePath`
- [String](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String)

Carpeta donde se ba a guardar el archivo del reporte.

#### `Reporter.fileName`
- [String](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/String)

Nombre del archivo donde se guardara el reporte.

#### `Reporter.report`
- [Object](https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Object)

El reporte que se guardara en el archivo.