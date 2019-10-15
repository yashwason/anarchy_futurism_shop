const path = require(`path`);

module.exports = {
    entry: {
        home: [`babel-polyfill`, `./src/home.js`],
        checkout: [`babel-polyfill`, `./src/checkout.js`]
    },
    output: {
        filename: `[name]-bundle.js`,
        path: path.resolve(__dirname, `public/scripts`)
    },
    module: {
        rules: [{
            test: /\.js$/,
            type: 'javascript/auto',
            exclude: /node_modules/,
            use: {
                loader: `babel-loader`,
                options: {
                    presets: [`env`],
                    plugins: [`transform-object-rest-spread`]
                }
            }
        }]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        publicPath: '/scripts/',
        port: 3000
    },
    devtool: 'source-map'
}