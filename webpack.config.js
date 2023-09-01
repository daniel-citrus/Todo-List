const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: './src/scripts/main.js',
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ],
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                    keep_classnames: false,
                    keep_fnames: false,
                    mangle: { toplevel: true },
                },
                extractComments: false,
            }),
        ],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Todo List',
            template: './src/template.html'
        }),
        new MiniCssExtractPlugin(),
    ],
    resolve: {
        alias: {
            Script: path.resolve(__dirname, 'src/scripts'),
        }
    },
};