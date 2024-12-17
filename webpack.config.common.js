const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require('path');

module.exports = {
    context: path.resolve(__dirname, './src'),
    entry: './index.js',
    output: {
        filename: "./js/[name].[contenthash].js",
        path: path.resolve(__dirname, './dist'),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './public/index.html'),
        }),
        new CopyWebpackPlugin({
            patterns: [
                {from: path.resolve(__dirname, './public/favicon.png'), to: path.resolve(__dirname, './dist')},

            ]
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash].css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],

            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name].[contenthash].[ext]',
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'fonts/[name].[contenthash].[ext]'
                }
            },
            {
                test: /\.(ogg|mp3|wav|mpe?g)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'sounds/[name].[ext]'
                }
            },
        ]
    }

}
