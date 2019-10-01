module.exports = {
    extends: ["eslint:recommended", "plugin:jest/recommended"],
    globals: {
        document: true,
        window: true,
        __dirname: true,
    },
    parser: "babel-eslint",
    parserOptions: {
        ecmaVersion: 6,
        ecmaFeatures: {
            jsx: true,
        },
    },
    plugins: ["standard", "react", "jest", "babel"],
    env: {
        browser: true,
    },
    rules: {
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        camelcase: "error",
        "keyword-spacing": "error",
        "max-len": ["error", 120, 4, { ignoreComments: true }],
        "max-lines": ["error", { max: 450, skipComments: true }],
        "no-useless-constructor": "error",
        quotes: ["error", "double"],
    },
};
