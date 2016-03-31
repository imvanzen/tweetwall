'use strict'

import _ from 'lodash'

const prepareWebsocketResponse = (json = {}) => JSON.stringify(json)

const passThrough = (res) => res

const logAndReturn = (debug, logMessage) => {
  return (result) => {
    debug(logMessage, result)
    return result
  }
}

const logAndThrowError = (debug, logMessage) => {
  return (err) => {
    debug(logMessage, result)
    throw new Error(err)
  }
}

const mapResponseToSet = (fbRes) => {
  const newSet = new Set()

  _.each(fbRes, (s) => {
    newSet.add(s.val())
  })

  return newSet
}

export {
  prepareWebsocketResponse,
  logAndReturn,
  logAndThrowError,
  mapResponseToSet,
  passThrough
}
