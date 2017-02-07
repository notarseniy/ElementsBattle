var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = new require("extract-text-webpack-plugin");

var ExtractStyles = new ExtractTextPlugin('main.css');

var host = (process.env.HOST || 'localhost');
var port = (+process.env.PORT) || 3000;

var isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  context: path.join(__dirname, './client'),
  entry: {
    jsx: './index.jsx',
    //html: './index.html',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'ramda'
    ]
  },
  output: {
    path: path.join(__dirname, './static'),
    filename: 'bundle.js',
    //prod: publicPath: 'http://' + host + ':' + port + '/ElementsBattle/'
    publicPath: 'http://' + host + ((isProduction) ? (':' + port) : '' ) + '/' + ((isProduction) ? 'static/' : '')
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.css$/,
        include: /client/,
        use: ExtractStyles.extract([
          'css-loader?modules&camelCase&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]&minimize',
          'postcss-loader'
        ]),
      },
      {
        test: /\.css$/,
        exclude: /client/,
        use: ExtractStyles.extract({
          use: 'css-loader'
        })
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'react-hot-loader',
          'babel-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|svg|eot|ttf|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[path][name].[hash].[ext]'
          } 
        }
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.css', '.png', '.jpg'],
    modules: [
      path.join(__dirname, 'client'),
      'node_modules'
    ],
  },
  plugins: [
    ExtractStyles,
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js'}),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    }),
    new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}, output: {comments: false}})
  ],
  devServer: {
    contentBase: './client',
    hot: true
  },
  devtool: (process.env.NODE_ENV === 'production') ? '#source-map' : 'eval'
 
}
