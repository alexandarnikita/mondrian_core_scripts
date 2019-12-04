'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.confirm = undefined;

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var confirm = exports.confirm = function confirm(message) {
    return _inquirer2.default.prompt([{
        choices: [{ key: 'y', name: 'Yes', value: true }, { key: 'n', name: 'No', value: false }],
        default: 2,
        message: message,
        name: 'confirm',
        type: 'expand'
    }]).then(function (answers) {
        return answers.confirm;
    });
};