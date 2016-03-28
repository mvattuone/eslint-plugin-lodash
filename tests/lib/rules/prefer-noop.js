'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../src/rules/prefer-noop');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var errors = [{message: 'Prefer _.noop over an empty function'}];
ruleTester.run('prefer-noop', rule, {
    valid: [
        'x = function() { return 2}',
        'x = function(x) {return x}',
        {code: 'x = a => a.b', parserOptions: {ecmaVersion: 6}}
    ],
    invalid: [{
        code: 'functionWithCb(function() {})',
        errors: errors
    }, {
        code: 'x = function(){/* */}',
        errors: errors
    }, {
        code: 'CallCb(()=> {})',
        parserOptions: {ecmaVersion: 6},
        errors: errors
    }]
});
