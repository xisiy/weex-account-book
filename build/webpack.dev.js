const configs = require('./webpack.config.js');
const webpack = require('webpack');
const ip = require('ip').address();
const pathTo = require('path');
const chalk = require('chalk');
let config = Array.isArray(configs) ? configs[0] : configs;
config.devServer = {
  contentBase: pathTo.join(__dirname, '..'),
  compress: true,
  // hot: true,
  host: '0.0.0.0',
  public: ip + ':8080',
 // publicPath: '/dist/',
};
// configs.plugins.push(new webpack.HotModuleReplacementPlugin());
console.log('server is running! Please open ' + chalk.green('http://' + ip + ':8080/index.html'));
module.exports = config;
