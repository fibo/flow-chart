import React from 'react'

import no from 'not-defined'

import defaultStyle from './components/defaultStyle'

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
  constructor (props) {
    super(props)

    this.state = {
      isMouseOver: false
    }
  }

  render () {
    // State and props.

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

    const {
      isMouseOver
    } = this.state

    const setState = this.setState.bind(this)

    // Defaults.

    if (no(items.decision)) items.decision = {}
    if (no(items.process)) items.process = {}
    if (no(items.terminator)) items.terminator = {}

    if (no(style.fontSize)) style.fontSize = defaultStyle.fontSize

    const toolbarHeight = 2 * style.fontSize

    const containerStyle = {
      boxShadow: isMouseOver ? '3px 4px 16px 0px rgba(0, 0, 0, 0.5)' : null,
      height: (toolbarHeight + height),
      width
    }

    // Events.

    const onMouseEnter = editable ? () => {
      setState({ isMouseOver: true })
    } : Function.prototype

    const onMouseLeave = editable ? () => {
      setState({ isMouseOver: false })
    } : Function.prototype

    // Create an higher order component to be used as frame,
    // it appears twice in the JSX below depending if the FlowChart
    // is editable or not.
    const Frame = frame({height, width, style, items})

    return (
      editable ? (
        <div
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          style={containerStyle}
        >
          <Toolbar
            width={width}
            height={toolbarHeight}
            fontSize={style.fontSize}
          />
          <Frame editable />
        </div>
      ) : <Frame />
    )
  }
}
