'use strict'

import _ from 'lodash'
import nodeDebug from 'debug'
import express from 'express'

// import twitterService from './../services/twitterService.js'

const debug = nodeDebug('tweetwall:routes')

export default () => {
  const router = express.Router()

  router.get('/', (req, res) => {
    debug('/')

    return res.render('index')
  })

  router.get('/get-tweets.json', (req, res) => {
    debug('/get-tweets.json')

    twitterService.getTweets()
      .then((tweetsList) => {
        debug('/get-tweets.json', tweetsList)

        if (_.isEmpty(tweetsList)) {
          return res.status(204).json(tweetsList)
        }

        return res.json(tweetsList)
      })
      .catch((err) => {
        debug('/get-tweets.json', err)

        return res.status(500).json({message: '500 Internal Server Error'})
      })
  })

  return router
}
