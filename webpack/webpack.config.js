'use strict'

import path from 'path'
import webpack from 'webpack'
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import config from 'config'

const {host, port} = config.get('tweet-wall.webpack')
const isProd = process.env.NODE_ENV === 'production'

const plugins = (() => {
  if (isProd) {
    return [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}}),
      new ExtractTextPlugin('styles.css')
    ]
  }

  return [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
})()

const entry = (() => {
  const appEntry = './es6/client/index.js'

  if (isProd) {
    return [appEntry]
  }

  return [
    appEntry,
    `webpack-dev-server/client?http://${host}:${port}`,
    'webpack/hot/only-dev-server'
  ]
})()

export default {
  devtool: isProd ? null : 'eval-source-map',
  entry,
  output: {
    path: isProd ? path.resolve(__dirname, '../public') : '/public',
    filename: 'scripts.js',
    publicPath: `http://${host}:${port}/public`
  },
  plugins,
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loaders: isProd ? ['babel?presets[]=react,presets[]=es2015'] : ['react-hot', 'babel?presets[]=react,presets[]=es2015'],
      exclude: /node_modules/
    }, {
      test: /\.scss$/,
      loader: isProd ? ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader') : 'style!css!sass'
    }, {
      test: /\.css$/,
      loader: isProd ? ExtractTextPlugin.extract('style-loader', 'css-loader') : 'style!css'
    }]
  }
}
