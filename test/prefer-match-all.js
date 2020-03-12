import test from 'ava';
import avaRuleTester from 'eslint-ava-rule-tester';
import {outdent} from 'outdent';
import rule from '../rules/prefer-match-all';

const ruleTester = avaRuleTester(test, {
	env: {
		es6: true
	}
});

const babelRuleTester = avaRuleTester(test, {
	parser: require.resolve('babel-eslint')
});
const typescriptRuleTester = avaRuleTester(test, {
	parser: require.resolve('@typescript-eslint/parser')
});

const error = {
	ruleId: 'prefer-match-all',
	message: 'Prefer `for (match of str.matchAll(regexp))` over `while ((match = regexp.exec(str)) !== null)'
};

const tests = {
	valid: [
		outdent`
		for (const match of str.matchAll(regexp)) {
		}
		`,
		outdent`
		let match;
		while ((match = regexp.find(str)) !== null) {
		}
		`,
		outdent`
		let match;
		while ((regexp.exec(str)) !== null) {
		}
		`,
		outdent`
		let match;
		while (match = regexp.exec(str)) {
		}
		`,
		outdent`
		let match;
		while ((match = regexp.exec()) !== null) {
		}
		`,
		outdent`
		let match;
		while ((match = regexp.exec(str)) !== undefined) {
		}
		`,
	],
	invalid: [
		{
			code: outdent`
			let match;
			while ((match = regexp.exec(str)) !== null) {
			}
			`,
			errors: [error],
			output: outdent`
			for (const match of str.matchAll(regexp)) {
			}
			`
		}
	]
};

ruleTester.run('prefer-match-all', rule, tests);
babelRuleTester.run('prefer-match-all', rule, tests);
typescriptRuleTester.run('prefer-match-all', rule, tests);
