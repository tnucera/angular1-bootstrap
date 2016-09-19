module.exports = (function () {
    'use strict';

    var colors = require('colors');
    var moment = require('moment');

    ///////////////////////////////////
    // Public methods
    ///////////////////////////////////

    return {
        log: log,
        logWithTime: logWithTime,
        logDuration: logDuration,
        error: error
    };

    function log(message, prefix) {
        console.log(getMessage(message, prefix));
    }

    function logWithTime(message) {
        console.log();
        log(message, moment().format('HH:mm:ss').yellow);
        console.log();
    }

    function logDuration(startDate) {
        var duration = moment().diff(startDate, 'seconds', true).toFixed(2);
        var label = "second";
        if (duration >= 2.00) {
            label += "s";
        }

        log((duration + " " + label).gray);
    }

    function error(message, prefix) {
        console.error("ERR!".bgRed);
        console.error(getMessage(message, prefix));
    }

    ///////////////////////////////////
    // Private methods
    ///////////////////////////////////

    function getMessage(message, prefix) {
        var res = message;
        if (prefix) {
            res = "[" + prefix.blue + "] " + message;
        }

        return res;
    }

})();
