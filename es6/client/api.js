'use strict'

const timeline = () => {
  // todo use url parser
  return new WebSocket(`ws://localhost:5000/timeline.io`, `protocolOne`)
}

export default {
  timeline
}
