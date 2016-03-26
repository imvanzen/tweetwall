'use strict'

import nodeDebug from 'debug'
import express from 'express'

const debug = nodeDebug('tweet-wall:routes')

export default () => {
  const router = express.Router()

  router.get('/', (req, res) => {
    return res.render('index')
  })

  return router
}
