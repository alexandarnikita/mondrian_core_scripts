'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getConfig = getConfig;

var _rcConfigLoader = require('rc-config-loader');

var _rcConfigLoader2 = _interopRequireDefault(_rcConfigLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

// Load 'corescripts' config file
var corescriptsrc = (0, _rcConfigLoader2.default)('corescripts') || {};
var config = corescriptsrc.config || {};

function getConfig(command) {
    var commands = config.commands,
        globalOptions = _objectWithoutProperties(config, ['commands']);

    var commandOptions = (commands || {})[command];

    return _extends({}, globalOptions, commandOptions);
}