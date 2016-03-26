'use strict'

import React from 'react'
import ReactDom from 'react-dom'
import TweetWall from './components/tweetWall'

import 'normalize.css'
import './styles/main.scss'

ReactDom.render(<TweetWall />, document.getElementById('TweetWall'))
