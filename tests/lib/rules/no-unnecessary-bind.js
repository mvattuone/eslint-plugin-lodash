'use strict';

// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

var rule = require('../../../lib/rules/no-unnecessary-bind');
var RuleTester = require('eslint').RuleTester;

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

var ruleTester = new RuleTester();
var ruleError = [{message: 'Unnecessary bind, pass `thisArg` to lodash method instead'}];
ruleTester.run('no-unnecessary-bind', rule, {
    valid: [{
        code: 'var x = _.map(arr, f)'
    }, {
        code: 'var r = _.find(themeStyleList, function (themeStyle) { return this.x; }, this);'
    }],
    invalid: [{
        code: 'var r = _.find(users, function (user) { return user.age > this.age; }.bind(this));',
        errors: ruleError
    }, {
        code: 'var r = _.find(users, predicate.bind(this));',
        errors: ruleError
    }]
});
