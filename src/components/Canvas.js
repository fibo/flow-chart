import React from 'react'

import validate from '../validate'

import Arrow from './Arrow'
import RectangularSelection from './RectangularSelection'
import Step from './Step'

import Decision from './Decision'
import Process from './Process'
import Terminator from './Terminator'

const component = {
  decision: Decision,
  process: Process,
  terminator: Terminator
}
export default class Canvas extends React.Component {
  constructor (props) {
    super(props)

    if (!validate(props.diagram)) {
      const error = new Error('Invalid flow-chart diagram')
      error.diagram = props.diagram
      throw error
    }
  }

  render () {
    const {
      createArrow,
      diagram,
      rectangularSelection,
      selected,
      selectStep,
      stopDragging
    } = this.props

    const {
      height,
      steps,
      style,
      width
    } = diagram

    const multipleSelection = Object.keys(selected).length > 1

    return (
      <svg
        height={height}
        width={width}
        style={style}
      >
        <defs>
          <marker
            id='arrow'
            markerWidth='10'
            markerHeight='10'
            refX='0'
            refY='3'
            orient='auto'
            markerUnits='strokeWidth'
          >
            <path
              d='M0,0 L0,6 L9,3 z'
              fill={Step.defaultProps.style.stroke}
            />
          </marker>
        </defs>
        <Arrow />
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
