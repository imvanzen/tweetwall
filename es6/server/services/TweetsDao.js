'use strict'

import config from 'config'
import nodeDebug from 'debug'
import Firebase from 'firebase'
import Fireproof from 'fireproof'
import Promise from 'bluebird'

import {
  mapResponseToArray,
  logAndThrowError,
  passThrough
} from './../utils'

const debug = nodeDebug('tweetwall:services:TweetsDao')
const {host} = config.get('tweetwall.firebase')

Fireproof.bless(Promise)

class TweetsDao {
  constructor (dbRef) {
    this.username = 'vanzen' // todo Integrate with login by twitter
    this.dbRef = dbRef.child(`users/${this.username}`)
  }

  putTweet (tweet) {
    return this.dbRef
      .child(`tweets/${tweet.id_str}`)
      .set(tweet)
      .then(passThrough, logAndThrowError(debug, 'putTweet'))
  }

  putLead (lead) {
    return this.dbRef
      .child(`leads/${lead.id_str}`)
      .set(lead)
      .then(passThrough, logAndThrowError(debug, 'putLead'))
  }

  getTweets () {
    return this.dbRef.child('tweets')
      .orderByChild('timestamp_ms')
      .once('value')
      .then(mapResponseToArray, logAndThrowError(debug, 'getTweets'))
  }

  getLeads () {
    return this.dbRef.child('leads')
      .orderByChild('tweets_count')
      .once('value')
      .then(mapResponseToArray, logAndThrowError(debug, 'getLeads'))
  }

  getLead (leadId) {
    return this.dbRef
      .child(`leads/${leadId}`)
      .once('value')
      .then((snap) => {
        return snap.val()
      }, logAndThrowError(debug, 'getLead'))
  }

  updateLead (leadId, leadData) {
    return this.dbRef
      .child(`leads/${leadId}`)
      .update(leadData)
      .then(passThrough, logAndThrowError(debug, 'updateLead'))
  }
}

export default new TweetsDao(new Fireproof(new Firebase(host)))
