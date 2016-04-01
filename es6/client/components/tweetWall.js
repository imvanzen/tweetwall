'use strict'

import React, {Component} from 'react'

import TweetsTiles from './tweetsTiles'
import LeadsTiles from './leadsTiles'

import {stringifyTags} from './../utils'
import api from './../api'

export default class TweetWall extends Component {
  constructor (props) {
    super(props)

    this.state = {
      errMessage: null,
      tweetsList: [],
      leadsList: [],
      tagsList: [
        'saastech',
        'voucherify',
        'SaaSHeavyLifting',
        'CloudifyAPI',
        'rspective',
        'ckcrspective'
      ]
    }
  }

  loadWall () {
    api.getTweets()
      .then((tweetsList) => this.setState({tweetsList}))
      .catch(({message: errorMessage}) => this.setState({errorMessage}))
    api.getLeads()
      .then((leadsList) => this.setState({leadsList}))
      .catch(({message: errorMessage}) => this.setState({errorMessage}))
  }

  componentWillMount () {
    setInterval(() => {
      this.loadWall()
    }, 1000*15)
  }

  render () {
    const {
      errorMessage,
      leadsList,
      tagsList,
      tweetsList
    } = this.state

    return (
      <div>
        {header(tagsList)}
        <section className='main-content'>
          {tweetsList && <TweetsTiles tweetsList={tweetsList}/>}
          {leadsList && <LeadsTiles leadsList={leadsList}/>}
        </section>
        {footer()}
        {errorMessage && errorAlert(errorMessage)}
      </div>
    )
  }
}

const header = (tagsList) => (
  <header className='main-header clearfix'>
    <figure className='header-logo'>
      <img src='/img/rspective.png' alt='rspective'/>
    </figure>
    <div className='header-title-group'>
      <h1 className='header-title'>Tweet Wall</h1>
      <h2 className='header-subtitle'>Contribute to ours event</h2>
    </div>
    <h4 className='header-hashtags'>{stringifyTags(tagsList)}</h4>
  </header>
)

const footer = () => (
  <footer className='main-footer'>
    <div>Created by <a href='http://imvanzen.com' title='I&apos;m vanzen'>vanzen</a></div>
  </footer>
)

const errorAlert = (errorMessage) => (
  <div className='main-error'>{errorMessage}</div>
)
