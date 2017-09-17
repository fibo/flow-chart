import React from 'react'
import ReactDOM from 'react-dom'

import bindme from 'bindme'
import no from 'not-defined'

import Canvas from './components/Canvas'
import ErrorBoundary from './components/ErrorBoundary'
import Step from './components/Step'
import Toolbar from './components/Toolbar'

import randomString from './utils/randomString'

export default class FlowChart extends React.Component {
  constructor (props) {
    super(props)

    bindme(this,
      'createArrow',
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

  createArrow (event) {
    event.stopPropagation()
  }

  dropToolbarIcon (StepIcon) {
    return (event) => {
      const {
        diagram,
        toolbarHeight
      } = this.state

      const coordinates = this.getCoordinates(event)

      // Create item if dropped inside flowchart.
      if (this.isInsideFlowChart(coordinates)) {
        const id = this.generateId(4)

        const type = StepIcon.name.toLowerCase()

        const x = coordinates.x - (Step.defaultProps.width / 2)
        const y = coordinates.y - toolbarHeight - (Step.defaultProps.height / 2)

        this.setState({
          diagram: Object.assign({},
            diagram,
            { steps: [...diagram.steps, { id, type, x, y }] }
          )
        })
      }
    }
  }

  generateId (l) {
    const newId = randomString(l)

    const idExists = this.state.diagram.steps.find(({ id }) => id === newId
    )

    // If new random id was found, try again with a longer random string.
    return idExists ? this.generateId(l + 1) : newId
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

  onDocumentKeydown (event) {
    const { code } = event

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

  onDocumentKeyup (event) {
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

      } else {
        const steps = [...diagram.steps]

        const deltaX = (dragging ? coordinates.x - dragging.x : 0)
        const deltaY = (dragging ? coordinates.y - dragging.y : 0)

        steps
          .filter(({ id }) => selected[id])
          .forEach(step => {
            step.x += deltaX
            step.y += deltaY
          })

        this.setState({
          diagram: Object.assign({}, diagram, { steps }),
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

    let selected = Object.assign({}, this.state.selected)

    if (rectangularSelection) {
      diagram.steps.forEach(({ id, x, y, width, height }) => {
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
          selected[id] = true
        }
      })
    }

    this.setState({
      dragging: null,
      isMouseDown: false,
      rectangularSelection: null,
      selected
    })
  }

  onWindowResize (container) {
    return () => {
      const rect = container.getBoundingClientRect()

      const dynamicView = {
        height: rect.height,
        width: rect.width
      }

      this.setState({ dynamicView })
    }
  }

  onWindowScroll () {
    const scroll = {
      x: window.scrollX,
      y: window.scrollY
    }

    this.setState({ scroll })
  }

  render () {
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
      height,
      width
    } = diagram

    const containerStyle = {
      boxShadow: isMouseOver ? '3px 4px 16px 0px rgba(0, 0, 0, 0.5)' : null,
      height: (toolbarHeight + height),
      width
    }

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
          <ErrorBoundary>
            <Canvas
              diagram={diagram}
              createArrow={this.createArrow}
              rectangularSelection={rectangularSelection}
              selected={selected}
              selectStep={this.selectStep}
              stopDragging={this.stopDragging}
            />
          </ErrorBoundary>
        </div>
      ) : <Canvas diagram={diagram} />
    )
  }

  selectStep (id) {
    return (event) => {
      event.stopPropagation()

      const {
        selected,
        shiftPressed
      } = this.state

      let selectedStep = shiftPressed ? Object.assign({}, selected) : {}
      selectedStep[id] = true

      this.setState({
        isMouseDown: true,
        selected: selectedStep
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
