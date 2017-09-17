import React from 'react'

import Step from './Step'

export default class Arrow extends React.Component {
  render () {
    return (
      <line
        x1='295'
        y1='50'
        x2='95'
        y2='175'
        stroke={Step.defaultProps.style.stroke}
        strokeWidth={Step.defaultProps.style.strokeWidth}
        markerEnd='url(#arrow)'
      />
    )
  }
}
