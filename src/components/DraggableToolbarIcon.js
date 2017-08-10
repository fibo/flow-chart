// @flow
import React from 'react'

import { Area, FdropToolbarIcon } from '../types'

import Step from './Step'

export default class DraggableToolbarIcon extends React.Component {
  props: Area & {
  Item: Step,
  dropToolbarIcon: FdropToolbarIcon
}

  render () {
    const {
      dropToolbarIcon,
      height,
      Item,
      width
    } = this.props

    const margin = Item.defaultProps.style.strokeWidth

    return (
      <div
        draggable
        onDragEnd={dropToolbarIcon(Item)}
        style={{height, width}}
      >
        <svg
          height={height}
          width={width}
        >
          <Item
            x={margin}
            y={margin}
            height={height - (2 * margin)}
            width={width - (2 * margin)}
          />
        </svg>
      </div>
    )
  }
}
