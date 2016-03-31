'use strict'

import axios from 'axios'

import {
  extractDataFromResponse
} from './utils'

const timeline = () => {
  // todo use url parser
  return new WebSocket(`ws://localhost:5000/timeline.io`, `protocolOne`)
}

const getTweets = () => {
  return axios.get('/tweets.json')
    .then(extractDataFromResponse)
}

const getLeads = () => {
  return axios.get('/leads.json')
    .then(extractDataFromResponse)
}

export default {
  timeline,
  getTweets,
  getLeads
}
