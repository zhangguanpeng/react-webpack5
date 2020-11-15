# 基于react+webpack5的工程配置过程
注意：  
该工程是react+webpack5技术栈的基础工程，其中已经配置好了一些基础的功能，如devServer，css/sass解析及文件提取，公共文件提取等。此外，该工程还引入了happypack用于提升打包速度。

但是，该工程尚未配置 eslint，Typescript，React Router 与 Redux，Mobx 等应用型工具。

该工程适合做前端项目的基础工程。

## 第一步 安装相关包
```
// 先定位到指的目录，然后通过 npm init 在该目录下生成默认package.josn 文件
npm init

// 安装 webpack，webpack-cli 和 webpack-dev-server
npm install webpack webpack-cli webpack-dev-server --save-dev

// 安装 react react-dom
npm install react react-dom --save

// 安装 babel-loader @babel/core @babel/preset-env @babel/preset-react
npm install babel-loader @babel/core @babel/preset-env @babel/preset-react --save-dev

// 安装 css-loader, sass-loader
npm install css-loader sass-loader --save-dev

```
> 注意：babel-loader默认安装的是8.x版本，因此其相关包也会改变，以前7.x对应bable-core和babel-preset-env等，而8.x对应@babel/core @babel/preset-env等，使用最新版本一定要注意兼容性

## 第二步 安装相关插件
```
// 用于生成html文件的插件
npm install html-webpack-plugin --sav-dev

// 用于打开浏览器的插件
npm install open-browser-webpack4-plugin --save-dev

// 用于从 bundle 中提取文本（CSS）到单独文件的插件
npm install mini-css-extract-plugin --save-dev

// 用于从 bundle 中提取文本（CSS）到单独文件的插件
npm install mini-css-extract-plugin --save-dev

// 用于清除打包目录文件的插件
npm install clean-webpack-plugin --sav-dev

// 用于打包速度优化的插件
npm install happypack --sav-dev

```
> 注意：本工程使用的webpack版本为 v5.4，由于在webpack4+ 之后其内部调用插件的方式产生了很大变化，导致很多插件如open-browser-webpack-plugin等插件的正式版不兼容。因此我们需要找到相关插件的替换版，如选择open-browser-webpack4-plugin

## 第三步 创建webpack配置文件
- webpack.base.config.js 为 webpack的基础配置文件
- webpack.dev.config.js 为 webpack开发环境下的配置文件，其内部会引用webpack.base.config.js
- webpack.prod.config.js 为 webpack打包环境下的配置文件，其内部会引用webpack.base.config.js

> 配置的过程中很有可能会运行出错，多数原因是因为包版本不兼容导致，需要根据具体问题找到解决方法。具体配置可参考工程内相关文件。

# 使用react+webpack5工程
```
// 安装依赖
npm install
// 本地开发
npm run dev
// 编译打包
npm run build
```