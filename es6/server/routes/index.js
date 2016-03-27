'use strict'

import _ from 'lodash'
import nodeDebug from 'debug'
import express from 'express'

import TwitterService from './../services/twitterService.js'

const debug = nodeDebug('tweetwall:routes')

export default () => {
  const router = express.Router()

  router.get('/', (req, res) => {
    debug('/')

    const twitterService = new TwitterService()

    return res.render('index')
  })

  return router
}
