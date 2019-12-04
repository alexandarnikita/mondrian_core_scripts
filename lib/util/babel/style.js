'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _once = require('once');

var _once2 = _interopRequireDefault(_once);

var _rcConfigLoader = require('rc-config-loader');

var _rcConfigLoader2 = _interopRequireDefault(_rcConfigLoader);

var _optionalRequire = require('optional-require');

var _optionalRequire2 = _interopRequireDefault(_optionalRequire);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var postcss = (0, _optionalRequire2.default)(require)('postcss');

var notifyNoPostCss = (0, _once2.default)(function () {
    process.stdout.write('postcss is not installed, skipping building styles..\n');
});

function buildStyle(config) {
    var outputPaths = config.outputPaths;


    if (!postcss) {
        notifyNoPostCss();

        return;
    }

    // Load 'postcss' config file
    var postcssrc = (0, _rcConfigLoader2.default)('postcss', {
        configFileName: 'postcss.config'
    }) || {};
    var postcssConfig = _extends({
        plugins: []
    }, postcssrc.config);

    return function (_ref) {
        var srcFilePath = _ref.srcFilePath,
            relativeFilePath = _ref.relativeFilePath;

        var content = _fs2.default.readFileSync(srcFilePath, 'utf8');

        return postcss(postcssConfig.plugins).process(content, {
            from: srcFilePath
        }).then(function (result) {
            var files = [];

            (outputPaths || []).forEach(function (outputPath) {
                files.push({
                    filename: _path2.default.resolve(outputPath, relativeFilePath),
                    content: result.css
                });
            });

            return files;
        });
    };
}

exports.default = buildStyle;
module.exports = exports['default'];