import React from 'react'

import no from 'not-defined'

import Decision from './components/Decision'
import Process from './components/Process'
import Terminator from './components/Terminator'
import Toolbar from './components/Toolbar'

const frame = ({ height, width, style, items }) => ({ editable }) => (
  <svg
    height={height}
    width={width}
    style={style}
  >
    {Object.keys(items.decision).map(key => (
      <Decision key={key} {...items.decision[key]} editable />
    ))}
    {Object.keys(items.process).map(key => (
      <Process key={key} {...items.process[key]} editable />
    ))}
    {Object.keys(items.terminator).map(key => (
      <Terminator key={key} {...items.terminator[key]} editable />
    ))}
  </svg>
)

export default class FlowChart extends React.Component {
  render () {
    const {
      diagram,
      editable
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

    const Frame = frame({height, width, style, items})

    return (
      editable ? (
        <div>
          <Toolbar />
          <Frame editable />
        </div>
      ) : <Frame />
    )
  }
}
