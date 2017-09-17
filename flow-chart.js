'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _bindme = require('bindme');

var _bindme2 = _interopRequireDefault(_bindme);

var _notDefined = require('not-defined');

var _notDefined2 = _interopRequireDefault(_notDefined);

var _Canvas = require('./components/Canvas');

var _Canvas2 = _interopRequireDefault(_Canvas);

var _ErrorBoundary = require('./components/ErrorBoundary');

var _ErrorBoundary2 = _interopRequireDefault(_ErrorBoundary);

var _Step = require('./components/Step');

var _Step2 = _interopRequireDefault(_Step);

var _Toolbar = require('./components/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _randomString = require('./utils/randomString');

var _randomString2 = _interopRequireDefault(_randomString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var FlowChart = function (_React$Component) {
  _inherits(FlowChart, _React$Component);

  function FlowChart(props) {
    _classCallCheck(this, FlowChart);

    var _this = _possibleConstructorReturn(this, (FlowChart.__proto__ || Object.getPrototypeOf(FlowChart)).call(this, props));

    (0, _bindme2.default)(_this, 'createArrow', 'dropToolbarIcon', 'onDocumentKeydown', 'onDocumentKeyup', 'onMouseDown', 'onMouseEnter', 'onMouseLeave', 'onMouseMove', 'onMouseUp', 'onWindowResize', 'onWindowScroll', 'selectStep', 'stopDragging');

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
      shiftPressed: false,
      toolbarHeight: 2 * _Step2.default.defaultProps.style.fontSize
    };
    return _this;
  }

  _createClass(FlowChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var container = _reactDom2.default.findDOMNode(this).parentNode;

      document.addEventListener('keydown', this.onDocumentKeydown);
      document.addEventListener('keyup', this.onDocumentKeyup);

      window.addEventListener('scroll', this.onWindowScroll);
      window.addEventListener('resize', this.onWindowResize(container));

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
    key: 'createArrow',
    value: function createArrow(event) {
      event.stopPropagation();
    }
  }, {
    key: 'dropToolbarIcon',
    value: function dropToolbarIcon(StepIcon) {
      var _this2 = this;

      return function (event) {
        var _state = _this2.state,
            diagram = _state.diagram,
            toolbarHeight = _state.toolbarHeight;


        var coordinates = _this2.getCoordinates(event);

        // Create item if dropped inside flowchart.
        if (_this2.isInsideFlowChart(coordinates)) {
          var id = _this2.generateId(4);

          var type = StepIcon.name.toLowerCase();

          var x = coordinates.x - _Step2.default.defaultProps.width / 2;
          var y = coordinates.y - toolbarHeight - _Step2.default.defaultProps.height / 2;

          _this2.setState({
            diagram: Object.assign({}, diagram, { steps: [].concat(_toConsumableArray(diagram.steps), [{ id: id, type: type, x: x, y: y }]) })
          });
        }
      };
    }
  }, {
    key: 'generateId',
    value: function generateId(l) {
      var newId = (0, _randomString2.default)(l);

      var idExists = this.state.diagram.steps.find(function (_ref) {
        var id = _ref.id;
        return id === newId;
      });

      // If new random id was found, try again with a longer random string.
      return idExists ? this.generateId(l + 1) : newId;
    }
  }, {
    key: 'getCoordinates',
    value: function getCoordinates(event) {
      var _state2 = this.state,
          offset = _state2.offset,
          scroll = _state2.scroll;


      return {
        x: event.clientX - offset.x + scroll.x,
        y: event.clientY - offset.y + scroll.y
      };
    }
  }, {
    key: 'isInsideFlowChart',
    value: function isInsideFlowChart(coordinates) {
      var _state3 = this.state,
          diagram = _state3.diagram,
          offset = _state3.offset,
          scroll = _state3.scroll,
          toolbarHeight = _state3.toolbarHeight;
      var height = diagram.height,
          width = diagram.width;


      return coordinates.x > offset.x + scroll.x && coordinates.x < offset.x + scroll.x + width && coordinates.y > offset.y + scroll.y + toolbarHeight && coordinates.y < offset.y + scroll.y + height;
    }
  }, {
    key: 'onDocumentKeydown',
    value: function onDocumentKeydown(event) {
      var code = event.code;


      switch (code) {
        case 'Escape':
          this.setState({ selected: {} });
          break;

        case 'ShiftLeft':
        case 'ShiftRight':
          this.setState({ shiftPressed: true });

          break;

        default:
          break;
      }
    }
  }, {
    key: 'onDocumentKeyup',
    value: function onDocumentKeyup(event) {
      var code = event.code;


      switch (code) {
        case 'ShiftLeft':
        case 'ShiftRight':
          this.setState({ shiftPressed: false });
          break;

        default:
          break;
      }
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
      var _state4 = this.state,
          diagram = _state4.diagram,
          dragging = _state4.dragging,
          isMouseDown = _state4.isMouseDown,
          rectangularSelection = _state4.rectangularSelection,
          selected = _state4.selected,
          toolbarHeight = _state4.toolbarHeight;


      if (!isMouseDown) return;

      var coordinates = this.getCoordinates(event);

      if (rectangularSelection) {
        this.setState({
          rectangularSelection: {
            x: rectangularSelection.x,
            y: rectangularSelection.y,
            height: coordinates.y - toolbarHeight - rectangularSelection.y,
            width: coordinates.x - rectangularSelection.x
          }
        });
      } else {
        if ((0, _notDefined2.default)(selected)) {} else {
          var steps = [].concat(_toConsumableArray(diagram.steps));

          var deltaX = dragging ? coordinates.x - dragging.x : 0;
          var deltaY = dragging ? coordinates.y - dragging.y : 0;

          steps.filter(function (_ref2) {
            var id = _ref2.id;
            return selected[id];
          }).forEach(function (step) {
            step.x += deltaX;
            step.y += deltaY;
          });

          this.setState({
            diagram: Object.assign({}, diagram, { steps: steps }),
            dragging: coordinates
          });
        }
      }
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp() {
      var _state5 = this.state,
          diagram = _state5.diagram,
          rectangularSelection = _state5.rectangularSelection;


      var selected = Object.assign({}, this.state.selected);

      if (rectangularSelection) {
        diagram.steps.forEach(function (_ref3) {
          var id = _ref3.id,
              x = _ref3.x,
              y = _ref3.y,
              width = _ref3.width,
              height = _ref3.height;

          // Consider when rectangular selection is reflected.
          var boundsX = rectangularSelection.width >= 0 ? rectangularSelection.x : rectangularSelection.x + rectangularSelection.width;
          var boundsY = rectangularSelection.height >= 0 ? rectangularSelection.y : rectangularSelection.y + rectangularSelection.height;
          var boundsH = Math.abs(rectangularSelection.height);
          var boundsW = Math.abs(rectangularSelection.width);

          var isInside = x >= boundsX && y >= boundsY && height <= boundsH && width <= boundsW;

          if (isInside) {
            selected[id] = true;
          }
        });
      }

      this.setState({
        dragging: null,
        isMouseDown: false,
        rectangularSelection: null,
        selected: selected
      });
    }
  }, {
    key: 'onWindowResize',
    value: function onWindowResize(container) {
      var _this3 = this;

      return function () {
        var rect = container.getBoundingClientRect();

        var dynamicView = {
          height: rect.height,
          width: rect.width
        };

        _this3.setState({ dynamicView: dynamicView });
      };
    }
  }, {
    key: 'onWindowScroll',
    value: function onWindowScroll() {
      var scroll = {
        x: window.scrollX,
        y: window.scrollY
      };

      this.setState({ scroll: scroll });
    }
  }, {
    key: 'render',
    value: function render() {
      var editable = this.props.editable;
      var _state6 = this.state,
          diagram = _state6.diagram,
          isMouseOver = _state6.isMouseOver,
          rectangularSelection = _state6.rectangularSelection,
          selected = _state6.selected,
          toolbarHeight = _state6.toolbarHeight;
      var height = diagram.height,
          width = diagram.width;


      var containerStyle = {
        boxShadow: isMouseOver ? '3px 4px 16px 0px rgba(0, 0, 0, 0.5)' : null,
        height: toolbarHeight + height,
        width: width
      };

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
          height: toolbarHeight,
          width: width
        }),
        _react2.default.createElement(
          _ErrorBoundary2.default,
          null,
          _react2.default.createElement(_Canvas2.default, {
            diagram: diagram,
            createArrow: this.createArrow,
            rectangularSelection: rectangularSelection,
            selected: selected,
            selectStep: this.selectStep,
            stopDragging: this.stopDragging
          })
        )
      ) : _react2.default.createElement(_Canvas2.default, { diagram: diagram });
    }
  }, {
    key: 'selectStep',
    value: function selectStep(id) {
      var _this4 = this;

      return function (event) {
        event.stopPropagation();

        var _state7 = _this4.state,
            selected = _state7.selected,
            shiftPressed = _state7.shiftPressed;


        var selectedStep = shiftPressed ? Object.assign({}, selected) : {};
        selectedStep[id] = true;

        _this4.setState({
          isMouseDown: true,
          selected: selectedStep
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