'use strict'

import _ from 'lodash'
import config from 'config'
import nodeDebug from 'debug'
import Twit from 'twit'

import TweetsDao from './TweetsDao'

const debug = nodeDebug('tweetwall:services:twitter')
const twitterConfig = config.get('tweetwall.twitter')

const timeout_ms = 60 * 1000

class TweetsWorker extends Twit {
  constructor () {
    super(_.assign({}, twitterConfig, {timeout_ms}))

    this.lang = 'en'
    this.hashTags = [
      'javascript'
    ]

    this.startWorking()

    return this
  }

  startWorking () {
    const options = {
      track: this.hashTags,
      language: this.lang
    }

    debug('statuses/filter', options)

    this.stream('statuses/filter', options)
      .on('tweet', (tweet) => {
        debug('worker tweet', tweet.id)
        TweetsDao.putTweet(tweet)
      })
      .on('error', (err) => {
        debug('worker error', err)
      })
      .on('warning', (err) => {
        debug('worker warning', err)
      })
      .on('disconnect', (err) => {
        debug('worker disconnect', err)
      })
  }
}

export default new TweetsWorker
