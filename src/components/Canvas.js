import React from 'react'

import Decision from './Decision'
import Process from './Process'
import Terminator from './Terminator'

import RectangularSelection from './RectangularSelection'

export default class Canvas extends React.Component {
  render () {
    const {
      height,
      items,
      rectangularSelection,
      selected,
      selectStep,
      stopDragging,
      style,
      width
    } = this.props

    return (
      <svg
        height={height}
        width={width}
        style={style}
      >
        {rectangularSelection
          ? <RectangularSelection {...rectangularSelection} />
            : null}
        {Object.keys(items.decision).map(key => (
          <Decision key={key}
            selected={selected[key]}
            selectStep={selectStep(key)}
            stopDragging={stopDragging}
            {...items.decision[key]}
          />
        ))}
        {Object.keys(items.process).map(key => (
          <Process key={key}
            selected={selected[key]}
            selectStep={selectStep(key)}
            stopDragging={stopDragging}
            {...items.process[key]}
          />
        ))}
        {Object.keys(items.terminator).map(key => (
          <Terminator key={key}
            selected={selected[key]}
            selectStep={selectStep(key)}
            stopDragging={stopDragging}
            {...items.terminator[key]}
          />
        ))}
      </svg>
    )
  }
}
