import React from 'react'

import Decision from './Decision'
import DraggableToolbarIcon from './DraggableToolbarIcon'

export default class Toolbar extends React.Component {
  render () {
    const {
      dropToolbarIcon,
      fontSize,
      height,
      width
    } = this.props

    return (
      <div
        style={{
          display: 'flex',
          fontSize,
          height,
          width
        }}
      >
        <DraggableToolbarIcon
          dropToolbarIcon={dropToolbarIcon}
          height={height}
          Item={Decision}
          width={height}
        />
      </div>
    )
  }
}
