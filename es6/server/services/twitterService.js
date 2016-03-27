'use strict'

import config from 'config'
import nodeDebug from 'debug'
import TwitterStream from 'twitter-stream-api'
import {Writable} from 'stream'

const debug = nodeDebug('tweetwall:services:twitter')
const twitterConfig = config.get('tweetwall.twitter')
const Output = Writable({objectMode: true})

export default class twitterService {
  constructor () {
    this.twitter = new TwitterStream(twitterConfig, false)

    this.twitter.stream('statuses/filter', {
      track: 'javascript,meetjs'
    })

    this.twitter.on('connection success', function (uri) {
      debug('connection success', uri)
    })

    this.twitter.on('connection aborted', function () {
      debug('connection aborted')
    })

    this.twitter.on('connection error network', function () {
      debug('connection error network')
    })

    this.twitter.on('connection error stall', function () {
      debug('connection error stall')
    })

    this.twitter.on('connection error http', function (code) {
      debug('connection error http', code)
    })

    this.twitter.on('connection rate limit', function () {
      debug('connection rate limit')
    })

    this.twitter.on('connection error unknown', function () {
      debug('connection error unknown')
    })

    this.twitter.on('data keep-alive', function () {
      debug('data keep-alive')
    })

    this.twitter.on('data error', function () {
      debug('data error')
    })

    return this
  }

  send (handler) {
    Output._write = (obj, enc, next) => {
      debug(obj.id, obj.text)
      handler(obj)
      next()
    }

    this.twitter.pipe(Output)
  }
}
