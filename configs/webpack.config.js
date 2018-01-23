var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CopyWebpackPlugin = require('copy-webpack-plugin');
var proxySettings = require("./app.config.js").server.proxy;
var pagesConfig = require("./pages.config.js");
var coreRoot = path.join(__dirname, "../");
var conf = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    app: './core/src/index'
  },
  output: {
    path: path.join(coreRoot, 'build'),
    filename: 'bundle.js'
  },
  devServer: {
    hot: true,
    inline: true,
    contentBase: "build",
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("bundle.css"),
    new CopyWebpackPlugin([
      {
        from: "index.html",
        to: 'index.html'
      }, {
        from: "core/assets",
        to: 'core/assets'
      }, {
        from: "static",
        to: 'static'
      }, {
        from: "src/pages",
        to: 'pages'
      }])
  ],
  module: {
    rules: [{
      test: /\.js$/,
      loader: "babel-loader",
      exclude: /node_modules/,
      include: coreRoot
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    }, {
      test: /\.(png|jpg|svg)$/,
      loader: 'url-loader?limit=8192'
    }, {
      test: /\.html$/,
      loader: 'html-loader?-attrs'
    }, {
      test: /\.(otf|ttf|eot|woff|woff2)$/i,
      loader: 'url?name=[path][name].[ext]'
    }]
  },
  resolve: {
    alias: {
      "core": path.join(coreRoot, 'core')
    }
  }
}
if (Object.keys(proxySettings).length) {
  conf.devServer.proxy = proxySettings
}
module.exports = conf
