'use strict';
const path = require('path');
const utils = require('./utils');
const config = require('../config');
const vueLoaderConfig = require('./vue-loader.conf');
const vuxLoader = require('vux-loader');
// 编译环境
const buildEnv = process.env.NODE_ENV === 'production' ? process.argv[2] || 'build' : 'dev';

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = vuxLoader.merge(
  {
    context: path.resolve(__dirname, '../'),
    entry: {
      app: './src/main.js'
    },
    output: {
      path: config[buildEnv].assetsRoot,
      filename: '[name].js',
      publicPath:
        process.env.NODE_ENV === 'production' ? config[buildEnv].assetsPublicPath : config.dev.assetsPublicPath
    },
    resolve: {
      //自动解析的扩展 不需要用户 引入模块的时候写扩展名
      extensions: ['.js', '.vue', '.json'],
      //别名
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        '@public': resolve('public'),
        '@scss': resolve('src/scss'),
        '@utils': resolve('src/utils'),
        '@common': resolve('src/common'),
        '@components': resolve('src/components'),
        '@ui': resolve('ui')
      }
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          options: vueLoaderConfig
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [resolve('src'), resolve('ui'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
        },
        {
          test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('img/[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('media/[name].[hash:7].[ext]')
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
          }
        }
      ]
    },
    node: {
      // prevent webpack from injecting useless setImmediate polyfill because Vue
      // source contains it (although only uses it if it's native).
      setImmediate: false,
      // prevent webpack from injecting mocks to Node native modules
      // that does not make sense for the client
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty'
    }
  },
  {
    plugins: ['vux-ui']
  }
);
