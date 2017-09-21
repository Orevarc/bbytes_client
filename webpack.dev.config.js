var path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const TARGET = process.env.NODE_ENV;

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/main'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            children: true,
            async: true,
            minChunks: 2
        }),
        new webpack.LoaderOptionsPlugin({
            test: /\.scss$/,
            options: {
                postcss: [
                    autoprefixer({ browsers: ['last 2 versions'] })
                ],
                sassLoader: {
                    data: `@import "${__dirname}/src/styles/config/_variables.scss";`
                }
            }
        }),
        new webpack.LoaderOptionsPlugin({
            test: /\.css$/,
            options: {
                postcss: [
                    autoprefixer({ browsers: ['last 2 versions'] })
                ]
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../bbytes_client/index.html'),
            // hash: true,
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: TARGET === 'development' ? '"development"' : '"production"' },
            '__DEVELOPMENT__': TARGET === 'development'
        }),
        new webpack.ProvidePlugin({
            '$': 'jquery',
            'jQuery': 'jquery',
            'window.jQuery': 'jquery'
        }),
        new CleanWebpackPlugin([path.join(__dirname, 'public')], {
            root: process.cwd()
        })
    ],
    resolve: {
        extensions: ['.jsx', '.js', '.json', '.scss', '.css'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,         // Match both .js and .jsx fles
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets:['react', 'es2015', 'stage-1']
                }
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$/,
                loader: 'file-loader?name=/images/[name].[ext]?[hash]'
            },
            {
                test: /\.woff(\?.*)?$/,
                loader: 'url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.woff2(\?.*)?$/,
                loader: 'url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=application/font-woff2'
            },
            {
                test: /\.ttf(\?.*)?$/,
                loader: 'url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?.*)?$/,
                loader: 'file-loader?name=/fonts/[name].[ext]'
            },
            {
                test: /\.otf(\?.*)?$/,
                loader: 'file-loader?name=/fonts/[name].[ext]&mimetype=application/font-otf'
            },
            {
                test: /\.svg(\?.*)?$/,
                loader: 'url-loader?name=/fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.json(\?.*)?$/,
                loader: 'file-loader?name=/files/[name].[ext]'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }, {
                test: /\.scss$/,
                use: [
                  'style-loader',
                  'css-loader',
                  'sass-loader',
                ]
            }
        ]
    },
};
