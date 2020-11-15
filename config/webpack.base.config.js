const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HappyPack = require('happypack')
const os = require('os')
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

function concatPath(relatedPath) {
    return path.join(__dirname, relatedPath)
}

const webpackConfBase = {
    mode: "development",
    entry: concatPath('../app/app.jsx'),
    output: {
        path: concatPath('../dist'),
        filename: '[name].[fullhash:4].js',
        chunkFilename: 'chunks/[name].[fullhash:4].js',
    },
    module: {
        rules: [
            {
                test: /\.js[x]?$/,
                use: 'babel-loader'
            },
            {
                test: /\.(sc|sa|c)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            }
        ]
    },

    plugins: [
        new HappyPack({
            //用id来标识 happypack处理那里类文件
            id: 'happyBabel',
            //如何处理  用法和loader 的配置一样
            loaders: [{
              loader: 'babel-loader',
            }],
            //代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true,
        }),
        new HappyPack({
            //用id来标识 happypack处理那里类文件
            id: 'happyStyle',
            //如何处理  用法和loader 的配置一样
            loaders: [MiniCssExtractPlugin.loader, 'css-loader?sourceMap=true', 'sass-loader?sourceMap=true'], 
            //代表共享进程池，即多个 HappyPack 实例都使用同一个共享进程池中的子进程去处理任务，以防止资源占用过多。
            threadPool: happyThreadPool,
            //允许 HappyPack 输出日志
            verbose: true,
        }),
        // 从 bundle 中提取文本（CSS）到单独的文件
        new MiniCssExtractPlugin({
            // 配置项与 webpackOptions.output 相同
            // 所有配置均是可选项
            filename: '[name].[fullhash:4].css',
            chunkFilename: '[id].[fullhash:4].css',
        }),
    ],
}

module.exports = webpackConfBase;