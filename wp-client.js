const path = require('path');
const merge = require('webpack-merge');
const baseConfg = require('./wp-base-config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const clientConfg = {
    mode: 'development',
    entry: './src/index.js',

  // Tell webpack where to put output file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
      new CleanWebpackPlugin(), 
      new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html'
        })
    ],
  devtool: 'inline-source-map'
}

module.exports = merge(baseConfg, clientConfg);