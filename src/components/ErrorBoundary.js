import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)

    this.state = { hasError: false }
  }

  componentDidCatch () {
    // Display fallback UI
    this.setState({ hasError: true })
  }

  render () {
    if (this.state.hasError) {
      return <h1>Could not load diagram</h1>
    }

    return this.props.children
  }
}
