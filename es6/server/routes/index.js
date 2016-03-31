'use strict'

import nodeDebug from 'debug'
import express from 'express'

import TweetsService from './../services/TweetsService'
import TweetsWorker from './../services/TweetsWorker'

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

    TweetsService.getTweets()
      .then((tweetsList) => {
        res.json(tweetsList)
      })
      .catch((err) => {
        debug(err)
        res.status(500).json({message: 'Internal Server Error!'})
      })
  })

  router.get('/leads.json', (req, res) => {
    debug('GET: /leads.json')

    TweetsService.getLeads()
      .then((leadsList) => {
        res.json(leadsList)
      })
      .catch((err) => {
        debug(err)
        res.status(500).json({message: 'Internal Server Error!'})
      })
  })

  router.ws('/timeline.io', (ws, req) => {
    debug('WS: /timeline.io')

    ws.on('connected', () => {
      TweetsWorker.on('error', (err) => {
        ws.send(prepareWebsocketResponse(err))
      })
    })
  })

  return router
}
