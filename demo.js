// @flow
import React from 'react'
import ReactDOM from 'react-dom'
import FlowChart from 'flow-chart'

const diagram = {
  items: {
    decision: {
      a: {
        x: 250,
        y: 120,
        width: 100
      }
    },
    process: {
      b: {
        x: 250,
        y: 20
      }
    },
    terminator: {
      c: {
        x: 20,
        y: 20,
        height: 25,
        width: 50
      }
    }
  },
  style: { backgroundColor: 'azure' },
  height: 800,
  width: 680,
}

ReactDOM.render(
  <FlowChart diagram={diagram} editable />,
  document.getElementById('root')
)
