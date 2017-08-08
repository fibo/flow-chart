import React from 'react'
import ReactDOM from 'react-dom'
import FlowChart from 'flow-chart'

const diagram = {
  items: {
    decision: {
      a: {
        x: 250,
        y: 120,
        height: 20,
        width: 100
      }
    },
    process: {
      a: {
        x: 250,
        y: 20,
        height: 20,
        width: 100
      }
    },
    terminator: {
      a: {
        x: 20,
        y: 20,
        height: 25,
        width: 80
      }
    }
  },
  style: { backgroundColor: 'azure' },
  height: 800,
  width: 680,
}

ReactDOM.render(
  <FlowChart diagram={diagram} />,
  document.getElementById('root')
)
