const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
    entry: ['./src/scripts/main.js',
        './src/scripts/barrel.js',
        './src/scripts/domControl.js',
        './src/scripts/projectList.js',
        './src/scripts/taskList.js',
    ],
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
        minimizer: [new TerserPlugin(
            {
                terserOptions: {
                    compress: true,
                    keep_classnames: false,
                    keep_fnames: false,
                    mangle: true,
                }
            }
        )],
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Todo List',
            template: './src/template.html'
        }),
        new MiniCssExtractPlugin(),
    ],
};