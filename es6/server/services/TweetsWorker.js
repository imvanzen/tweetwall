'use strict'

import _ from 'lodash'
import config from 'config'
import nodeDebug from 'debug'
import Twit from 'twit'

import TweetsService from './TweetsService'

const debug = nodeDebug('tweetwall:services:TweetsWorker')
const twitterConfig = config.get('tweetwall.twitter')

const timeout_ms = 60 * 1000

class TweetsWorker extends Twit {
  constructor () {
    super(_.assign({}, twitterConfig, {timeout_ms}))

    this.lang = 'en'
    this.hashTags = [
      'javascript'
    ]

    return this.startWorking()
  }

  startWorking () {
    const options = {
      track: this.hashTags,
      language: this.lang
    }

    debug('statuses/filter', options)

    return this.stream('statuses/filter', options)
      .on('tweet', (tweet) => {
        if (_.isEmpty(tweet.retweeted_status)) {
          debug('processing tweet', tweet.id_str)

          TweetsService.putTweet(tweet)
            .then(() => {
              const {user: lead} = tweet

              return TweetsService.isLeadExists(lead.id_str)
                .then((isExists) => {
                  if (!isExists) {
                    return TweetsService.putLead(lead)
                      .then(() => {
                        return lead
                      })
                  }
                  return lead
                })
            })
            .then((lead) => {
              return TweetsService.increaseLeadTweetCount(lead.id_str)
            })
        } else {
          debug('not processed', tweet.id_str)
        }
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
