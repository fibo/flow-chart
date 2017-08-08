import React from 'react'

import defaultStyle from './defaultStyle'

export default class Decision extends React.Component {
  render () {
    const {
      editable,
      height,
      width,
      x,
      y,
      style
    } = Object.assign({}, this.props, {
      style: defaultStyle
    })

    const halfH = editable ? 100 : height / 2
    const halfW = width / 2

    return (
      <g transform={`translate(${x},${y})`}>
        <path
          d={`M0 ${halfH} L${halfW} 0 L${width} ${halfH} L${halfW} ${height}Z`}
          style={style}
        />
      </g>
    )
  }
}
