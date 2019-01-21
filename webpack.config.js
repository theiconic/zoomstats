const webpack = require('webpack');
const path = require('path');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var productionMode = true;

var config = {
    mode: productionMode ? 'production' : 'development',

    devtool: productionMode ? false : 'source-map',

    entry: {
        'background.min.js': './src/extension/background.js',
        'zoomstats.min.js': './src/extension/zoomstats.js',
        'popup.min.js': './src/extension/popup.js',
    },

    output: {
        path: path.resolve(__dirname, 'dist/extension'),
        filename: '[name]' // This will use the entry key as the name.
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': productionMode ? JSON.stringify('production') : undefined
            }
        }),

        new CleanWebpackPlugin(['dist']),

        // This also watches the folder in watch mode.
        new CopyWebpackPlugin([{
            from: './src/extension' // my todo: ignore some stuff...
        }])
    ],

    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};

module.exports = config;
