'use strict'

import timeAgo from 'time-ago'
import htmlTweet from 'html-tweet'

const ta = timeAgo()
const ht = htmlTweet({
  hashtag: '<span class=\'hashtag\'><%= hashtag %></span>',
  mention: '<span class=\'mention\'><%= mention %></span>',
  url: '<span class=\'url\'><%= url %></span>'
})

const ago = (date) => {
  return ta.ago(date)
}

const format = (message) => {
  return ht(message)
}

const stringifyTags = (tagsList) => {
  return _.map(tagsList, (t) => `#${t}`).join('  ')
}

const extractDataFromResponse = ({data}) => {
  return data
}

export {
  extractDataFromResponse,
  ago,
  format,
  stringifyTags
}
