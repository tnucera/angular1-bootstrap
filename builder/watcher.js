(function () {
    var watch = require('node-watch');
    var colors = require('colors');
    var moment = require('moment');
    var cp = require('child_process');

    function exec(filename, command, args) {
        console.log(("[" + moment().format('HH:mm:ss') + "] ").grey.bold + filename);
        var child = cp.spawn(command, args, {stdio: 'inherit'});
        if (child.stdout) return console.log(child.stdout);
    }

    watch(['node_modules', 'src'], function (filename) {
        if (/\.js$/.test(filename) && !/\.spec\.js$/.test(filename)) { // *.js without *.spec.js
            exec(filename, 'npm', ['run', 'build-dev:inject']);
        } else if (/\.scss$/.test(filename)) { // *.scss
            if (/^src\//.test(filename) && !/vendor\.scss$/.test(filename)) { // *.scss in src/ without vendor.scss
                exec(filename, 'npm', ['run', 'build:assets:css:make:compile:index']);
            } else if (/^node_modules\//.test(filename) || /vendor\.scss$/.test(filename)) { // *.scss in node_modules/ or vendor.scss
                exec(filename, 'npm', ['run', 'build:assets:css:make:compile:vendor']);
            }
        }
    });
})();
