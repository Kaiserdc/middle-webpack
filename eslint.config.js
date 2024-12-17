import js from "@eslint/js";
export default [
    js.config.recommended,
    {
        parser: "@babel/eslint-parser",
        rules: {
            "no-unused-vars": "error",
            "no-undef": "error"
        }
    }
];