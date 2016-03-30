'use strict'

import _ from 'lodash'
import React, {Component, PropTypes} from 'react'

import api from './../api'
import {timeAgo, tweetFormat} from './../utils'

const tweetItem = ({id, author, message, created}, index) => (
  <div className='tweet-item' key={index}>
    <b>{author}</b> tweets {timeAgo(created)}:
    <br/>
    <i>{tweetFormat(message)}</i>
  </div>
)

const leadItem = ({id, name, account, tweetsCount, profileImgUrl}, index) => (
  <div className='lead-item' key={index}>
    <figure>
      <img src={profileImgUrl} title={name} alt={name}/>
    </figure>
    <br />
    {id}:{name}:{account}:{tweetsCount}
  </div>
)

const header = (
  <header className='main-header'>
    <h3>Tweet Wall</h3>
  </header>
)

const footer = (
  <footer className='main-footer'>
    <div>Created by <a href='http://imvanzen.com' title='I am vanzen'>vanzen</a></div>
  </footer>
)

export default class CoreApplication extends Component {
  constructor (props) {
    super(props)

    this.state = {
      tweets: new Set(),
      leads: new Set()
    }

    this.timelineapi = api.timeline()
  }

  componentWillMount () {
    this.timelineapi.onmessage = ({data}) => {
      const {tweets} = this.state
      console.log(JSON.parse(data))
      this.setState({
        tweets: tweets.add(JSON.parse(data))
      })
    }

    this.timelineapi.onerror = (err) => {
      console.error(err)
    }
  }

  componentWillUnmount () {
    console.log('Connection closed')
    this.timelineapi.close()
  }

  render () {
    const {tweets, leads} = this.state

    return (
      <div classID='tweetwall'>
        {header}
        <section className='main-content'>
          <div className='content-tweets'>
            {_.map(Array.from(tweets), tweetItem)}
          </div>
          <div className='content-leads'>
            {_.map(Array.from(leads), leadItem)}
          </div>
        </section>
        {footer}
      </div>
    )
  }
}
