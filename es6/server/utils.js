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

const mapResponseToArray = (fbSnap) => {
  const newArray = []

  fbSnap.forEach((s) => {
    newArray.push(s.val())
  })

  return newArray
}

const replaceSpacesWithUnderscores = (str) => {
  return str.replace(' ', '_')
}

export {
  prepareWebsocketResponse,
  logAndReturn,
  logAndThrowError,
  mapResponseToArray,
  passThrough,
  replaceSpacesWithUnderscores
}
