const path = require('path');
const webpack = require('webpack');
const mainConfig = require('./webpack.config.js');
const { merge } = require('webpack-merge');

module.exports = merge(mainConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  target: 'web',
  watchOptions: {
    aggregateTimeout: 200,
    ignored: /node_modules/,
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    hot: true,
    port: 4000,
    open: true,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
