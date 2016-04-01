'use strict'

import _ from 'lodash'
import nodeDebug from 'debug'

import TweetsDao from './TweetsDao'

const debug = nodeDebug('tweetwall:services:TweetsService')

const leadMap = (l) => ({
  id: l.id_str,
  name: l.name,
  screenName: l.screen_name,
  profileImage: l.profile_image_url,
  tweetsCount: l.tweets_count,
  bgColor: l.profile_sidebar_fill_color
})

const tweetMap = (t) => ({
  id: t.id_str,
  text: t.text,
  authorName: t.user.name,
  authorAccountName: t.user.screen_name,
  createdAt: t.created_at,
  timestamp: t.timestamp_ms
})

class TweetsService {
  putTweet (tweet) {
    return TweetsDao.putTweet(tweet)
  }

  putLead (lead) {
    lead.tweets_count = 0
    return TweetsDao.putLead(lead)
  }

  getTweets () {
    return TweetsDao.getTweets()
      .then((tweetsList) => {
        return _(tweetsList)
          .takeRight(15)
          .map(tweetMap)
          .reverse()
          .value()
      })
      .catch((err) => {
        debug('getTweets', err)
      })
  }

  getLeads () {
    return TweetsDao.getLeads()
      .then((leadsList) => {
        return _(leadsList)
          .takeRight(10)
          .map(leadMap)
          .reverse()
          .value()
      })
      .catch((err) => {
        debug('getLeads', err)
      })
  }

  isLeadExists (leadId) {
    return TweetsDao.getLead(leadId)
      .then((lead) => {
        return !_.isEmpty(lead)
      })
  }

  increaseLeadTweetCount (leadId) {
    return TweetsDao.getLead(leadId)
      .then((lead) => {
        return TweetsDao.updateLead(leadId, {tweets_count: lead.tweets_count+1})
      })
  }
}

export default new TweetsService
