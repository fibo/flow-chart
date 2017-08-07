import React from 'react'

export default class Terminator extends React.Component {
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

    const rectStyle = Object.assign({}, style, {
      strokeDasharray: `${width} ${height} ${width} ${height}`
    })

    return (
      <g transform={`translate(${x},${y})`}>
        <rect
          height={height}
          style={rectStyle}
          width={width}
        />
        <path
          d={`M0,0 A${height/2},${height/2} 0 0,0 0,${height}`}
          style={style}
        />
        <path
          d={`M${width},0 A${height/2},${height/2} 0 0,1 ${width},${height}`}
          style={style}
        />
      </g>
    )
  }
}
