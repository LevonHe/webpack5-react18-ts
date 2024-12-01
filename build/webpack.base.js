const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDEV = process.env.NODE_ENV === 'development'

module.exports = {
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    filename: 'static/js/[name].[chunkhash:8].js',
    path: path.join(__dirname, '../dist'),
    clean: true,
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '../src')
    },
    modules: [path.resolve(__dirname, '../node_modules')]
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/,
        include: [path.resolve(__dirname, '../src')],
        use: ['thread-loader', 'babel-loader']
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.less$/,
        include: [path.resolve(__dirname, '../src')],
        use: [
          isDEV ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'less-loader'
        ]
      },
      {
        test: /.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'static/images/[name].[contenthash:8][ext]'
        }
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]'
        }
      }, {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        },
        generator: {
          filename: 'static/media/[name].[contenthash:8][ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts']
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      inject: true
    }),
    new webpack.DefinePlugin({
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV)
    })
  ],
  cache: {
    type: 'filesystem'
  }
}