const path = require('path');

module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/,
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
              }
        ]
    }
}