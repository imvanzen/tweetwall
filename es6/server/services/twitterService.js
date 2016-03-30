'use strict'

import _ from 'lodash'
import config from 'config'
import nodeDebug from 'debug'
import Twit from 'twit'

const debug = nodeDebug('tweetwall:services:twitter')
const twitterConfig = config.get('tweetwall.twitter')

const timeout_ms = 60 * 1000

export default class TwitterService extends Twit {
  constructor () {
    super(_.assign({}, twitterConfig, {timeout_ms}))

    this.lang = 'en'
  }

  streamTweetsByHashtag (hashTags) {
    return new Promise((resolve, reject) => {
      const options = {
        track: hashTags,
        language: this.lang
      }

      debug('statuses/filter', options)

      this.stream('statuses/filter', options)
        .on('tweet', (tweet) => {
          debug('Received tweet', tweet.id)
          resolve(tweet)
        })
        .on('error', (err) => reject(err))
        .on('warning', (err) => reject(err))
        .on('disconnect', (err) => reject(err))
    })
  }
}
