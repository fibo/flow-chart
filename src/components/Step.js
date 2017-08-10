// @flow
import React from 'react'

import { FselectStep } from '../types'

export default class Step extends React.Component {
  props: {
    height: number,
    onMouseDown: (event: MouseEvent) => void,
    x: number,
    y: number,
    width: number,
    selected: boolean,
    selectedColor: 'string',
    selectStep: FselectStep,
    style: any
  }

  static defaultProps = {
    height: 40,
    onMouseDown: Function.prototype,
    selected: false,
    selectedColor: 'tomato',
    selectStep: Function.prototype,
    style: {
      fill: 'white',
      fontSize: 14,
      stroke: 'gray',
      strokeWidth: 2
    },
    x: 0,
    y: 0,
    width: 100
  }
}
