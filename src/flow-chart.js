import React from 'react'
import ReactDOM from 'react-dom'

import bindme from 'bindme'
import no from 'not-defined'

import Canvas from './components/Canvas'
import Step from './components/Step'
import Toolbar from './components/Toolbar'

import randomString from './utils/randomString'

export default class FlowChart extends React.Component {
  constructor (props) {
    super(props)

    bindme(this,
      'dropToolbarIcon',
      'onDocumentKeydown',
      'onDocumentKeyup',
      'onMouseDown',
      'onMouseEnter',
      'onMouseLeave',
      'onMouseMove',
      'onMouseUp',
      'onWindowResize',
      'onWindowScroll',
      'selectStep',
      'stopDragging'
    )

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
      shiftPressed: false,
      toolbarHeight: (2 * Step.defaultProps.style.fontSize)
    }
  }

  componentDidMount () {
    const container = ReactDOM.findDOMNode(this).parentNode

    document.addEventListener('keydown', this.onDocumentKeydown)
    document.addEventListener('keyup', this.onDocumentKeyup)

    window.addEventListener('scroll', this.onWindowScroll)
    window.addEventListener('resize', this.onWindowResize(container))

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

  dropToolbarIcon (Item) {
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

  isInsideFlowChart (coordinates) {
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

  onDocumentKeydown () {
    const { code } = event

    const {
      selected,
      shiftPressed
    } = this.state

    const unit = shiftPressed ? 1 : 10

    switch (code) {
      case 'Escape':
        this.setState({ selected: {} })
        break

      case 'ShiftLeft':
      case 'ShiftRight':
        this.setState({ shiftPressed: true })

        break

      default:
        break
    }
  }

  onDocumentKeyup () {
    const { code } = event

    switch (code) {
      case 'ShiftLeft':
      case 'ShiftRight':
        this.setState({ shiftPressed: false })
        break

      default:
        break
    }
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

    if (!isMouseDown) return

    const coordinates = this.getCoordinates(event)

    if (rectangularSelection) {
      this.setState({
        rectangularSelection: {
          x: rectangularSelection.x,
          y: rectangularSelection.y,
          height: (coordinates.y - toolbarHeight - rectangularSelection.y),
          width: (coordinates.x - rectangularSelection.x)
        }
      })
    } else {
      if (no(selected)) {
        return
      } else {
        const items = Object.assign({}, diagram.items)

        const deltaX = (dragging ? coordinates.x - dragging.x : 0)
        const deltaY = (dragging ? coordinates.y - dragging.y : 0)

        Object.keys(selected).forEach((key) => {
          Object.keys(items).forEach((type) => {
            if (items[type][key]) {
              items[type][key].x += deltaX
              items[type][key].y += deltaY
            }
          })
        })

        this.setState({
          diagram: Object.assign({}, diagram, { items }),
          dragging: coordinates
        })
      }
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

    let selected = Object.assign({}, this.state.selected)

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
      dragging: null,
      isMouseDown: false,
      rectangularSelection: null,
      selected
    })
  }

  onWindowResize (container): void {
    return () => {
      const rect = container.getBoundingClientRect()

      const dynamicView = {
        height: rect.height,
        width: rect.width
      }

      this.setState({ dynamicView })
    }
  }

  onWindowScroll (): void {
    const scroll = {
      x: window.scrollX,
      y: window.scrollY
    }

    this.setState({ scroll })
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
        selected,
        shiftPressed
      } = this.state

      event.stopPropagation()

      if (selected[key]) return

      const item = shiftPressed ? Object.assign({}, selected) : {}
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
