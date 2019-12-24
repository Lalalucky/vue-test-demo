'use strict';
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    proxyTable: {
      '/lt-order': {
        // target: 'http://localhost:8769',
        target: 'http://10.159.62.215',
        // target: 'http://www.yjzgo.com',
        pathRewrite: {
          '^/lt-order': '/lt-order'
        }
      },
      '/yjz-oauth': {
        target: 'http://10.159.62.215',
        pathRewrite: {
          '^/yjz-oauth': '/yjz-oauth'
        }
      },
      '/yjz-sso': {
        target: 'http://10.159.62.215',
        pathRewrite: {
          '^/yjz-sso': '/yjz-sso'
        }
      }
    },

    // Various Dev Server settings
    host: 'localhost', // can be overwritten by process.env.HOST
    port: 7080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: './static',
    assetsPublicPath: 'http://www.yjzgo.com/lt-page/weixin/',

    /**
     * Source Maps
     */
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report,
    // 编码入代码的环境数据
    env: {
      NODE_ENV: '"production"',
      BUILD_ENV: '"build"',
      // 路由的模式 只支持 'history' || 'hash'
      HISTROY: '"history"',
      BASE_API: '"http://www.yjzgo.com/"',
      UE_BASE_API: '"http://10.159.62.232/oa-web/"',
      PUBLIC_STATIC: '"/"',
      URL: `{
        'API_URL': "http://www.yjzgo.com/",
        'BILLING_URL': "http://www.yjzgo.com/",
        'CONSOLE_URL': "http://www.yjzgo.com/",
        'MESSAGE_URL': "http://www.yjzgo.com/",
        'NOTARIZE_URL': "http://www.yjzgo.com/",
        'PAY_URL': "http://www.yjzgo.com/",
        'SSO_URL': "http://www.yjzgo.com/",
        'USER_URL': "http://www.yjzgo.com/",
        'WEIXIN_URL': "http://www.yjzgo.com/",
        'UPLODER_URL': "http://www.yjzgo.com/"
      }`
    }
  },

  cloud: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/weixin.html'),
    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: './static',
    //静态资源的路径前缀
    assetsPublicPath: 'http://www.ruguomedia.com/three-console/',
    // assetsPublicPath: 'http://www.xyjkyjy.com:98/three-console/',
    /**
     * Source Maps
     */
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: true,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    // 查看 所有的文件依赖
    bundleAnalyzerReport: false,

    // 编码入代码的环境数据
    env: {
      NODE_ENV: '"production"',
      BUILD_ENV: '"cloud-wdc"'
    }
  },
  cloud_tx: {
    // Template for index.html
    index: path.resolve(__dirname, '../../server/three-console/src/main/resources/weixin/weixin.html'),
    // Paths
    assetsRoot: path.resolve(__dirname, '../../server/three-console/src/main/resources/weixin'),
    assetsSubDirectory: './weixin',
    //静态资源的路径前缀
    assetsPublicPath: 'http://www.guzhanghua.xyz/three-console/',
    /**
     * Source Maps
     */
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    // 查看 所有的文件依赖
    bundleAnalyzerReport: true,

    // 编码入代码的环境数据
    env: {
      NODE_ENV: '"production"',
      BUILD_ENV: '"cloud-tx"'
    }
  }
};
