'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = babel;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _glob = require('glob');

var _glob2 = _interopRequireDefault(_glob);

var _outputFileSync = require('output-file-sync');

var _outputFileSync2 = _interopRequireDefault(_outputFileSync);

var _script = require('./script');

var _script2 = _interopRequireDefault(_script);

var _style = require('./style');

var _style2 = _interopRequireDefault(_style);

var _copy = require('./copy');

var _copy2 = _interopRequireDefault(_copy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function outputFiles(key, group) {
    var total = 0;

    group.forEach(function (files) {
        total += files.length;

        files.forEach(function (_ref) {
            var filename = _ref.filename,
                content = _ref.content;
            return (0, _outputFileSync2.default)(filename, content);
        });
    });

    return {
        key: key,
        total: total
    };
}

function babel(_ref2) {
    var packages = _ref2.packages,
        options = _ref2.options;

    return Promise.all(packages.reduce(function (promises, _ref3) {
        var name = _ref3.name,
            location = _ref3.location,
            source = _ref3.source;

        var srcPath = _path2.default.resolve(location, source);

        // Nothing to do here if srcPath not found
        if (!_fs2.default.existsSync(srcPath)) {
            return promises;
        }

        var packagePromises = [];
        var pattern = _path2.default.resolve(srcPath, '**/*.js');
        var files = _glob2.default.sync(pattern, { nodir: true });
        var stylesConfig = {
            srcPath: srcPath,
            styles: []
        };
        var outputPaths = [];

        // Build CommonJS modules
        var libOutputPath = _path2.default.resolve(location, 'lib');
        var buildCommonJs = (0, _script2.default)({
            rootPath: location,
            srcPath: srcPath,
            outputPath: libOutputPath,
            babelConfig: {
                env: 'cjs',
                plugins: [(0, _script.transformStylesPath)(stylesConfig)]
            }
        });

        packagePromises.push(Promise.all(files.map(buildCommonJs)).then(function (group) {
            return outputFiles('lib', group);
        }));

        outputPaths.push(libOutputPath);

        // Build ES modules
        if (options.es) {
            var esOutputPath = _path2.default.resolve(location, 'es');

            var buildEs = (0, _script2.default)({
                rootPath: location,
                srcPath: srcPath,
                outputPath: esOutputPath,
                babelConfig: {
                    env: 'es',
                    plugins: [(0, _script.transformStylesPath)(stylesConfig)]
                }
            });

            packagePromises.push(Promise.all(files.map(buildEs)).then(function (group) {
                return outputFiles('es', group);
            }));

            outputPaths.push(esOutputPath);
        } else {
            packagePromises.push(Promise.resolve(outputFiles('es', [])));
        }

        // Copy files that will not be compiled
        if (options.copy) {
            var _pattern = _path2.default.resolve(srcPath, '**/*.!(js|css)');
            var otherFiles = _glob2.default.sync(_pattern, { nodir: true });

            // Copy other files
            var copyOtherFile = (0, _copy2.default)({
                rootPath: location,
                srcPath: srcPath,
                outputPaths: outputPaths
            });

            packagePromises.push(Promise.all(otherFiles.map(copyOtherFile)).then(function (group) {
                return outputFiles('copies', group);
            }));
        } else {
            packagePromises.push(Promise.resolve(outputFiles('copies', [])));
        }

        // Build styles
        var buildPostCSS = (0, _style2.default)({
            rootPath: location,
            outputPaths: outputPaths
        });

        if (buildPostCSS) {
            packagePromises.push(Promise.all(stylesConfig.styles.map(buildPostCSS)).then(function (group) {
                return outputFiles('styles', group);
            }));
        }

        promises.push(Promise.all(packagePromises).then(function (summary) {
            var output = summary.filter(function (_ref4) {
                var total = _ref4.total;
                return total > 0;
            }).map(function (_ref5) {
                var key = _ref5.key,
                    total = _ref5.total;
                return key + ': ' + total;
            }).join(' | ');

            process.stdout.write(name + ' [ ' + output + ' ]\n');
        }));

        return promises;
    }, []));
}
module.exports = exports['default'];