import React from 'react'

import Decision from './Decision'
import Process from './Process'
import Terminator from './Terminator'

import RectangularSelection from './RectangularSelection'

export default class Canvas extends React.Component {
  render () {
    const {
      createArrow,
      height,
      items,
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
        {Object.keys(items.decision).map(key => (
          <Decision key={key}
            createArrow={createArrow}
            multipleSelection={multipleSelection}
            selected={selected[key]}
            selectStep={selectStep(key)}
            stopDragging={stopDragging}
            {...items.decision[key]}
          />
        ))}
        {Object.keys(items.process).map(key => (
          <Process key={key}
            createArrow={createArrow}
            multipleSelection={multipleSelection}
            selected={selected[key]}
            selectStep={selectStep(key)}
            stopDragging={stopDragging}
            {...items.process[key]}
          />
        ))}
        {Object.keys(items.terminator).map(key => (
          <Terminator key={key}
            createArrow={createArrow}
            multipleSelection={multipleSelection}
            selected={selected[key]}
            selectStep={selectStep(key)}
            stopDragging={stopDragging}
            {...items.terminator[key]}
          />
        ))}
        {rectangularSelection
          ? <RectangularSelection {...rectangularSelection} />
            : null}
      </svg>
    )
  }
}
