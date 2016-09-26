(function () {
    'use strict';

    var program = require('commander');
    var moment = require('moment');
    var logger = require('./logger.js');
    var cleaner = require('./cleaner.js');
    var builderCss = require('./builder-css.js');
    var builderFonts = require('./builder-fonts.js');
    var builderHtml = require('./builder-html.js');
    var builderImages = require('./builder-images.js');
    var builderJs = require('./builder-js.js');
    var injector = require('./injector.js');
    var watcher = require('./watcher.js');

    var startDate = moment();
    process.on('exit', function () {
        logger.logDuration(startDate);
    });

    program
        .command('build')
        .description("build sources")
        .option('-d, --dev', "dev environment")
        .action(function (options) {
            cleaner.clean();
            builderFonts.build();
            builderCss.build();

            if (options.dev) {
                builderImages.build(true);
                builderCss.build();
                injector.inject();
            } else {
                builderImages.build();
                builderJs.build();
                builderHtml.build();
            }
        });

    program
        .command('inject')
        .description("inject file references into index.html")
        .action(function () {
            injector.inject();
        });

    program
        .command('watch')
        .description('watch sources')
        .option('-s, --serve', "launch browser-sync server")
        .action(function (options) {
            if (options.serve) {
                watcher.serve();
            }

            watcher.watch();
        });

    program.parse(process.argv);

})();
