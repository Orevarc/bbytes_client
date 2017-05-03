var path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
// const extractCSS = new ExtractTextPlugin('styles/[name].css');

const TARGET = process.env.npm_lifecycle_event;

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-hot-middleware/client',
    './src/main'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  // plugins: [
  //   new webpack.HotModuleReplacementPlugin(),
  //   new webpack.ProvidePlugin({
  //     'Promise': 'exports?global.Promise!es6-promise',
  //     'fetch': 'exports?self.fetch!whatwg-fetch'
  //   }),
  //   new webpack.DefinePlugin({
  //     API_BASE_URL: JSON.stringify("http://localhost:8000/"),
  //     GA_TRACKING_CODE: null, // This will disable analytics during dev
  //   }),
  //   new webpack.LoaderOptionsPlugin({
  //       test: /\.scss$/,
  //       options: {
  //           postcss: [
  //               autoprefixer({ browsers: ['last 2 versions'] })
  //           ],
  //           sassLoader: {
  //               data: `@import "${__dirname}/../src/static/styles/config/_variables.scss";`
  //           }
  //       }
  //   }),
  // ],
  // module: {
  //   loaders: [
  //     {
  //       test: /\.js$/,
  //       loaders: ['react-hot-loader', 'babel-loader'],
  //       include: path.join(__dirname, 'src')
  //     },
  //     {
  //       test: /\.css$/,
  //       loader: "style-loader!css-loader"
  //     }
  //   ],
  //   rules: [
  //     {
  //         test: /\.jsx?$/,         // Match both .js and .jsx files
  //         exclude: /node_modules/,
  //         loader: "babel-loader",
  //         query: {
  //             presets:['react', 'es2015', 'stage-1']
  //         }
  //     },
  //     {
  //         test: /\.css$/,
  //         use: [
  //             extractCSS.extract('style'),
  //             'css-loader?localIdentName=[path][name]--[local]',
  //             'postcss-loader'
  //         ]
  //     }, {
  //         test: /\.scss$/,
  //         use: [
  //             extractCSS.extract('style'),
  //             'css-loader?localIdentName=[path][name]--[local]',
  //             'postcss-loader',
  //             'sass-loader',
  //         ]
  //     }
  //   ],
  // }
  plugins: [
        // extract all common modules to vendor so we can load multiple apps in one page
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'vendor',
        //     filename: 'vendor.[hash].js'
        // }),
        // extractCSS,
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
            template: path.join(__dirname, '../web-client/index.html'),
            hash: true,
            filename: 'index.html',
            inject: 'body'
        }),
        new webpack.DefinePlugin({
            'process.env': { NODE_ENV: TARGET === 'dev' ? '"development"' : '"production"' },
            '__DEVELOPMENT__': TARGET === 'dev'
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
                test: /\.jsx?$/,         // Match both .js and .jsx files
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
                use: [
                    // extractCSS.extract('style'),
                    'css-loader?localIdentName=[path][name]--[local]',
                    'postcss-loader'
                ]
            }, {
                test: /\.scss$/,
                use: [
                    // extractCSS.extract('style'),
                    'css-loader?localIdentName=[path][name]--[local]',
                    'postcss-loader',
                    'sass-loader',
                ]
            }
        ]
    },
};
