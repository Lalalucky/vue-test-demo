'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BUILD_ENV: '"dev"',
  // 路由的模式 只支持 'history' || 'hash'
  HISTROY: '"history"',
  BASE_API: '""',
  PUBLIC_STATIC: '"/"',
  UE_BASE_API: '""',
  URL: `{
      'API_URL': "/oa-api",
      'BILLING_URL': "/oa-api",
      'CONSOLE_URL': "/oa-api",
      'MESSAGE_URL': "/oa-api",
      'NOTARIZE_URL': "/oa-api",
      'PAY_URL': "/oa-api",
      'SSO_URL': "/oa-api",
      'USER_URL': "/oa-api",
      'WEIXIN_URL': "/oa-api",
      'UPLODER_URL': "",
    }`
});
