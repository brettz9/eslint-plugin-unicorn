'use strict';
const getDocumentationUrl = require('./utils/get-documentation-url');

const selector = [
	// while
	'WhileStatement',

	// (match = regexp.exec(str))
	'[test.left.type="AssignmentExpression"]',

	// match
	'[test.left.left.type="Identifier"]',
	// '[test.left.left.name="match"]',

	// regexp.exec(str)
	'[test.left.right.type="CallExpression"]',
	'[test.left.right.arguments.0.type="Identifier"]', // Or string or template literal
	'[test.left.right.callee.type="MemberExpression"]',
	'[test.left.right.callee.property.type="Identifier"]',
	'[test.left.right.callee.property.name="exec"]',

	// !==
	'[test.type="BinaryExpression"]',

	// null
	'[test.right.type="Literal"]',
	'[test.right.raw="null"]'
].join('');

const create = context => {
	return {
		[selector]: node => {
			const fixedValue = node.value.raw;
			context.report({
				node,
				message: 'Prefer `for (match of str.matchAll(regexp))` over `while ((match = regexp.exec(str)) !== null)',
				fix: fixer => fixer.replaceText(node, fixedValue)
			});
		}
	};
};

module.exports = {
	create,
	meta: {
		type: 'suggestion',
		docs: {
			url: getDocumentationUrl(__filename)
		},
		fixable: 'code'
	}
};
