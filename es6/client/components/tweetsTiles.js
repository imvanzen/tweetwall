'use strict'

import _ from 'lodash'
import React, {Component} from 'react'

import {timeAgo, tweetFormat} from './../utils'

const tweetTileItem = ({id, author, message, created}, index) => (
  <div className='tweet-item' key={index}>
    <b>{author}</b> tweets {timeAgo(created)}:
    <br/>
    <i>{tweetFormat(message)}</i>
  </div>
)

export default class TweetsTiles extends Component {
  render () {
    const {tweetsList} = this.props
    
    return (
      <div className='tweets-tiles'>
        {_.map(tweetsList, tweetTileItem)}
      </div>
    )
  }
}
