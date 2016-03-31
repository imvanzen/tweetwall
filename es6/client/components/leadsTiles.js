'use strict'

import _ from 'lodash'
import React, {Component} from 'react'

const leadTileItem = ({id, name, account, tweetsCount, profileImgUrl}, index) => (
  <div className='lead-item' key={index}>
    <figure>
      <img src={profileImgUrl} title={name} alt={name}/>
    </figure>
    <br />
    {id}:{name}:{account}:{tweetsCount}
  </div>
)

export default class LeadsTiles extends Component {
  render () {
    const {leadsList} = this.props

    return (
      <div className='leads-tiles'>
        {_.map(leadsList, leadTileItem)}
      </div>
    )
  }
}
