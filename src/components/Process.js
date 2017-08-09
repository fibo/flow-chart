import React from 'react'

import defaultStyle from './defaultStyle'

import {
  strokeDasharraySelected
} from '../utils/css'

export default class Process extends React.Component {
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

    const onMouseDown = (event) => {
      event.stopPropagation()
      selectItem(!selected)
    }

    return (
      <g
        onMouseDown={onMouseDown}
        transform={`translate(${x},${y})`}
      >
        <rect
          height={height}
          style={Object.assign({},
            (selected ? strokeDasharraySelected : {}),
            style
          )}
          width={width}
        />
      </g>
    )
  }
}
