(function () {
    'use strict';

    var fse = require('fs-extra');
    var colors = require('colors');
    var moment = require('moment');
    var conf = require('../conf.js');
    var logger = require('./logger.js');
    var builderCss = require('./builder-css.js');
    var builderFonts = require('./builder-fonts.js');
    var builderHtml = require('./builder-html.js');
    var builderImages = require('./builder-images.js');
    var builderJs = require('./builder-js.js');
    var injector = require('./injector.js');

    var args = process.argv.slice(2);
    if (args.length !== 1) {
        logger.error("Usage: node builder.js [dev|prod|inject]");
        return;
    }

    var startDate = moment();
    process.on('exit', function () {
        logger.logDuration(startDate);
    });

    function clean() {
        fse.removeSync(conf.dir.dist);
        fse.mkdirsSync(conf.dir.dist);
    }

    switch (args[0]) {
        case 'dev':
            clean();
            builderFonts.build();
            builderImages.build(true);
            builderCss.build();
            injector.inject();
            break;
        case 'prod':
            clean();
            builderFonts.build();
            builderImages.build();
            builderCss.build();
            builderJs.build();
            builderHtml.build();
            break;
        case 'inject':
            injector.inject();
            break;
    }

})();
