'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function copyFile(config) {
    var srcPath = config.srcPath,
        outputPaths = config.outputPaths;


    return function (srcFilePath) {
        var relativeFilePath = _path2.default.relative(srcPath, srcFilePath);

        return new Promise(function (resolve) {
            var content = _fs2.default.readFileSync(srcFilePath, 'utf8');
            var files = [];

            (outputPaths || []).forEach(function (outputPath) {
                files.push({
                    filename: _path2.default.resolve(outputPath, relativeFilePath),
                    content: content
                });
            });

            resolve(files);
        });
    };
}

exports.default = copyFile;
module.exports = exports['default'];