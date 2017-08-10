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
      stopDragging,
      style
    } = this.props

    return (
      <g
        onMouseUp={stopDragging}
        onMouseDown={selectStep}
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
