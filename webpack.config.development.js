const {merge} = require("webpack-merge");
const commonConfig = require("./webpack.config.common.js");
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = merge(commonConfig, {
    mode: "development",

    devServer: {
        port: 3000,
        hot: true,
        open: true,
    },

    plugins: [new ESLintPlugin({
        files: ['js'],
        "overrideConfig": {
            "extends": "eslint:recommended",
            "rules": { }
        }
    })],

})