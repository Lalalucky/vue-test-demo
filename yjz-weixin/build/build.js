'use strict'
require('./check-versions')()

//当前环境  生产环境
process.env.NODE_ENV = 'production';


const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')   //nodejs 定制控制台日志的输入样式
const webpack = require('webpack')
const config = require('../config')

const buildEnv = process.argv[2] || 'build';

console.log(chalk.blue(`当前命令行参数为： ${buildEnv}`));

const webpackConfig = require('./webpack.prod.conf')

const spinner = ora('构建本地测试环境中...')
spinner.start()

rm(path.join(config[buildEnv].assetsRoot, config[buildEnv].assetsSubDirectory), err => {
  if (err) throw err
  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
