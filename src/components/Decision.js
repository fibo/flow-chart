import React from 'react'

import defaultStyle from './defaultStyle'

import {
  strokeDasharraySelected
} from '../utils/css'

export default class Decision extends React.Component {
  render () {
    const {
      height,
      width,
      x,
      y,
      selected,
      selectItem,
      style
    } = Object.assign({}, {
      selected: false,
      selectItem: Function.prototype
    }, this.props, {
      style: defaultStyle
    })

    const halfH = height / 2
    const halfW = width / 2

    const onMouseDown = (event) => {
      event.stopPropagation()
      selectItem(!selected)
    }

    return (
      <g
        onMouseDown={onMouseDown}
        transform={`translate(${x},${y})`}
      >
        <path
          d={`M0 ${halfH} L${halfW} 0 L${width} ${halfH} L${halfW} ${height}Z`}
          style={Object.assign({},
            (selected ? strokeDasharraySelected : {}),
            style
          )}
        />
      </g>
    )
  }
}
