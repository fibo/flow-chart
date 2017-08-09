import React from 'react'

import {
  strokeDasharraySelected
} from '../utils/css'

export default class RectangularSelection extends React.Component {
  render () {
    const {
      height,
      x,
      y,
      width
    } = this.props

    const scaleX = width > 0 ? 1 : -1
    const scaleY = height > 0 ? 1 : -1

    return (
      <rect
        transform={`translate(${x} ${y}) scale(${scaleX} ${scaleY})`}
        height={Math.abs(height)}
        style={Object.assign({},
          {
            fill: 'transparent',
            stroke: 'gray',
            strokeWidth: 2
          },
          strokeDasharraySelected
        )}
        width={Math.abs(width)}
       />
    )
  }
}
