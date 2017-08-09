import React from 'react'

import defaultStyle from './defaultStyle'

import {
  strokeDasharraySelected
} from '../utils/css'

export default class Terminator extends React.Component {
  render () {
    const {
      height,
      width,
      x,
      y,
      selected,
      selectItem,
      style
    } = Object.assign({}, {
      selected: false,
      selectItem: Function.prototype
    }, this.props, {
      style: defaultStyle
    })

    const rectStyle = Object.assign({}, style, {
      strokeDasharray: `${width - height} ${height}`
    })

    const halfH = height / 2

    const onMouseDown = (event) => {
      event.stopPropagation()
      selectItem(!selected)
    }

    return (
      <g
        onMouseDown={onMouseDown}
        transform={`translate(${x},${y})`}
      >
        <rect
          x={halfH}
          height={height}
          style={Object.assign({},
            rectStyle,
            (selected ? strokeDasharraySelected : {})
          )}
          width={width - height}
        />
        <path
          d={`M${halfH},0 A${halfH},${halfH} 0 0,0 ${halfH},${height}`}
          style={Object.assign({},
            (selected ? strokeDasharraySelected : {}),
            style
          )}
        />
        <path
          d={`M${width - halfH},0 A${halfH},${halfH} 0 0,1 ${width - halfH},${height}`}
          style={Object.assign({},
            (selected ? strokeDasharraySelected : {}),
            style
          )}
        />
      </g>
    )
  }
}
