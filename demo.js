import React from 'react'
import ReactDOM from 'react-dom'
import FlowChart from 'flow-chart'

const diagram = {
  items: {
    process: {
      aaa: {
        x: 10,
        y: 20,
        height: 20,
        width: 100
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
