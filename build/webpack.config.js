const pathTo = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config.js');
const entry = require('./entry.js')(config);
let isProd = process.env.NODE_ENV == 'production';

let UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({minimize: true});
let BannerPlugin = new webpack.BannerPlugin({
    banner: '// { "framework": "Vue"} \n',
    raw: true,
    exclude: 'Vue'
});
let HtmlPlugin = new HtmlWebpackPlugin({
    template: config.web.htmlTemp,
    inject: true,
    minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
    },
    chunksSortMode: 'dependency'
});

function getPlugins(isWeb){
    let plugins = [];
    if(isProd){
        plugins.push(UglifyJsPlugin);
    }
    plugins.push(BannerPlugin);
    if(isWeb){
        plugins.push(HtmlPlugin);
    }
    return plugins;
}


const webConfig = {
    context: config.root,
    entry: entry.web,
    output: {
        path: /:/g.test(config.web.outputPath)?config.web.outputPath:pathTo.join(config.root, config.web.outputPath),
        filename: config.web.outputFilename
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }]
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'css-loader'
                }]
            },
            {
                test: /\.vue(\?[^?]+)?$/,
                use: [{
                    loader: 'vue-loader'
                }]
            }
        ]
    },
    plugins: getPlugins(true)
};
const weexConfig = {
    entry: entry.native,
    output: {
        path: /:/g.test(config.native.outputPath)?config.native.outputPath:pathTo.join(config.root, config.native.outputPath),
        filename: config.native.outputFilename
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                }]
            },
            {
                test: /\.(vu|w)e(\?[^?]+)?$/,
                use: [{
                    loader: 'weex-loader'
                }]
            }
        ],
    },
    plugins: getPlugins()
};

// console.log(webConfig);
// console.log(weexConfig);
var exports = [webConfig, weexConfig];

module.exports = exports;
