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
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
	],
	overrides: [],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		ecmaFeatures: {
			"jsx": true
		},
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "jsdoc", "@typescript-eslint"],
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
		"@typescript-eslint/no-unused-vars": [
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
