// @flow
import React from 'react'

import Step from './Step'

export default class Terminator extends Step {
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

    const rectStyle = Object.assign({},
      style,
      { strokeDasharray: `${width - height} ${height}` },
      (selected ? { stroke: selectedColor } : {})
    )

    const halfH = height / 2

    return (
      <g
        onMouseDown={selectStep}
        onMouseUp={stopDragging}
        transform={`translate(${x},${y})`}
      >
        <rect
          x={halfH}
          height={height}
          style={rectStyle}
          width={width - height}
        />
        <path
          d={`M${halfH},0 A${halfH},${halfH} 0 0,0 ${halfH},${height}`}
          style={Object.assign({},
            style,
            (selected ? { stroke: selectedColor } : {})
          )}
        />
        <path
          d={`M${width - halfH},0 A${halfH},${halfH} 0 0,1 ${width - halfH},${height}`}
          style={Object.assign({},
            style,
            (selected ? { stroke: selectedColor } : {})
          )}
        />
      </g>
    )
  }
}
