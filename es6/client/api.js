'use strict'

const timeline = () => {
  return new WebSocket(`ws://localhost:5000/timeline.io`, `protocolOne`)
}

export default {
  timeline
}
