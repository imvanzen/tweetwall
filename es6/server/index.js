'use strict'

import compression from 'compression'
import config from 'config'
import express from 'express'
import expressWs from '@joepie91/express-ws' // todo by default we want use express-ws
import morgan from 'morgan'
import nodeDebug from 'debug'
import swig from 'swig'
import path from 'path'
import Promise from 'bluebird'

import middlewares from './middlewares'
import routes from './routes'

const debug = nodeDebug('tweetwall:app')
const {host, port} = config.get('tweetwall.app')

const app = Promise.promisifyAll(express())

expressWs(app)

app.engine('html', swig.renderFile)
app.set('view engine', 'html')
app.set('views', path.resolve(__dirname, '../../views'))
app.use(compression())
app.use(morgan('dev'))
app.use(express.static(path.resolve(__dirname, '../../public')))

app.use('/', middlewares(), routes())

app.listenAsync(port, host)
  .then(() => debug(`Server started, check '${host}:${port}'`))
  .catch((err) => debug('An error occurred during server startup: %s %j', err, err))
