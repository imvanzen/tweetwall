'use strict'

import config from 'config'
import TwitterStream from 'twitter-stream-api'
import fs from 'fs'

const twitterConfig = config.get('tweetwall.twitter')

export default class twitterService {
  constructor () {
    this.twitter = new TwitterStream(twitterConfig, false)

    this.twitter.stream('statuses/filter', {
      track: 'meetjs'
    })

    this.twitter.pipe(fs.createWriteStream('./../../../tweets.json'))

    return this
  }
}
