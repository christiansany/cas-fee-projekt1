'use strict';

module.exports = {
    cache: true,
    debug: true,
    devtool: 'source-map',
    output: {
        chunkFilename: '[name].js',
        sourceMapFilename: '[name].js.map'
    },
    module: {
        loaders: [
            {
                test: /\.js?$/,
                loader: 'babel-loader'
            }
        ]
    }
};
