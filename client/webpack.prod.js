const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const ExtractTextPluginConfig = new ExtractTextPlugin({
  filename: './static/css/[name].css',
});
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body',
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
  },
});
const FaviconsWebpackPluginConfig = new FaviconsWebpackPlugin({
  logo: './public/logo.png',
  prefix: './static/icons-[hash]/',
});

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.join(__dirname, 'build'),
    filename: './static/js/bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: { module: true },
            },
          ],
          fallback: 'style-loader',
        }),
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true,
      },
      compress: {
        screw_ie8: true,
      },
      comments: false,
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    HtmlWebpackPluginConfig,
    ExtractTextPluginConfig,
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),
    FaviconsWebpackPluginConfig,
  ],
  devtool: 'eval',
};
