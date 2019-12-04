'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.commands = undefined;

var _build = require('./commands/build');

var build = _interopRequireWildcard(_build);

var _clean = require('./commands/clean');

var clean = _interopRequireWildcard(_clean);

var _lint = require('./commands/lint');

var lint = _interopRequireWildcard(_lint);

var _publish = require('./commands/publish');

var publish = _interopRequireWildcard(_publish);

var _rm = require('./commands/rm');

var rm = _interopRequireWildcard(_rm);

var _security = require('./commands/security');

var security = _interopRequireWildcard(_security);

var _test = require('./commands/test');

var test = _interopRequireWildcard(_test);

var _commitizen = require('./commands/commitizen');

var commitizen = _interopRequireWildcard(_commitizen);

var _commitlint = require('./commands/commitlint');

var commitlint = _interopRequireWildcard(_commitlint);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var commands = exports.commands = { build: build, clean: clean, lint: lint, publish: publish, rm: rm, security: security, test: test, commitizen: commitizen, commitlint: commitlint };