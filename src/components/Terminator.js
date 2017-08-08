import React from 'react'

import defaultStyle from './defaultStyle'

export default class Terminator extends React.Component {
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

    const rectStyle = Object.assign({}, style, {
      strokeDasharray: `${width - height} ${height}`
    })

    const halfH = height / 2

    return (
      <g transform={`translate(${x},${y})`}>
        <rect
          x={halfH}
          height={height}
          style={rectStyle}
          width={width - height}
        />
        <path
          d={`M${halfH},0 A${halfH},${halfH} 0 0,0 ${halfH},${height}`}
          style={style}
        />
        <path
          d={`M${width - halfH},0 A${halfH},${halfH} 0 0,1 ${width - halfH},${height}`}
          style={style}
        />
      </g>
    )
  }
}
