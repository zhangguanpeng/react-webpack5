const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const webpackConfigBase = require('./webpack.base.config');
// open-browser-webpack-plugin目前不知道webpack4+，因此选用了open-browser-webpack4-plugin
const OpenBrowserPlugin = require('open-browser-webpack4-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PORT = 8888;
function concatPath(relatedPath) {
    return path.join(__dirname, relatedPath);
}

const webpackConfigDev = {
    plugins: [
        // 定义环境变量为开发环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development'),
            IS_DEVELOPMETN: true,
        }),
        // 将打包后的资源注入到html文件内    
        new HtmlWebpackPlugin({
            inject: 'body',
            title: 'React APP',
            filename: 'index.html',
            template: concatPath('../app/index.html')
        }),
        new OpenBrowserPlugin({
            url: `http://localhost:${PORT}`,
        }),
    ],
    devtool: 'source-map',
    devServer: {
        contentBase: concatPath('../app'),
        historyApiFallback: false,
        hot: false,
        host: '0.0.0.0',
        port: PORT,
    },
}

module.exports = merge(webpackConfigBase, webpackConfigDev);