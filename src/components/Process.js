import React from 'react'

import defaultStyle from './defaultStyle'

export default class Process extends React.Component {
  render () {
    const {
      height,
      width,
      x,
      y,
      style
    } = Object.assign({}, this.props, {
      style: defaultStyle
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
