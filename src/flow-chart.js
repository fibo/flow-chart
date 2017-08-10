import React from 'react'
import ReactDOM from 'react-dom'

import no from 'not-defined'

import defaultProps from './components/defaultProps'
import defaultStyle from './components/defaultStyle'

import Decision from './components/Decision'
import Process from './components/Process'
import RectangularSelection from './components/RectangularSelection'
import Terminator from './components/Terminator'
import Toolbar from './components/Toolbar'

const frame = ({ height, width, style, items }) => ({
  rectangularSelection,
  selected,
  selectItem
}) => (
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
        selectItem={selectItem(key)}
        {...defaultProps}
        {...items.decision[key]}
      />
    ))}
    {Object.keys(items.process).map(key => (
      <Process key={key}
        selected={selected[key]}
        selectItem={selectItem(key)}
        {...defaultProps}
        {...items.process[key]}
      />
    ))}
    {Object.keys(items.terminator).map(key => (
      <Terminator key={key}
        selected={selected[key]}
        selectItem={selectItem(key)}
        {...defaultProps}
        {...items.terminator[key]}
      />
    ))}
  </svg>
)

export default class FlowChart extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      diagram: props.diagram,
      isMouseMoving: false,
      isMouseOver: false,
      offset: { x: 0, y: 0 },
      rectangularSelection: null,
      scroll: { x: 0, y: 0 },
      selected: {}
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
      isMouseDown,
      isMouseOver,
      rectangularSelection,
      selected
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

      // Create item if dropped inside flowchart.
      if (isInsideFlowChart(coordinates)) {
        const id = generateId()

        const diagram = Object.assign({}, this.state.diagram)
        const itemType = Item.name.toLowerCase()

        if (no(diagram.items[itemType])) diagram.items[itemType] = {}

        const x = coordinates.x - (defaultProps.width / 2)
        const y = coordinates.y - toolbarHeight - (defaultProps.height / 2)

        diagram.items[itemType][id] = {x, y}

        setState({ diagram })
      }
    }

    const onMouseDown = (event) => {
      const coordinates = getCoordinates(event)

      setState({
        isMouseDown: true,
        rectangularSelection: {
          x: coordinates.x,
          y: coordinates.y - toolbarHeight,
          height: 0,
          width: 0
        },
        selected: {}
      })
    }

    const onMouseEnter = () => {
      setState({
        isMouseOver: true,
        rectangularSelection: null
      })
    }

    const onMouseLeave = () => {
      setState({
        isMouseOver: false,
        rectangularSelection: null
      })
    }

    const onMouseMove = (event) => {
      const coordinates = getCoordinates(event)

      if (rectangularSelection) {
        setState({
          rectangularSelection: {
            x: rectangularSelection.x,
            y: rectangularSelection.y,
            height: (coordinates.y - toolbarHeight - rectangularSelection.y),
            width: (coordinates.x - rectangularSelection.x)
          }
        })
      }
    }

    const onMouseUp = () => {
      setState({
        isMouseDown: false,
        rectangularSelection: null
      })
    }

    const selectItem = (key) => (ok) => {
      const item = {}
      item[key] = ok

      setState({
        selected: Object.assign({},
          this.state.selected,
          item
        )
      })
    }
    // Create an higher order component to be used as frame,
    // it appears twice in the JSX below depending if the FlowChart
    // is editable or not.

    const Frame = frame({height, width, style, items})

    return (
      editable ? (
        <div
          onMouseDown={onMouseDown}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          style={containerStyle}
        >
          <Toolbar
            dropToolbarIcon={dropToolbarIcon}
            fontSize={style.fontSize}
            height={toolbarHeight}
            width={width}
          />
          <Frame
            rectangularSelection={rectangularSelection}
            selected={selected}
            selectItem={selectItem}
          />
        </div>
      ) : <Frame />
    )
  }
}
