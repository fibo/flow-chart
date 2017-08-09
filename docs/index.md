---
title: flow-chart
flow: /empty.json
---
# flow-chart

> is a collection of [React] components to draw an algorithm, workflow or process diagram

## Installation

[React] is required as a peer dependency.

```bash
npm i react react-dom flow-chart
```

## Synopsis

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import FlowChart from 'flow-chart'

const diagram = {
  items: {
    terminator: {
      a: {
        x: 20,
        y: 20,
        height: 25,
        width: 80
      }
    }
  },
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
