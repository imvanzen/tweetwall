'use strict'

import _ from 'lodash'
import React, {Component, PropTypes} from 'react'

import api from './../api'

export default class CoreApplication extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tweets: new Set()
    }

    this.timelineapi = api.timeline()
  }

  componentWillMount () {
    const {tweets} = this.state

    this.timelineapi.onmessage = ({data}) => {
      const {tweets} = this.state
      const tweet = JSON.parse(data)
      this.setState({
        tweets: tweets.add(tweet)
      })
    }

    this.timelineapi.onerror = (err) => {
      console.log(err)
    }
  }

  componentWillUnmount () {
    console.log('Connection closed')
    this.timelineapi.close()
  }

  render () {
    const {tweets} = this.state
    const listItem = ({author, message}, index) => <li key={index}><b>{author}</b> tweets:<br/><i>{message}</i></li>

    return (
      <div>
        <h3>Tweet Wall</h3>
        <ul>
          {_.map(Array.from(tweets), listItem)}
        </ul>
      </div>
    )
  }
}
