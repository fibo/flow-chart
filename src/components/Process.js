import React from 'react'

import ConnectionPoint from './ConnectionPoint'
import Step from './Step'

export default class Process extends Step {
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

    const halfHeight = height / 2
    const halfWidth = width / 2

    return (
      <g
        onMouseUp={stopDragging}
        onMouseDown={selectStep}
        transform={`translate(${x},${y})`}
      >
        <rect
          height={height}
          style={style}
          width={width}
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

Process.defaultProps = Step.defaultProps
