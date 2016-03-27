'use strict'

import nodeDebug from 'debug'
import express from 'express'

const debug = nodeDebug('tweetwall:routes')

export default () => {
  const router = express.Router()

  router.get('/', (req, res) => {
    debug('/')

    return res.render('index')
  })

  return router
}
