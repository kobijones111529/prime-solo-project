module.exports = {
	root: true,
	env: {
		node: true,
		browser: true,
		commonjs: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:jsdoc/recommended",
	],
	overrides: [],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "jsdoc"],
	settings: {
		react: {
			version: "detect",
		},
	},
	rules: {
		"no-self-assign": 1,
		"no-unused-vars": [
			"error",
			{
				argsIgnorePattern: "^_",
				varsIgnorePattern: "^_",
				caughtErrorsIgnorePattern: "^_",
			},
		],
		"jsdoc/require-jsdoc": 0,
		"jsdoc/require-param-description": 0,
		"jsdoc/require-property-description": 0,
		"jsdoc/require-returns-description": 0,
	},
};
