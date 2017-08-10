import React from 'react'

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
        style={{
          fill: 'transparent',
          stroke: 'gray',
          strokeDasharray: '10 10',
          strokeWidth: 2
        }}
        width={Math.abs(width)}
       />
    )
  }
}
