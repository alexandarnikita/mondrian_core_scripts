'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _yargs = require('yargs');

var _yargs2 = _interopRequireDefault(_yargs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// ---------------------------------------------------------
// CLI definition
// ---------------------------------------------------------

_yargs2.default // eslint-disable-line no-unused-expressions
.commandDir('commands').demandCommand().option('reporter', {
    type: 'string',
    describe: 'Any of the planify\'s reporters'
}).option('lerna', {
    type: 'boolean',
    default: _fs2.default.existsSync('lerna.json'),
    describe: 'Use Lerna to find packages'
}).version().alias('version', 'v').help('help').alias('help', 'h').argv;