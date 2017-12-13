const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/app/pages/index/index.js'],
  plugins: [
    new CleanWebpackPlugin(['build'])
  ],
  output: {
    path: path.join(__dirname, 'build'),
    publicPath: "/build",
    "filename": "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ],
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
};
