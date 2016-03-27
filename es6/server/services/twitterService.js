'use strict'

import {Twitter} from 'twitter-js-client'
import config from 'config'
import Promise from 'bluebird'

const twitterConfig = config.get('tweetwall.twitter')

class twitterService {
  constructor () {
    this.count = 10
    this.twitter = Promise.promisifyAll(Twitter(twitterConfig))

    return this
  }

  getUserById (userId) {
    const parameters = {
      'user_id': userId
    }

    return this.getUserByParameters(parameters)
  }

  getUserByName (userName) {
    const parameters = {
      'user_id': userName
    }

    return this.getUserByParameters(parameters)
  }

  getUserByParameters (parameters) {
    return this.twitter.getUser(parameters)
  }

  getTweets (query) {
    const parameters = {
      'q': query,
      'count': this.count
    }

    return this.twitter.getSearch(parameters)
  }
}

export default new twitterService()
