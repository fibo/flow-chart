import React from 'react'
import ReactDOM from 'react-dom'

import no from 'not-defined'

import defaultProps from './components/defaultProps'
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
    {Object.keys(items.Decision).map(key => (
      <Decision key={key}
        editable
        {...defaultProps}
        {...items.Decision[key]}
      />
    ))}
    {Object.keys(items.Process).map(key => (
      <Process key={key}
        editable
        {...defaultProps}
        {...items.Process[key]}
      />
    ))}
    {Object.keys(items.Terminator).map(key => (
      <Terminator key={key}
        editable
        {...defaultProps}
        {...items.Terminator[key]}
      />
    ))}
  </svg>
)

export default class FlowChart extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      diagram: props.diagram,
      isMouseOver: false,
      offset: { x: 0, y: 0 },
      scroll: { x: 0, y: 0 }
    }
  }

  componentDidMount () {
    const setState = this.setState.bind(this)

    const container = ReactDOM.findDOMNode(this).parentNode

    const offset = {
      x: container.offsetLeft,
      y: container.offsetTop
    }

    const scroll = {
      x: window.scrollX,
      y: window.scrollY
    }

    setState({
      offset,
      scroll
    })
  }

  render () {
    // State and props.

    const {
      editable
    } = this.props

    const {
      diagram,
      isMouseOver
    } = this.state

    const {
      items,
      style,
      height,
      width
    } = diagram

    const setState = this.setState.bind(this)

    // Defaults.

    if (no(items.Decision)) items.Decision = {}
    if (no(items.Process)) items.Process = {}
    if (no(items.Terminator)) items.Terminator = {}

    if (no(style.fontSize)) style.fontSize = defaultStyle.fontSize

    const toolbarHeight = 2 * style.fontSize

    const containerStyle = {
      boxShadow: isMouseOver ? '3px 4px 16px 0px rgba(0, 0, 0, 0.5)' : null,
      height: (toolbarHeight + height),
      width
    }

    // Utils

    const randomString = (length) => {
      let result = ''

      while (result.length < length) {
        result += String.fromCharCode(97 + Math.floor(Math.random() * 26))
      }

      return result
    }

    const generateId = () => {
      const id = randomString(4)

      const diagram = Object.assign(
        { Decision: {} },
        { Process: {} },
        { Terminator: {} },
        this.state.diagram
      )

      const idExists = (
        diagram.Decision[id] ||
        diagram.Process[id] ||
        diagram.Terminator[id]
      )

      return idExists ? generateId() : id
    }

    // Events.

    const getCoordinates = (event) => {
      const {
        offset,
        scroll
      } = this.state

      return {
        x: event.clientX - offset.x + scroll.x,
        y: event.clientY - offset.y + scroll.y
      }
    }

    const isInsideFlowChart = (coordinates) => {
      const {
        offset,
        scroll
      } = this.state

      return (
        (coordinates.x > offset.x + scroll.x) &&
        (coordinates.x < offset.x + scroll.x + width) &&
        (coordinates.y > offset.y + scroll.y + toolbarHeight) &&
        (coordinates.y < offset.y + scroll.y + height)
      )
    }

    const dropToolbarIcon = (Item) => (event) => {
      const coordinates = getCoordinates(event)

      // Create item if droppd inside flowchart.
      if (isInsideFlowChart(coordinates)) {
        const id = generateId()

        const diagram = Object.assign({}, this.state.diagram)
        const itemType = Item.name

        if (no(diagram.items[itemType])) diagram.items[itemType] = {}

        const x = coordinates.x - (defaultProps.width / 2)
        const y = coordinates.y - toolbarHeight - (defaultProps.height / 2)

        diagram.items[itemType][id] = {x, y}

        setState({ diagram })
      }
    }

    const onMouseEnter = () => {
      setState({ isMouseOver: true })
    }

    const onMouseLeave = () => {
      setState({ isMouseOver: false })
    }

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
            dropToolbarIcon={dropToolbarIcon}
            fontSize={style.fontSize}
            getCoordinates={getCoordinates}
            height={toolbarHeight}
            width={width}
          />
          <Frame />
        </div>
      ) : <Frame />
    )
  }
}
