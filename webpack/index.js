'use strict'

import config from 'config'
import nodeDebug from 'debug'
import Promise from 'bluebird'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import webpackConfig from './webpack.config'

const debug = nodeDebug('tweet-wall:webpack')
const {host, port} = config.get('tweet-wall.webpack')

Promise.promisifyAll([WebpackDevServer])

const server = new WebpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true,
  stats: 'errors-only'
})

server.listenAsync(port, host)
  .then(() => debug(`Webpack is working on '${host}:${port}'`))
  .catch((err) => debug('Webpack start failed: %s, %j', err, err))
