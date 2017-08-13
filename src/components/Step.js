// @flow
import React from 'react'

import {
  FselectStep,
  FstopDragging
} from '../types'

export default class Step extends React.Component {
  props: {
    height: number,
    onMouseDown?: (event: MouseEvent) => void,
    stopPropagation: (event: MouseEvent) => void,
    x: number,
    y: number,
    width: number,
    selected: boolean,
    selectedColor: 'string',
    selectStep: FselectStep,
    stopDragging: FstopDragging,
    style: any
  }

  static defaultProps = {
    height: 40,
    onMouseDown: Function.prototype,
    selected: false,
    selectedColor: 'tomato',
    selectStep: Function.prototype,
    stopDragging: Function.prototype,
    stopPropagation: (event) => { event.stopPropagation() },
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
