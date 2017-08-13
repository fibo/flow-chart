'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _bindme = require('bindme');

var _bindme2 = _interopRequireDefault(_bindme);

var _types = require('./types');

var _Canvas = require('./components/Canvas');

var _Canvas2 = _interopRequireDefault(_Canvas);

var _Step = require('./components/Step');

var _Step2 = _interopRequireDefault(_Step);

var _Toolbar = require('./components/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _randomString = require('./utils/randomString');

var _randomString2 = _interopRequireDefault(_randomString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlowChart = function (_React$Component) {
  _inherits(FlowChart, _React$Component);

  function FlowChart(props) {
    _classCallCheck(this, FlowChart);

    var _this = _possibleConstructorReturn(this, (FlowChart.__proto__ || Object.getPrototypeOf(FlowChart)).call(this, props));

    _this.state = {
      diagram: props.diagram,
      dragging: null,
      isMouseDown: false,
      isMouseMoving: false,
      isMouseOver: false,
      offset: { x: 0, y: 0 },
      rectangularSelection: null,
      scroll: { x: 0, y: 0 },
      selected: {},
      toolbarHeight: 2 * _Step2.default.defaultProps.style.fontSize
    };

    (0, _bindme2.default)(_this, 'dropToolbarIcon', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseUp', 'selectStep', 'stopDragging');
    return _this;
  }

  _createClass(FlowChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var container = _reactDom2.default.findDOMNode(this).parentNode;

      var offset = {
        x: container.offsetLeft,
        y: container.offsetTop
      };

      var scroll = {
        x: window.scrollX,
        y: window.scrollY
      };

      this.setState({
        offset: offset,
        scroll: scroll
      });
    }
  }, {
    key: 'dropToolbarIcon',
    value: function dropToolbarIcon(Item) {
      var _this2 = this;

      return function (event) {
        var toolbarHeight = _this2.state.toolbarHeight;


        var coordinates = _this2.getCoordinates(event);

        // Create item if dropped inside flowchart.
        if (_this2.isInsideFlowChart(coordinates)) {
          var id = _this2.generateId();

          var _diagram = Object.assign({}, _this2.state.diagram);
          var itemType = Item.name.toLowerCase();

          if (!_diagram.items[itemType]) _diagram.items[itemType] = {};

          var x = coordinates.x - _Step2.default.defaultProps.width / 2;
          var y = coordinates.y - toolbarHeight - _Step2.default.defaultProps.height / 2;

          _diagram.items[itemType][id] = { x: x, y: y };

          _this2.setState({ diagram: _diagram });
        }
      };
    }
  }, {
    key: 'generateId',
    value: function generateId() {
      var id = (0, _randomString2.default)(4);

      var items = Object.assign({ decision: {} }, { process: {} }, { terminator: {} }, this.state.diagram.items);

      var idExists = items.decision[id] || items.process[id] || items.terminator[id];

      return idExists ? this.generateId() : id;
    }
  }, {
    key: 'getCoordinates',
    value: function getCoordinates(event) {
      var _state = this.state,
          offset = _state.offset,
          scroll = _state.scroll;


      return {
        x: event.clientX - offset.x + scroll.x,
        y: event.clientY - offset.y + scroll.y
      };
    }
  }, {
    key: 'isInsideFlowChart',
    value: function isInsideFlowChart(coordinates) {
      var _state2 = this.state,
          diagram = _state2.diagram,
          offset = _state2.offset,
          scroll = _state2.scroll,
          toolbarHeight = _state2.toolbarHeight;
      var height = diagram.height,
          width = diagram.width;


      return coordinates.x > offset.x + scroll.x && coordinates.x < offset.x + scroll.x + width && coordinates.y > offset.y + scroll.y + toolbarHeight && coordinates.y < offset.y + scroll.y + height;
    }
  }, {
    key: 'onMouseDown',
    value: function onMouseDown(event) {
      var toolbarHeight = this.state.toolbarHeight;


      var coordinates = this.getCoordinates(event);

      var rectangularSelection = this.isInsideFlowChart(coordinates) ? {
        x: coordinates.x,
        y: coordinates.y - toolbarHeight,
        height: 0,
        width: 0
      } : null;

      this.setState({
        isMouseDown: true,
        rectangularSelection: rectangularSelection,
        selected: {}
      });
    }
  }, {
    key: 'onMouseEnter',
    value: function onMouseEnter() {
      this.setState({
        isMouseOver: true,
        rectangularSelection: null
      });
    }
  }, {
    key: 'onMouseLeave',
    value: function onMouseLeave() {
      this.setState({
        isMouseOver: false,
        rectangularSelection: null
      });
    }
  }, {
    key: 'onMouseMove',
    value: function onMouseMove(event) {
      var _state3 = this.state,
          diagram = _state3.diagram,
          dragging = _state3.dragging,
          isMouseDown = _state3.isMouseDown,
          rectangularSelection = _state3.rectangularSelection,
          selected = _state3.selected,
          toolbarHeight = _state3.toolbarHeight;


      var coordinates = this.getCoordinates(event);
      var draggedItems = Object.assign({}, diagram.items);

      if (Object.keys(selected).length > 0) {
        if (isMouseDown && dragging) {
          var deltaX = coordinates.x - dragging.x;
          var deltaY = coordinates.y - dragging.y;

          Object.keys(selected).forEach(function (key) {
            Object.keys(draggedItems).forEach(function (itemType) {
              if (draggedItems[itemType][key]) {
                draggedItems[itemType][key].x += deltaX;
                draggedItems[itemType][key].y += deltaY;
              }
            });
          });

          this.setState({
            dragging: coordinates,
            items: draggedItems
          });
        } else {
          this.setState({ dragging: coordinates });
        }
      }

      if (rectangularSelection) {
        this.setState({
          rectangularSelection: {
            x: rectangularSelection.x,
            y: rectangularSelection.y,
            height: coordinates.y - toolbarHeight - rectangularSelection.y,
            width: coordinates.x - rectangularSelection.x
          }
        });
      }
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp() {
      var _state4 = this.state,
          diagram = _state4.diagram,
          rectangularSelection = _state4.rectangularSelection;
      var items = diagram.items;


      var selected = {};

      if (rectangularSelection) {
        Object.keys(items).forEach(function (itemType) {
          Object.keys(items[itemType]).forEach(function (key) {
            var _Object$assign = Object.assign({}, _Step2.default.defaultProps, items[itemType][key]),
                x = _Object$assign.x,
                y = _Object$assign.y,
                height = _Object$assign.height,
                width = _Object$assign.width;

            // Consider when rectangular selection is reflected.


            var boundsX = rectangularSelection.width >= 0 ? rectangularSelection.x : rectangularSelection.x + rectangularSelection.width;
            var boundsY = rectangularSelection.height >= 0 ? rectangularSelection.y : rectangularSelection.y + rectangularSelection.height;
            var boundsH = Math.abs(rectangularSelection.height);
            var boundsW = Math.abs(rectangularSelection.width);

            var isInside = x >= boundsX && y >= boundsY && height <= boundsH && width <= boundsW;

            if (isInside) {
              selected[key] = true;
            }
          });
        });
      }

      this.setState({
        isMouseDown: false,
        rectangularSelection: null,
        selected: selected
      });
    }
  }, {
    key: 'render',
    value: function render() {
      // State and props.

      var editable = this.props.editable;
      var _state5 = this.state,
          diagram = _state5.diagram,
          isMouseOver = _state5.isMouseOver,
          rectangularSelection = _state5.rectangularSelection,
          selected = _state5.selected,
          toolbarHeight = _state5.toolbarHeight;
      var items = diagram.items,
          style = diagram.style,
          height = diagram.height,
          width = diagram.width;

      // Defaults.

      if (!items.decision) items.decision = {};
      if (!items.process) items.process = {};
      if (!items.terminator) items.terminator = {};

      var containerStyle = {
        boxShadow: isMouseOver ? '3px 4px 16px 0px rgba(0, 0, 0, 0.5)' : null,
        height: toolbarHeight + height,
        width: width
      };

      var commonCanvasProps = { height: height, width: width, style: style, items: items };

      return editable ? _react2.default.createElement(
        'div',
        {
          onMouseDown: this.onMouseDown,
          onMouseEnter: this.onMouseEnter,
          onMouseLeave: this.onMouseLeave,
          onMouseMove: this.onMouseMove,
          onMouseUp: this.onMouseUp,
          style: containerStyle
        },
        _react2.default.createElement(_Toolbar2.default, {
          dropToolbarIcon: this.dropToolbarIcon,
          fontSize: style.fontSize,
          height: toolbarHeight,
          width: width
        }),
        _react2.default.createElement(_Canvas2.default, _extends({}, commonCanvasProps, {
          rectangularSelection: rectangularSelection,
          selected: selected,
          selectStep: this.selectStep,
          stopDragging: this.stopDragging
        }))
      ) : _react2.default.createElement(_Canvas2.default, commonCanvasProps);
    }
  }, {
    key: 'selectStep',
    value: function selectStep(key) {
      var _this3 = this;

      return function (event) {
        var selected = _this3.state.selected;


        event.stopPropagation();

        if (selected[key]) return;

        var item = {};
        item[key] = true;

        _this3.setState({
          isMouseDown: true,
          selected: item
        });
      };
    }
  }, {
    key: 'stopDragging',
    value: function stopDragging(event) {
      this.setState({
        dragging: null,
        isMouseDown: false,
        rectangularSelection: null
      });
    }
  }]);

  return FlowChart;
}(_react2.default.Component);

exports.default = FlowChart;