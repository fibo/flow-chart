/**
 * Abstract component
 */

import React from 'react'

export default class Step extends React.Component {
  getStyle () {
    const {
      selected,
      selectedColor,
      style
    } = this.props

    return Object.assign({},
      style,
      (selected ? { stroke: selectedColor } : {})
    )
  }
}

Step.defaultProps = {
  height: 40,
  onMouseDown: Function.prototype,
  selected: false,
  selectedColor: 'tomato',
  selectStep: Function.prototype,
  stopDragging: Function.prototype,
  stopPropagation: (event) => { event.stopPropagation() },
  style: {
    fill: 'white',
    fontSize: 14,
    stroke: 'gray',
    strokeWidth: 2
  },
  x: 0,
  y: 0,
  width: 100
}
