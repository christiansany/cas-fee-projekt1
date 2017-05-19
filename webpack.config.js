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
                test: /\.hbs$/,
                loader: 'handlebars-loader'
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader'
            }
        ]
    }
};
