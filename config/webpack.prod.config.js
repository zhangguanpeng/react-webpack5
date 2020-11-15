const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const webpackConfigBase = require('./webpack.base.config');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// 用于将打包目录中上一次打包的文件清除
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

function concatPath(relatedPath) {
    return path.join(__dirname, relatedPath)
}

const webpackConfigProd = {
    mode: "production",
    // 提取 chunks 之间共享的通用模块
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        minimizer: [], // [new UglifyJsPlugin({...})]
        splitChunks:{
            chunks: 'async',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            name: false,
            cacheGroups: {
                vendor: {
                    name: 'vendor',
                    chunks: 'initial',
                    priority: -10,
                    reuseExistingChunk: false,
                    test: /node_modules\/(.*)\.js/
                },
                styles: {
                    name: 'styles',
                    test: /\.(scss|css)$/,
                    chunks: 'all',
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    },
    plugins: [
        // 定义环境变量为开发环境
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production'),
            IS_DEVELOPMETN: false,
        }),
        // 将打包后的资源注入到html文件内    
        new HtmlWebpackPlugin({
            inject: 'body',
            title: 'React APP',
            filename: 'index.html',
            template: concatPath('../app/index.html')
        }),
        // 分析代码
        new BundleAnalyzerPlugin({ analyzerPort: 3011 }),
        new CleanWebpackPlugin({
            protectWebpackAssets: true,
        }),
    ],
}
  
module.exports = merge(webpackConfigBase, webpackConfigProd)