import React from 'react'

import Decision from './Decision'
import Process from './Process'
import Terminator from './Terminator'
import DraggableToolbarIcon from './DraggableToolbarIcon'

const componets = { Terminator, Decision, Process }

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
        <div
          style={{ display: 'flex' }}
        >
          {Object.keys(componets).map(itemType => (
            <DraggableToolbarIcon
              key={itemType}
              dropToolbarIcon={dropToolbarIcon}
              height={height}
              Item={componets[itemType]}
              width={1.618 * height}
            />
          ))}
        </div>
      </div>
    )
  }
}
