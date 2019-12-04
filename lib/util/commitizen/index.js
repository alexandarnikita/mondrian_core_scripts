'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = commitizen;

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gitCz = require('commitizen/dist/cli/git-cz');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function commitizen() {
    var cliPath = _path2.default.resolve(process.cwd(), 'node_modules/commitizen');
    var configPath = _path2.default.resolve(process.cwd(), 'node_modules/cz-conventional-changelog');

    // Workaround to support invocation of git-cz cmd, as it's done here (node ./bin/babel-scripts.js commitizen)
    // Should be removed once there's a version supporting this
    // Git cz is considering the 3rd argv as a git arg
    // https://github.com/commitizen/cz-cli/blob/master/src/cli/git-cz.js#L16
    var originalArgv = process.argv;

    process.argv = process.argv.slice(2);

    var czBooted = (0, _gitCz.bootstrap)({
        cliPath: cliPath,
        config: {
            path: configPath
        }
    });

    process.argv = originalArgv;

    return czBooted;
}
module.exports = exports['default'];