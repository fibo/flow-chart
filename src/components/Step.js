const Step = {
  defaultProps: {
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

export default Step
