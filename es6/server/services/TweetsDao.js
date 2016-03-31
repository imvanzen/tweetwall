'use strict'

import config from 'config'
import nodeDebug from 'debug'
import Firebase from 'firebase'
import Fireproof from 'fireproof'
import Promise from 'bluebird'

import {
  mapResponseToSet,
  logAndThrowError,
  passThrough
} from './../utils'

const debug = nodeDebug('tweetwall:services:tweetsDao')
const {host} = config.get('tweetwall.firebase')

Fireproof.bless(Promise)

class TweetsDao {
  constructor (dbRef) {
    this.username = 'vanzen' // todo Integrate with login by twitter
    this.dbRef = dbRef.child(`users/${this.username}`)
  }

  putTweet (tweet) {
    return this.dbRef
      .child(`tweets/${tweet.id}`)
      .set(tweet)
      .then(passThrough, logAndThrowError(debug, 'putTweet'))
  }

  getTweets () {
    return this.dbRef.child('tweets')
      .once('value')
      .then(mapResponseToSet, logAndThrowError(debug, 'getTweets'))
  }
}

export default new TweetsDao(new Fireproof(new Firebase(host)))
