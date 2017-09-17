import React from 'react'

import bindme from 'bindme'

import Step from './Step'

export default class Arrow extends React.Component {
  constructor (props) {
    super(props)

    bindme(this,
      'onMouseDown',
      'onMouseEnter',
      'onMouseLeave'
    )

    this.state = { isMouseOver: false }
  }

  onMouseDown () {
    // TODO selectArrow
  }

  onMouseEnter () { this.setState({ isMouseOver: true }) }

  onMouseLeave () { this.setState({ isMouseOver: false }) }

  render () {
    let {
      stroke,
      strokeWidth
    } = Step.defaultProps.style

    const { isMouseOver } = this.state

    if (isMouseOver) strokeWidth++

    return (
      <path
        d='M295 50 h100 v20 h50 v20'
        fill='none'
        onMouseDown={this.onMouseDown}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        stroke={Step.defaultProps.style.stroke}
        strokeWidth={strokeWidth}
        markerEnd='url(#arrow)'
      />
    )
  }
}
