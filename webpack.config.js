var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, 'src'),
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        compress: false,
        port: 9000
    },
    entry: './radar.js',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    output: {
        filename: './radar.js',
        library: [
            'radar'
        ],
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [

    ]
};
