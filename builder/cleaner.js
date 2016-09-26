module.exports = (function () {
    'use strict';

    var fse = require('fs-extra');
    var conf = require('../conf.js');

    ///////////////////////////////////
    // Public methods
    ///////////////////////////////////

    return {
        clean: clean
    };

    function clean() {
        fse.removeSync(conf.dir.dist);
        fse.mkdirsSync(conf.dir.dist);
    }

})();
