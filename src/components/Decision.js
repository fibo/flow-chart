// @flow
import React from 'react'

import Step from './Step'

export default class Decision extends Step {
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

    const halfH = height / 2
    const halfW = width / 2

    return (
      <g
        onMouseDown={selectStep}
        onMouseUp={stopDragging}
        transform={`translate(${x},${y})`}
      >
        <path
          d={`M0 ${halfH} L${halfW} 0 L${width} ${halfH} L${halfW} ${height}Z`}
          style={Object.assign({},
            style,
            (selected ? { stroke: selectedColor } : {})
          )}
        />
      </g>
    )
  }
}
