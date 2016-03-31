'use strict'

const timeAgo = (date) => {
  return date // todo return value of 'time ago'
}

const tweetFormat = (message) => {
  return message // todo colorize all links, hashtags and insert emoji icons
}

const stringifyTags = (tagsList) => {
  return _.map(tagsList, (t) => `#${t}`).join('  ')
}

const extractDataFromResponse = ({data}) => {
  return data
}

export {
  extractDataFromResponse,
  timeAgo,
  tweetFormat,
  stringifyTags
}
