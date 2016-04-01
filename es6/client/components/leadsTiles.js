'use strict'

import _ from 'lodash'
import React, {Component} from 'react'

const leadTileItem = ({id, name, screenName, tweetsCount, profileImage, bgColor}, index) => (
  <div className='lead-tile' key={index}>
    <div className='tile-wrapper'>
      <figure className='lead-profile-img'>
        <img src={profileImage} title={name} alt={name}/>
      </figure>
      <div className='tile-metric'>
        <div className='lead-name'>{name}</div>
        <div className='lead-screen-name'>@{screenName}</div>
        <div className='lead-tweets-count'>{tweetsCount} <span>{tweetsCount < 2 ? 'tweet' : 'tweets'}</span></div>
      </div>
    </div>
  </div>
)

export default class LeadsTiles extends Component {
  render () {
    const {leadsList} = this.props

    return (
      <div className='leads-tiles'>
        <div className='tiles-header'><span className='header-label'>Leaders</span></div>
        {_.map(leadsList, leadTileItem)}
      </div>
    )
  }
}
