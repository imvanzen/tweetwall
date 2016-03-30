'use strict'

import _ from 'lodash'
import config from 'config'
import nodeDebug from 'debug'
import Firebase from 'firebase'
import Fireproof from 'fireproof'
import Promise from 'bluebird'

const debug = nodeDebug('tweetwall:services:tweetsDao')
const {host} = config.get('tweetwall.firebase')

Fireproof.bless(Promise)

const mapResponseToSet = (snap) => {
  const tweets = new Set()

  _.each(snap, (s) => {
    tweets.add(s.val())
  })

  return tweets
}

class TweetsDao {
  constructor (dbRef) {
    this.username = 'vanzen' // todo Integrate with login by twitter
    this.dbRef = dbRef.child(`users/${this.username}`)
  }

  putTweet (tweet) {
    return this.dbRef.child('tweets')
      .push(tweet)
      .catch((err) => {
        debug('putTweet', err)
      })
  }

  getTweets () {
    return this.dbRef.child('tweets')
      .once('value')
      .then(mapResponseToSet)
      .catch((err) => {
        debug('getTweets', err)
      })
  }
}

export default new TweetsDao(new Fireproof(new Firebase(host)))
