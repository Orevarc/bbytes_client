var path = require('path');
var express = require('express');
var port = (process.env.PORT || 3000);

var app = express();

var publicPath = path.join(__dirname, 'public');
var imagesPath = path.join(__dirname, 'images');
var indexPath = path.join(__dirname, 'index.html');
console.log(indexPath);

app.use('/public', express.static(publicPath));
app.use('/images', express.static(imagesPath));

if (process.env.NODE_ENV !== 'production') {
  var webpack = require('webpack');
  var webpackDevMiddleware = require('webpack-dev-middleware');
  var webpackHotMiddleware = require('webpack-hot-middleware');
  var config = require('./webpack.dev.config.js');
  var compiler = webpack(config);

  app.use(webpackHotMiddleware(compiler));
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    hot: true,
    stats: true,
    historyApiFallback: true
  }));
}
app.get('*', function (request, response) {
  response.sendFile(indexPath);
});

app.listen(port, () => console.log('Server running at port:' + port));
