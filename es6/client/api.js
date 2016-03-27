'use strict'

const timeline = () => {
  return new WebSocket(`ws://localhost:8080/timeline.io`, `protocolOne`)
}

export default {
  timeline
}
