import React from 'react'

import no from 'not-defined'

import Process from './components/Process'
import Terminator from './components/Terminator'

export default class FlowChart extends React.Component {
  render () {
    const {
      diagram
    } = this.props

    const {
      items,
      style,
      height,
      width
    } = diagram

    if (no(items.process)) items.process = {}

    return (
      <svg
        height={height}
        width={width}
        style={style}
      >
        {Object.keys(items.process).map(key => {
          const item = items.process[key]

          return (
            <Process key={key}
              x={item.x}
              y={item.y}
              style={item.style}
              height={item.height}
              width={item.width}
            />
          )
        })}
        {Object.keys(items.terminator).map(key => {
          const item = items.terminator[key]

          return (
            <Terminator key={key}
              x={item.x}
              y={item.y}
              style={item.style}
              height={item.height}
              width={item.width}
            />
          )
        })}
      </svg>
    )
  }
}
