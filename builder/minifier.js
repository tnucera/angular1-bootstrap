module.exports = (function () {
    'use strict';

    var sass = require('node-sass');
    var fs = require('fs');
    var compressor = require('node-minify');
    var colors = require('colors');
    var logger = require('./logger.js');

    ///////////////////////////////////
    // Public methods
    ///////////////////////////////////

    return {
        scss: scss,
        js: js
    };

    function scss(fileIn, fileOut, callback) {
        sass.render({
            file: fileIn,
            outputStyle: 'compressed'
        }, function (err, result) {
            if (err) return logger.error(err);

            // No errors during the compilation, write this result on the disk
            fs.writeFile(fileOut, result.css, function (err) {
                if (err) return logger.error(err);

                if (callback) callback(fileOut);
            });
        });
    }

    function js(fileIn, fileOut, callback) {
        new compressor.minify({
            type: 'uglifyjs',
            fileIn: fileIn,
            fileOut: fileOut,
            options: ['--compress'],
            callback: function (err, content) {
                if (err) return logger.error(err);

                if (callback) callback(fileOut);
            }
        });
    }

    ///////////////////////////////////
    // Private methods
    ///////////////////////////////////

})();
