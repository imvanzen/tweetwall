'use strict'

import nodeDebug from 'debug'
import express from 'express'

import TweetsService from './../services/TweetsService'

import {
  prepareWebsocketResponse
} from './../utils'

const debug = nodeDebug('tweetwall:routes')

export default () => {
  const router = express.Router()

  router.get('/', (req, res) => {
    debug('GET: /')

    res.render('index')
  })

  router.get('/tweets.json', (req, res) => {
    debug('GET: /tweets.json')

    res.json({})
  })

  router.get('/leads.json', (req, res) => {
    debug('GET: /leads.json')

    res.json({})
  })

  router.ws('/timeline.io', (ws, req) => {
    debug('WS: /timeline.io')

    ws.on('connected', () => {
      setInterval(() => {
        ws.send(prepareWebsocketResponse({}))
      }, 3000)
    })
  })

  return router
}
