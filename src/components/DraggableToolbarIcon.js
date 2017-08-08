import React from 'react'

import defaultStyle from './defaultStyle'

export default class DraggableToolbarIcon extends React.Component {
  render () {
    const {
      dropToolbarIcon,
      height,
      Item,
      width
    } = this.props

    const margin = defaultStyle.strokeWidth

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
