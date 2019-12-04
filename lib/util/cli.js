'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.clean = exports.remove = exports.execSync = exports.exec = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _execa = require('execa');

var _execa2 = _interopRequireDefault(_execa);

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function exec(command, args) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return (0, _execa2.default)(command, args, _extends({
        stdio: 'inherit'
    }, options));
}

function execSync(execPath, args) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return _execa2.default.sync(execPath, args, options).stdout;
}

function remove(args, options) {
    return exec('rimraf', args, options);
}

function cleanPackages(_ref) {
    var packages = _ref.packages,
        options = _ref.options;

    var packagesToClean = packages.reduce(function (packagesToClean, _ref2) {
        var name = _ref2.name,
            location = _ref2.location;

        packagesToClean.push({
            message: name + ' cleaned',
            dirs: [].concat(_toConsumableArray(options.deps ? [_path2.default.join(location, 'node_modules')] : []), _toConsumableArray(_constants.BUILD_PATHS.map(function (buildPath) {
                return _path2.default.join(location, buildPath);
            })))
        });

        return packagesToClean;
    }, []);

    if (options.deps) {
        // Only include root node_modules if not already in the `packagesToClean` entries
        var rootDepsPath = _path2.default.join(process.cwd(), 'node_modules');
        var alreadyContainsRootDeps = packagesToClean.some(function (_ref3) {
            var dirs = _ref3.dirs;
            return dirs.indexOf(rootDepsPath) !== -1;
        });

        !alreadyContainsRootDeps && packagesToClean.push({
            message: 'root dependencies cleaned',
            dirs: [rootDepsPath]
        });
    }

    return Promise.all(packagesToClean.map(function (_ref4) {
        var message = _ref4.message,
            dirs = _ref4.dirs;
        return remove(dirs).then(function () {
            return process.stdout.write(message + '\n');
        });
    }));
}

function cleanCoverage() {
    return remove([_constants.COVERAGE_PATH]);
}

var clean = {
    coverage: cleanCoverage,
    packages: cleanPackages,
    all: function all(_ref5) {
        var packages = _ref5.packages,
            options = _ref5.options;

        return Promise.all([cleanCoverage([_constants.COVERAGE_PATH]), cleanPackages({ packages: packages, options: options })]);
    }
};

exports.exec = exec;
exports.execSync = execSync;
exports.remove = remove;
exports.clean = clean;