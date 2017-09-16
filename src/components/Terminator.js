import React from 'react'

import ConnectionPoint from './ConnectionPoint'
import Step from './Step'

export default class Terminator extends Step {
  render () {
    const {
      createArrow,
      height,
      width,
      x,
      y,
      multipleSelection,
      selected,
      selectStep,
      stopDragging
    } = this.props

    const showConnectionPoints = (selected && !multipleSelection)

    const style = this.getStyle()

    const rectStyle = Object.assign({},
      style,
      { strokeDasharray: `${width - height} ${height}` }
    )

    const halfHeight = height / 2
    const halfWidth = width / 2

    return (
      <g
        onMouseDown={selectStep}
        onMouseUp={stopDragging}
        transform={`translate(${x},${y})`}
      >
        <rect
          x={halfHeight}
          height={height}
          style={rectStyle}
          width={width - height}
        />
        <path
          d={`M${halfHeight},0 A${halfHeight},${halfHeight} 0 0,0 ${halfHeight},${height}`}
          style={style}
        />
        <path
          d={`M${width - halfHeight},0 A${halfHeight},${halfHeight} 0 0,1 ${width - halfHeight},${height}`}
          style={style}
        />
        {showConnectionPoints ? (
          <ConnectionPoint
            createArrow={createArrow}
            cx={0} cy={halfHeight}
          />
        ) : null}
        {showConnectionPoints ? (
          <ConnectionPoint
            createArrow={createArrow}
            cx={halfWidth} cy={0}
          />
        ) : null}
        {showConnectionPoints ? (
          <ConnectionPoint
            createArrow={createArrow}
            cx={width} cy={halfHeight}
          />
        ) : null}
        {showConnectionPoints ? (
          <ConnectionPoint
            createArrow={createArrow}
            cx={halfWidth} cy={height}
          />
        ) : null}
      </g>
    )
  }
}

Terminator.defaultProps = Step.defaultProps
