const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: {
        main: './src/scripts/main.js',
        barrel: './src/scripts/barrel.js',
        domControl: './src/scripts/domControl.js',
        projects: './src/scripts/projects.js',
        todo: './src/scripts/todo.js',
    },
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
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    ie8: false,
                    keep_fnames: false,
                    mangle: true,
                    nameCache: null,
                    output: {
                        comments: false,
                    },
                    toplevel: true,
                    warnings: false,

                },
            }),
        ],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        clean: true,
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