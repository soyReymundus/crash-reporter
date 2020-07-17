/**
 * @fileoverview Contiene una clase capaz de generar un reporte en caso de que se genere una exepcion no capturada!
 * @version 1.0.0
 * @author Reymundus <arceleandro@protonmail.com>
 */
'use strict';
const { appendFileSync, mkdirSync, existsSync } = require("fs");
const os = require("os");
const { resolve } = require("path");

module.exports = class {
    /**
     * 
     * @param {Error} err Error no capturado usado para generar el reporte.
     * @param {Date?} date Fecha en la que ocurrio el error, se genera una utomaticamente.
     */
    constructor(err, date = new Date()) {
        if (!err || !err.message || !err.stack || !err.name) throw new Error("fakeCrashReport");

        /**
         * Fecha en la que ocurrio el error.
         * @type {Date}
         */
        this.date = date;

        /**
         * Error no capturado usado para generar el reporte.
         * @type {Error}
         */
        this.error = err;

        /**
         * Carpeta donde se ba a guardar el archivo del reporte.
         * @type {String}
         */
        this.filePath = "crash-reports";

        /**
         * Nombre del archivo donde se guardara el reporte.
         * @type {String}
         */
        this.fileName = "crash-" + this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate() + "_" + this.date.getHours() + "." + this.date.getMinutes() + "." + this.date.getSeconds() + ".json";

        /**
         * El reporte que se guardara en el archivo.
         * @type {Object}
         */
        this.report = {};
    };

    /**
     * Creas archivo de reporte y tienes la opcion de finalizar la aplicacion.
     * @param {Boolean} exit Booleano que determina si finalizar por el error la aplicacion o no. 
     * @returns {void}
     */
    createReport(exit = true) {
        this.createHeader();
        this.createJavascriptStack();
        this.setProcessProperties();
        if (!existsSync(resolve(this.filePath + "/"))) mkdirSync(resolve(this.filePath));
        appendFileSync(resolve(this.filePath + "/" + this.fileName), JSON.stringify(this.report));
        if (exit) this.actionsAndLogs();
    };

    /**
     * Muestra en la consola el error y puede cerrar la aplicacion.
     * @param {Date} err Error a mostrar.
     * @param {Boolean} exitApp Este booleano esta para saber si cerrar la app o no.
     * @param {Number} exitCode Codigo de salida.
     * @returns {void}
     */
    actionsAndLogs(err, exitApp = true, exitCode = -1) {
        var error = err;
        if (!err) error = this.error;
        console.error(error.stack);
        if (exitApp) {
            process.exit(exitCode)
        };
    };

    setProcessProperties() {
        this.report["resourceUsage"] = process.resourceUsage();
        this.report["environmentVariables"] = process.env;
        return { "environmentVariables": process.env, "resourceUsage": process.resourceUsage() };
    };

    createJavascriptStack(err) {
        let errorCache = err;
        if (!err) errorCache = this.error;
        this.report["javascriptStack"] = {
            "name": errorCache.name,
            "message": errorCache.message,
            "stack": errorCache.stack
        };
        return this.report["javascriptStack"];
    };

    createHeader() {
        this.report["header"] = {
            "reportVersion": 1,
            "event": "exception",
            "trigger": this.error.name,
            "filename": this.fileName,
            "dumpEventTime": this.date.getFullYear() + "-" + (this.date.getMonth() + 1) + "-" + this.date.getDate() + "T" + this.date.getHours() + ":" + this.date.getMinutes() + ":" + this.date.getSeconds() + "Z",
            "dumpEventTimeStamp": this.date.getTime(),
            "processId": process.pid,
            "cwd": process.cwd(),
            "commandLine": process.argv,
            "nodejsVersion": process.version,
            "glibcVersionRuntime": "2.17",
            "glibcVersionCompiler": "2.17",
            "wordSize": process.arch + " bit",
            "arch": "x" + process.arch,
            "platform": process.platform,
            "componentVersions": process.versions,
            "release": process.release,
            "osName": os.type(),
            "osRelease": os.release(),
            "osVersion": os.version,
            "osMachine": os.arch(),
            "cpus": os.cpus(),
            "networkInterfaces": os.networkInterfaces(),
            "host": os.hostname()
        };
        return this.report["header"];
    };

};