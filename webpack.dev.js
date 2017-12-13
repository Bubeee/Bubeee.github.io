const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
module.exports = merge(common, {
  devtool: 'source-map',
  devServer: {
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
    },
    inline: true,
    hotOnly: true,
    overlay: {
      errors: true,
      warnings: true,
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
});
