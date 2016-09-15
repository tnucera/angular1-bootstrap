(function () {
    'use strict';

    var args = process.argv.slice(2);

    var watch = require('node-watch');
    var colors = require('colors');
    var moment = require('moment');
    var cp = require('child_process');
    var bs = require('browser-sync').create();

    // First argument = serve
    if (args[0] && args[0] === 'serve') {
        // Launch browser-sync server
        bs.init({
            server: __dirname + '/../dist',
            ui: false
        });
    }

    function exec(filename, command, args) {
        console.log((("\n[" + moment().format('HH:mm:ss') + "] ").bold + filename).yellow);
        var child = cp.spawn(command, args, {stdio: 'inherit'});
        child.on('close', function (exitCode) {
            if (child.stdout) console.log(child.stdout);
            if (child.stderr) console.log(child.stderr);
            bs.reload();
        });
    }

    watch(['src'], function (filename) {
        if (/\.js$/.test(filename) && !/\.spec\.js$/.test(filename)) {
            // *.js without *.spec.js
            exec(filename, 'npm', ['run', 'build-dev:inject']);
        } else if (/\.scss/.test(filename)) {
            // *.scss
            if (!/vendor\.scss$/.test(filename)) {
                // *.scss without vendor.scss
                exec(filename, 'npm', ['run', 'build:assets:css:make:compile:index']);
            } else {
                // vendor.scss
                exec(filename, 'npm', ['run', 'build:assets:css:make:compile:vendor']);
            }
        }
    });

})();
