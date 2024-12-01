const path = require('path')
const { merge } = require('webpack-merge')
const baseConfig = require('./webpack.base')
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = merge(baseConfig, {
  mode: 'development', // 开发环境，打包更加快速
  devtool: 'eval-cheap-module-source-map', // 源码调试模式
  devServer: {
    port: 3000, // 服务端口号
    compress: false, // gzip压缩，开发环境不开启，提升热更新速度
    hot: true, // 开启热更新
    historyApiFallback: true, // 解决 history 路由 404 问题
    static: {
      directory: path.join(__dirname, '../public') // 托管静态资源 public 文件夹
    }
  },
  plugins: [
    new ReactRefreshWebpackPlugin()
  ]
})