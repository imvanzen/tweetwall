'use strict'

import config from 'config'
import nodeDebug from 'debug'
import Firebase from 'firebase'

const debug = nodeDebug('tweetwall:services:firebase')
const {host} = config.get('tweetwall.firebase')

export default class FirebaseService extends Firebase {
  constructor (modelName) {
    super(host)

    this.modelName = modelName
  }

  pushRecord (record) {
    return this.child(this.modelName).push(record)
  }
}
