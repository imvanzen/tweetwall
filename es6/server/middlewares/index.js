'use strict'

import config from 'config'

const {host, port} = config.get('tweetwall.webpack')

export default () => {
  return (req, res, next) => {
    res.locals.config = {
      webpack: {
        host,
        port
      }
    }

    next()
  }
}
