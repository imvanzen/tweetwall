'use strict'

import compression from 'compression'
import config from 'config'
import express from 'express'
import expressWs from 'express-ws'
import morgan from 'morgan'
import nodeDebug from 'debug'
import swig from 'swig'
import path from 'path'
import Promise from 'bluebird'

import middlewares from './middlewares'
import routes from './routes'
import TwitterService from './services/twitterService'

const twitterService = new TwitterService()

const app = Promise.promisifyAll(express())
const debug = nodeDebug('tweetwall:app')
const {host, port} = config.get('tweetwall.app')

expressWs(app)

app.engine('html', swig.renderFile)
app.set('view engine', 'html')
app.set('views', path.resolve(__dirname, '../../views'))
app.use(compression())
app.use(morgan('dev'))
app.use(express.static(path.resolve(__dirname, '../../public')))

app.use('/', middlewares(), routes())

app.ws('/timeline.io', (ws, req) => {
  twitterService.send((tweet) => {
    ws.send(JSON.stringify(tweet))
  })
})

app.listenAsync(port, host)
  .then(() => debug(`Server started, check '${host}:${port}'`))
  .catch((err) => debug('An error occurred during server startup: %s %j', err, err))
