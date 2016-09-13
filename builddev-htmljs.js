var glob = require('glob');
var fs = require('fs');

fs.readFile('dist/index.html', 'utf8', function (err, contents) {
    // options is optional
    glob("src/app/**/*.src.js", function (er, files) {
        var time = new Date().getTime();
        var srcJs = '\n';
        srcJs += '\t\t<script src="index.js?' + time + '"></script>\n';
        files.forEach(function (element, index, array) {
            srcJs += '\t\t<script src="' + element.substring(4) + '?' + time + '"></script>\n';
        });

        contents = contents.replace(/<!--SRC_JS-->(?:|\n|.)+<!--SRC_JS_END-->/g, srcJs);
        contents = contents.replace(/<!--DIST_JS-->(?:|\n|.)+<!--DIST_JS_END-->/g, '');

        fs.writeFile('dist/index.html', contents);
    });
});
