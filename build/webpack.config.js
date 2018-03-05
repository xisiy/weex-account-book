const pathTo = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const prefixer = require('autoprefixer');
const weexCSS = require('postcss-weex');
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
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'components': pathTo.join(config.root, '/src/components')
        }
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
                loader: `vue-loader`,
                options: {
                    /**
                     * important! should use postTransformNode to add $processStyle for
                     * inline style normalization.
                     */
                    compilerModules: [
                        {
                            postTransformNode: el => {
                                el.staticStyle = `$processStyle(${el.staticStyle})`;
                                el.styleBinding = `$processStyle(${el.styleBinding})`;
                            }
                        }
                    ],
                    postcss: [
                        weexCSS({env: 'web',relLenUnit:'em'}),
                        prefixer({ browsers: ['last 20 versions'] })
                    ]
                }
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
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'components': pathTo.join(config.root, '/src/components')
        }
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
                loader: `weex-loader`,
                options: {
                    postcss: [
                        weexCSS({env: 'weex',relLenUnit:'em'})
                    ]
                }
            }
        ],
    },
    plugins: getPlugins()
};

// console.log(webConfig);
// console.log(weexConfig);
var exports = [webConfig, weexConfig];

module.exports = exports;
