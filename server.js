const path = require('path');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');
const config = require('./wp-client');
const port = parseInt(process.env.PORT, 10) || '9000';
console.log('----',webpack(config))
new webpackDevServer(webpack(config), {
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    compress: true,
    hot: true,
    open: true,
    historyApiFallback: true
}).listen(port, 'localhost', (err, result) => {
    if (err) {
        console.log('--error--', err);
    }
    console.log('Listening at the localhost:9000');
});