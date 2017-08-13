import React from 'react'
import ReactDOM from 'react-dom'
import bindme from 'bindme'

import {
  Point,
  Rectangle
} from './types'

import Canvas from './components/Canvas'
import Step from './components/Step'
import Toolbar from './components/Toolbar'

import randomString from './utils/randomString'

export default class FlowChart extends React.Component {
  state: {
    diagram: {
      items: {
        decision: any,
        process: any,
        terminator: any
      },
      height: number,
      style: any,
      width: number
    },
    dragging?: Point,
    isMouseDown: boolean,
    isMouseMoving: boolean,
    isMouseOver: boolean,
    offset: Point,
    rectangularSelection?: Rectangle,
    scroll: Point,
    selected: any,
    toolbarHeight: number
  }

  constructor (props) {
    super(props)

    this.state = {
      diagram: props.diagram,
      dragging: null,
      isMouseDown: false,
      isMouseMoving: false,
      isMouseOver: false,
      offset: { x: 0, y: 0 },
      rectangularSelection: null,
      scroll: { x: 0, y: 0 },
      selected: {},
      toolbarHeight: (2 * Step.defaultProps.style.fontSize)
    }

    bindme(this,
      'dropToolbarIcon',
      'onMouseDown',
      'onMouseEnter',
      'onMouseLeave',
      'onMouseMove',
      'onMouseUp',
      'selectStep',
      'stopDragging'
    )
  }

  componentDidMount () {
    const container = ReactDOM.findDOMNode(this).parentNode

    const offset = {
      x: container.offsetLeft,
      y: container.offsetTop
    }

    const scroll = {
      x: window.scrollX,
      y: window.scrollY
    }

    this.setState({
      offset,
      scroll
    })
  }

  dropToolbarIcon (Item: Step) {
    return (event) => {
      const {
        toolbarHeight
      } = this.state

      const coordinates = this.getCoordinates(event)

      // Create item if dropped inside flowchart.
      if (this.isInsideFlowChart(coordinates)) {
        const id = this.generateId()

        const diagram = Object.assign({}, this.state.diagram)
        const itemType = Item.name.toLowerCase()

        if (!diagram.items[itemType]) diagram.items[itemType] = {}

        const x = coordinates.x - (Step.defaultProps.width / 2)
        const y = coordinates.y - toolbarHeight - (Step.defaultProps.height / 2)

        diagram.items[itemType][id] = {x, y}

        this.setState({ diagram })
      }
    }
  }

  generateId () {
    const id = randomString(4)

    const items = Object.assign(
      { decision: {} },
      { process: {} },
      { terminator: {} },
      this.state.diagram.items
    )

    const idExists = (
      items.decision[id] ||
      items.process[id] ||
      items.terminator[id]
    )

    return idExists ? this.generateId() : id
  }

  getCoordinates (event) {
    const {
      offset,
      scroll
    } = this.state

    return {
      x: event.clientX - offset.x + scroll.x,
      y: event.clientY - offset.y + scroll.y
    }
  }

  isInsideFlowChart (coordinates: Point) {
    const {
      diagram,
      offset,
      scroll,
      toolbarHeight
    } = this.state

    const { height, width } = diagram

    return (
      (coordinates.x > offset.x + scroll.x) &&
      (coordinates.x < offset.x + scroll.x + width) &&
      (coordinates.y > offset.y + scroll.y + toolbarHeight) &&
      (coordinates.y < offset.y + scroll.y + height)
    )
  }

  onMouseDown (event) {
    const {
      toolbarHeight
    } = this.state

    const coordinates = this.getCoordinates(event)

    const rectangularSelection = this.isInsideFlowChart(coordinates) ? ({
      x: coordinates.x,
      y: coordinates.y - toolbarHeight,
      height: 0,
      width: 0
    }) : null

    this.setState({
      isMouseDown: true,
      rectangularSelection,
      selected: {}
    })
  }

  onMouseEnter () {
    this.setState({
      isMouseOver: true,
      rectangularSelection: null
    })
  }

  onMouseLeave () {
    this.setState({
      isMouseOver: false,
      rectangularSelection: null
    })
  }

  onMouseMove (event) {
    const {
      diagram,
      dragging,
      isMouseDown,
      rectangularSelection,
      selected,
      toolbarHeight
    } = this.state

    const coordinates = this.getCoordinates(event)
    const draggedItems = Object.assign({}, diagram.items)

    if (Object.keys(selected).length > 0) {
      if (isMouseDown && dragging) {
        const deltaX = coordinates.x - dragging.x
        const deltaY = coordinates.y - dragging.y

        Object.keys(selected).forEach((key) => {
          Object.keys(draggedItems).forEach((itemType) => {
            if (draggedItems[itemType][key]) {
              draggedItems[itemType][key].x += deltaX
              draggedItems[itemType][key].y += deltaY
            }
          })
        })

        this.setState({
          dragging: coordinates,
          items: draggedItems
        })
      } else {
        this.setState({ dragging: coordinates })
      }
    }

    if (rectangularSelection) {
      this.setState({
        rectangularSelection: {
          x: rectangularSelection.x,
          y: rectangularSelection.y,
          height: (coordinates.y - toolbarHeight - rectangularSelection.y),
          width: (coordinates.x - rectangularSelection.x)
        }
      })
    }
  }

  onMouseUp () {
    const {
      diagram,
      rectangularSelection
    } = this.state

    const {
      items
    } = diagram

    let selected = {}

    if (rectangularSelection) {
      Object.keys(items).forEach((itemType) => {
        Object.keys(items[itemType]).forEach((key) => {
          const {
            x, y, height, width
          } = Object.assign({},
            Step.defaultProps,
            items[itemType][key]
          )

          // Consider when rectangular selection is reflected.
          const boundsX = rectangularSelection.width >= 0 ? rectangularSelection.x : rectangularSelection.x + rectangularSelection.width
          const boundsY = rectangularSelection.height >= 0 ? rectangularSelection.y : rectangularSelection.y + rectangularSelection.height
          const boundsH = Math.abs(rectangularSelection.height)
          const boundsW = Math.abs(rectangularSelection.width)

          const isInside = (
            (x >= boundsX) &&
            (y >= boundsY) &&
            (height <= boundsH) &&
            (width <= boundsW)
          )

          if (isInside) {
            selected[key] = true
          }
        })
      })
    }

    this.setState({
      isMouseDown: false,
      rectangularSelection: null,
      selected
    })
  }

  render () {
    // State and props.

    const {
      editable
    } = this.props

    const {
      diagram,
      isMouseOver,
      rectangularSelection,
      selected,
      toolbarHeight
    } = this.state

    const {
      items,
      style,
      height,
      width
    } = diagram

    // Defaults.

    if (!items.decision) items.decision = {}
    if (!items.process) items.process = {}
    if (!items.terminator) items.terminator = {}

    const containerStyle = {
      boxShadow: isMouseOver ? '3px 4px 16px 0px rgba(0, 0, 0, 0.5)' : null,
      height: (toolbarHeight + height),
      width
    }

    const commonCanvasProps = {height, width, style, items}

    return (
      editable ? (
        <div
          onMouseDown={this.onMouseDown}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          onMouseMove={this.onMouseMove}
          onMouseUp={this.onMouseUp}
          style={containerStyle}
        >
          <Toolbar
            dropToolbarIcon={this.dropToolbarIcon}
            fontSize={style.fontSize}
            height={toolbarHeight}
            width={width}
          />
          <Canvas
            {...commonCanvasProps}
            rectangularSelection={rectangularSelection}
            selected={selected}
            selectStep={this.selectStep}
            stopDragging={this.stopDragging}
          />
        </div>
      ) : <Canvas {...commonCanvasProps} />
    )
  }

  selectStep (key) {
    return (event) => {
      const {
        selected
      } = this.state

      event.stopPropagation()

      if (selected[key]) return

      const item = {}
      item[key] = true

      this.setState({
        isMouseDown: true,
        selected: item
      })
    }
  }

  stopDragging (event) {
    this.setState({
      dragging: null,
      isMouseDown: false,
      rectangularSelection: null
    })
  }
}
