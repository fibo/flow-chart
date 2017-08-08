import React from 'react'

import no from 'not-defined'

import Decision from './components/Decision'
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

    if (no(items.decision)) items.decision = {}
    if (no(items.process)) items.process = {}
    if (no(items.terminator)) items.terminator = {}

    return (
      <svg
        height={height}
        width={width}
        style={style}
      >
        {Object.keys(items.decision).map(key => (
          <Decision key={key} {...items.decision[key]} />
        ))}
        {Object.keys(items.process).map(key => (
          <Process key={key} {...items.process[key]} />
        ))}
        {Object.keys(items.terminator).map(key => (
          <Terminator key={key} {...items.terminator[key]} />
        ))}
      </svg>
    )
  }
}
