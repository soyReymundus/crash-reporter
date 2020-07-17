const Reporter = require("@toelf/crash-reporter");

process.on("uncaughtException", (exception) => {
    let currentError = new Reporter(exception);
    currentError.createReport(false);
});