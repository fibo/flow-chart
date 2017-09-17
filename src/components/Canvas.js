import React from 'react'

import Decision from './Decision'
import Process from './Process'
import Terminator from './Terminator'

import RectangularSelection from './RectangularSelection'

const component = {
  decision: Decision,
  process: Process,
  terminator: Terminator
}
export default class Canvas extends React.Component {
  render () {
    const {
      createArrow,
      height,
      steps,
      rectangularSelection,
      selected,
      selectStep,
      stopDragging,
      style,
      width
    } = this.props

    const multipleSelection = Object.keys(selected).length > 1

    return (
      <svg
        height={height}
        width={width}
        style={style}
      >
        {steps.map((step, i) => {
          const { id, type } = step
          const Step = component[type]

          return (
            <Step key={i}
              createArrow={createArrow}
              multipleSelection={multipleSelection}
              selected={selected[id]}
              selectStep={selectStep(id)}
              stopDragging={stopDragging}
              {...step}
          />
          )
        })}
        {rectangularSelection
        ? <RectangularSelection {...rectangularSelection} />
          : null}
      </svg>
    )
  }
}
