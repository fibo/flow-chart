# flow-chart

> is a collection of [React] components to draw an algorithm, workflow or process diagram

**This package is at an early stage of development, contributions are welcome**.

## Installation

[React] is required as a peer dependency.

```bash
npm i react react-dom flow-chart
```

## Synopsis

Render a flow chart diagram.

```javascript
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

  ],
  style: { backgroundColor: 'azure' },
  height: 800,
  width: 680
}

ReactDOM.render(
  <FlowChart diagram={diagram} editable />,
  document.getElementById('root')
)
```

## License

[MIT](http://g14n.info/mit-license)

[React]: https://facebook.github.io/react/
