'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = resolver;

var _fs = require('fs');

var _path = require('path');

var _resolve = require('resolve');

var _resolve2 = _interopRequireDefault(_resolve);

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function shouldUseSourceCode(sourcePath) {
    var cwd = process.cwd();

    // Grab the realpath of the source path so that symlinks are resolved
    var realSourcePath = void 0;

    try {
        realSourcePath = (0, _fs.realpathSync)(sourcePath);
    } catch (err) {
        if (err.code === 'ENOENT') {
            return false;
        }

        throw err;
    }

    // Must be a symlink which points to a folder inside the project
    return realSourcePath !== sourcePath && realSourcePath.indexOf(cwd) === 0;
}

function resolver(path, options) {
    return _resolve2.default.sync(path, {
        basedir: options.basedir,
        extensions: options.extensions,
        moduleDirectory: options.moduleDirectory,
        paths: options.paths,
        packageFilter: function packageFilter(pkg, path) {
            var sourcePath = pkg[_constants.SOURCE_KEY] && (0, _path.join)(path, pkg[_constants.SOURCE_KEY]);

            // Use source code during tests for packages inside the repository
            // This makes sure that code is compiled in lerna repositories where packages are linked
            if (sourcePath && shouldUseSourceCode(sourcePath)) {
                pkg.main = pkg[_constants.SOURCE_KEY];
            }

            return pkg;
        }
    });
}
module.exports = exports['default'];