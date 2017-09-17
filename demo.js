import React from 'react'
import ReactDOM from 'react-dom'
import FlowChart from 'flow-chart'

const diagram = {
  steps: [
    {
      id: 'a',
      type: 'decision',
      x: 250,
      y: 120,
      width: 100
    },
    {
      id: 'b',
      type: 'process',
      x: 250,
      y: 20
    },
    {
      id: 'c',
      type: 'terminator',
      x: 20,
      y: 20,
      height: 20,
      width: 20
    }

  ]
  style: { backgroundColor: 'azure' },
  height: 800,
  width: 680
}

ReactDOM.render(
  <FlowChart diagram={diagram} editable />,
  document.getElementById('root')
)
