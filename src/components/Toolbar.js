// @flow
import React from 'react'

import components from '../components'
import DraggableToolbarIcon from './DraggableToolbarIcon'
import { Area, FdropToolbarIcon } from '../types'

export default class Toolbar extends React.Component {
  props: Area & {
    dropToolbarIcon: FdropToolbarIcon
  }

  render () {
    const {
      dropToolbarIcon,
      height,
      width
    } = this.props

    return (
      <div
        style={{
          display: 'flex',
          height,
          width
        }}
      >
        <div
          style={{ display: 'flex' }}
        >
          {Object.keys(components).map(itemType => (
            <DraggableToolbarIcon
              key={itemType}
              dropToolbarIcon={dropToolbarIcon}
              height={height}
              Item={components[itemType]}
              width={1.618 * height}
            />
          ))}
        </div>
      </div>
    )
  }
}
