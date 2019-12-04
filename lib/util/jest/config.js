'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _flatten2 = require('lodash/flatten');

var _flatten3 = _interopRequireDefault(_flatten2);

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

exports.default = createJestConfig;

var _path = require('path');

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createJestConfig(_ref) {
    var pkg = _ref.pkg,
        packages = _ref.packages;

    return (0, _merge3.default)({
        // Roots
        roots: packages.map(function (_ref2) {
            var location = _ref2.location;
            return location;
        }),

        // Coverage settings
        collectCoverage: true,
        collectCoverageFrom: packages.map(function (_ref3) {
            var path = _ref3.path,
                source = _ref3.source;
            return (0, _path.join)(path, source, '**/*.{js,jsx}');
        }),
        coverageThreshold: {
            global: {
                branches: 80,
                functions: 80,
                lines: 80,
                statements: 80
            }
        },

        // Make some non-requirable extenstions work
        moduleNameMapper: {
            '\\.(scss|css|svg)$': require.resolve('identity-obj-proxy')
        },

        // Custom resolver to use non-compiled source code in some situations
        resolver: require.resolve('./resolver'),

        // Test settings
        testEnvironment: 'node',
        testPathIgnorePatterns: ['/node_modules/', '<rootDir>/' + _constants.COVERAGE_PATH].concat(_toConsumableArray((0, _flatten3.default)(packages.map(function (_ref4) {
            var path = _ref4.path;
            return (
                // Use path.join because `path` might be empty
                _constants.BUILD_PATHS.map(function (buildPath) {
                    return (0, _path.join)('<rootDir>', path, buildPath);
                })
            );
        })))),
        testResultsProcessor: require.resolve('jest-teamcity-reporter'),

        // Do not compile node_modules
        transformIgnorePatterns: [
        // Ignore ALL node_modules, except if it's one of the packages (symlinked one)
        // because we want them to go through babel
        '/node_modules/(?!.*(' + packages.map(function (pkg) {
            return pkg.name;
        }).join('|') + '))']
    }, pkg.jest);
}
module.exports = exports['default'];