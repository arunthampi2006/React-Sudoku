const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const config = require('./webpack-config');

new webpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    compress: true,
    open: true,
    historyApiFallback: true
}).listen(3000, 'localhost', (err, result) => {
    if (err) {
        console.log('--error--', err);
    }
    console.log('Listening at the localhost:3000');
});