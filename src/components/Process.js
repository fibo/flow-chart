import React from 'react'

import defaultStyle, { selectedColor } from './defaultStyle'

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
            style,
            (selected ? { stroke: selectedColor } : {})
          )}
          width={width}
        />
      </g>
    )
  }
}
