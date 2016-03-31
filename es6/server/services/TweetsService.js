'use strict'

import nodeDebug from 'debug'

import TweetsDao from './TweetsDao'

const debug = nodeDebug('tweetwall:services:TweetsService')

class TweetsService {
  getTweets () {
    return TweetsDao.getTweets()
      .then((tweetsList) => {
        return []
      })
      .catch((err) => {
        debug('getTweets', err)
      })
  }

  getLeads () {
    return TweetsDao.getLeads()
      .then((leadsList) => {
        return []
      })
      .catch((err) => {
        debug('getLeads', err)
      })
  }
}

export default new TweetsService
