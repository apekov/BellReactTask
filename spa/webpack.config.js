'use strict';

var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

function buildConfig(env) {
    var isProduction = (env === 'prod');

    var cfg = {
        context: path.resolve(__dirname, './app'),
        mode: isProduction ? 'production' : 'development',
        entry: './index.tsx',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [{
                test: /\.tsx?$/,
                enforce: 'pre',
                use: 'tslint-loader'
            }, {
                test: /\.tsx?$/,
                use: 'ts-loader'
            }, {
                test: /\.less$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    'css-loader',
                    'less-loader'
                ]
            }, {
                test: /\.css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    'css-loader'
                ]
            }]
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js']
        },
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    cache: true,
                    parallel: true,
                    sourceMap: true // set to true if you want JS source maps
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        },
        plugins: [
            new HtmlWebpackPlugin({
                template: __dirname + '/app/index.html'
            }),
            new MiniCssExtractPlugin({
                filename: isProduction ? '[name].[hash].css' : '[name].css',
                chunkFilename: isProduction ? '[id].[hash].css' : '[id].css',
            })
        ]
    };

    if (!isProduction) {
        cfg.devServer = {
            contentBase: path.join(__dirname, 'dist'),
            port: 3001,
            inline: true,
            stats: {
                cached: false
            },
            historyApiFallback: true,
            open: true
        };
        cfg.cache = false;
        cfg.devtool = 'inline-source-map';
        //cfg.devtool = 'source-map';
    }
    return cfg;
}

module.exports = buildConfig;