import React from 'react'

export default class Toolbar extends React.Component {
  render () {
    const {
      height,
      width,
      fontSize
    } = this.props

    return (
      <div style={{ width, height, fontSize }}>toolbar</div>
    )
  }
}
