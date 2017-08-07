import React from 'react'

export default class Process extends React.Component {
  render () {
    const {
      height,
      width,
      x,
      y,
      style
    } = Object.assign({}, this.props, {
      style: {
        fill: 'white',
        stroke: 'gray',
        strokeWidth: 2
      }
    })

    return (
      <rect
        x={x}
        y={y}
        height={height}
        style={style}
        width={width}
      />
    )
  }
}
