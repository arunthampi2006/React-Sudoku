const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const baseConfig = require('./wp-base-config');

const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const FileManagerPlugin = require('filemanager-webpack-plugin')

const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: './index.html',
    filename: 'index.html'
});

const optimizationConfig = {
    mode: 'production',
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
          sourceMap: true,
          cache: true,
          uglifyOptions: {
            mangle: {
                  keep_fnames: true
                },
            output: {
                comments: false,
                }
            }
        })
    ],
    splitChunks: {
        chunks: 'all',
    }
  },
  plugins: [
      new CleanWebpackPlugin(),
    new OptimizeCssAssetsPlugin(),
    htmlWebpackPlugin,
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production') }),
    new FileManagerPlugin({
      onEnd: {
        copy: [
          {
            source: './src/assets/sudo.json',
            destination: path.resolve(__dirname, 'dist/sudo.json')
          }
        ]
      }
    })
  ],
}

module.exports = merge(baseConfig, optimizationConfig);