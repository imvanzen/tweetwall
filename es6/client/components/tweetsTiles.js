'use strict'

import _ from 'lodash'
import React, {Component} from 'react'

import {ago, format} from './../utils'

const tillMediaFigure = (mediaUrl, authorName) => (
  <div className='tweet-media' style={{backgroundImage: `url(${mediaUrl})`}}/>
)

const tweetTileItem = ({id, authorName, authorAccountName, text, createdAt, timestamp, media}, index) => (
  <div className={`tweet-tile ${media ? 'tile-with-media clearfix' : ''}`} key={index}>
    <div className='tile-wrapper'>
      {media && tillMediaFigure(media, authorName)}
      <div className='tweet-text' dangerouslySetInnerHTML={{__html: format(text)}}/>
      <div className='tweet-caption'>@{authorAccountName}<br /><small>tweets <b>{ago(createdAt)}</b></small></div>
    </div>
  </div>
)

export default class TweetsTiles extends Component {
  render () {
    const {tweetsList} = this.props

    return (
      <div className='tweets-tiles clearfix'>
        {_.map(tweetsList, tweetTileItem)}
      </div>
    )
  }
}
