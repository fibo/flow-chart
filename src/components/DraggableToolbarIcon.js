import React from 'react'

export default class DraggableToolbarIcon extends React.Component {
  render () {
    const {
      dropToolbarIcon,
      height,
      Item,
      width
    } = this.props

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
            x={0}
            y={0}
            height={height}
            width={width}
          />
        </svg>
      </div>
    )
  }
}
