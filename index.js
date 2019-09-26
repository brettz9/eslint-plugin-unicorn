'use strict';
const path = require('path');
const importModules = require('import-modules');

module.exports = {
	rules: importModules(path.resolve(__dirname, 'rules'), {camelize: false}),
	configs: {
		recommended: {
			env: {
				es6: true
			},
			parserOptions: {
				ecmaVersion: 2020,
				sourceType: 'module'
			},
			plugins: [
				'unicorn'
			],
			rules: {
				'unicorn/expiring-todo-comments': 'error'
			}
		}
	}
};
