#!/usr/bin/env node

'use strict'

const _ = require('lodash')
const config = require('config')
const nodeDebug = require('debug')
const Firebase = require('firebase')
const Fireproof = require('fireproof')

Fireproof.Promise = require('bluebird')

const host = config.get('tweetwall.firebase.host')
const debug = nodeDebug('tweetwall:getRandomTweet')

const firebase = new Firebase(host)
const fireproof = new Fireproof(firebase)

const getRandomIntInclusive = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getUserAccountName = function (tweet) {
  const user = tweet.user || {}
  return user.screen_name || '- unknown user account name -'
}

const getUserName = function (tweet) {
  const user = tweet.user || {}
  return user.name || '- unknown user name -'
}

const getTweets = function (user) {
  return fireproof
    .child('users/' + user + '/tweets')
    .once('value')
    .then((snap) => {
      const newArray = []
      snap.forEach((s) => {
        const snapVal = s.val()
        newArray.push([getUserName(snapVal), getUserAccountName(snapVal)])
      })
      return newArray
    })
}

getTweets('dev')
  .then((tweets) => {
    const min = 0
    const max = tweets.length - 1

    const winner = getRandomIntInclusive(min, max)

    debug('WINNER: ', `'${tweets[winner][0]}' aka @${tweets[winner][1]} !!!`)
    process.exit(0)
  }, (err) => {
    console.error(err)
    process.exit(1)
  })

