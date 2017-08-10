// @flow
import React from 'react'

import Step from './Step'

export default class Process extends Step {
  render () {
    const {
      height,
      width,
      x,
      y,
      selected,
      selectedColor,
      selectStep,
      style
    } = this.props

    return (
      <g
        onMouseDown={selectStep(!selected)}
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
