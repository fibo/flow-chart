'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _types = require('./types');

var _Decision = require('./components/Decision');

var _Decision2 = _interopRequireDefault(_Decision);

var _Process = require('./components/Process');

var _Process2 = _interopRequireDefault(_Process);

var _Terminator = require('./components/Terminator');

var _Terminator2 = _interopRequireDefault(_Terminator);

var _RectangularSelection = require('./components/RectangularSelection');

var _RectangularSelection2 = _interopRequireDefault(_RectangularSelection);

var _Step = require('./components/Step');

var _Step2 = _interopRequireDefault(_Step);

var _Toolbar = require('./components/Toolbar');

var _Toolbar2 = _interopRequireDefault(_Toolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var frame = function frame(_ref) {
  var height = _ref.height,
      width = _ref.width,
      style = _ref.style,
      items = _ref.items;
  return function (_ref2) {
    var rectangularSelection = _ref2.rectangularSelection,
        selected = _ref2.selected,
        selectStep = _ref2.selectStep;
    return _react2.default.createElement(
      'svg',
      {
        height: height,
        width: width,
        style: style
      },
      rectangularSelection ? _react2.default.createElement(_RectangularSelection2.default, rectangularSelection) : null,
      Object.keys(items.decision).map(function (key) {
        return _react2.default.createElement(_Decision2.default, _extends({ key: key,
          selected: selected[key],
          selectStep: selectStep(key)
        }, items.decision[key]));
      }),
      Object.keys(items.process).map(function (key) {
        return _react2.default.createElement(_Process2.default, _extends({ key: key,
          selected: selected[key],
          selectStep: selectStep(key)
        }, items.process[key]));
      }),
      Object.keys(items.terminator).map(function (key) {
        return _react2.default.createElement(_Terminator2.default, _extends({ key: key,
          selected: selected[key],
          selectStep: selectStep(key)
        }, items.terminator[key]));
      })
    );
  };
};

var FlowChart = function (_React$Component) {
  _inherits(FlowChart, _React$Component);

  function FlowChart(props) {
    _classCallCheck(this, FlowChart);

    var _this = _possibleConstructorReturn(this, (FlowChart.__proto__ || Object.getPrototypeOf(FlowChart)).call(this, props));

    _this.state = {
      diagram: props.diagram,
      isMouseMoving: false,
      isMouseOver: false,
      offset: { x: 0, y: 0 },
      rectangularSelection: null,
      scroll: { x: 0, y: 0 },
      selected: {}
    };
    return _this;
  }

  _createClass(FlowChart, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var setState = this.setState.bind(this);

      var container = _reactDom2.default.findDOMNode(this).parentNode;

      var offset = {
        x: container.offsetLeft,
        y: container.offsetTop
      };

      var scroll = {
        x: window.scrollX,
        y: window.scrollY
      };

      setState({
        offset: offset,
        scroll: scroll
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      // State and props.

      var editable = this.props.editable;
      var _state = this.state,
          diagram = _state.diagram,
          isMouseOver = _state.isMouseOver,
          rectangularSelection = _state.rectangularSelection,
          selected = _state.selected;
      var items = diagram.items,
          style = diagram.style,
          height = diagram.height,
          width = diagram.width;


      var setState = this.setState.bind(this);

      // Defaults.

      if (!items.decision) items.decision = {};
      if (!items.process) items.process = {};
      if (!items.terminator) items.terminator = {};

      var toolbarHeight = 2 * _Step2.default.defaultProps.style.fontSize;

      var containerStyle = {
        boxShadow: isMouseOver ? '3px 4px 16px 0px rgba(0, 0, 0, 0.5)' : null,
        height: toolbarHeight + height,
        width: width

        // Utils

      };var randomString = function randomString(length) {
        var result = '';

        while (result.length < length) {
          result += String.fromCharCode(97 + Math.floor(Math.random() * 26));
        }

        return result;
      };

      var generateId = function generateId() {
        var id = randomString(4);

        var items = Object.assign({ decision: {} }, { process: {} }, { terminator: {} }, _this2.state.diagram.items);

        var idExists = items.decision[id] || items.process[id] || items.terminator[id];

        return idExists ? generateId() : id;
      };

      // Events.

      var getCoordinates = function getCoordinates(event) {
        var _state2 = _this2.state,
            offset = _state2.offset,
            scroll = _state2.scroll;


        return {
          x: event.clientX - offset.x + scroll.x,
          y: event.clientY - offset.y + scroll.y
        };
      };

      var isInsideFlowChart = function isInsideFlowChart(coordinates) {
        var _state3 = _this2.state,
            offset = _state3.offset,
            scroll = _state3.scroll;


        return coordinates.x > offset.x + scroll.x && coordinates.x < offset.x + scroll.x + width && coordinates.y > offset.y + scroll.y + toolbarHeight && coordinates.y < offset.y + scroll.y + height;
      };

      var dropToolbarIcon = function dropToolbarIcon(Item) {
        return function (event) {
          var coordinates = getCoordinates(event);

          // Create item if dropped inside flowchart.
          if (isInsideFlowChart(coordinates)) {
            var id = generateId();

            var _diagram = Object.assign({}, _this2.state.diagram);
            var itemType = Item.name.toLowerCase();

            if (!_diagram.items[itemType]) _diagram.items[itemType] = {};

            var x = coordinates.x - _Step2.default.defaultProps.width / 2;
            var y = coordinates.y - toolbarHeight - _Step2.default.defaultProps.height / 2;

            _diagram.items[itemType][id] = { x: x, y: y };

            setState({ diagram: _diagram });
          }
        };
      };

      var onMouseDown = function onMouseDown(event) {
        var coordinates = getCoordinates(event);

        setState({
          rectangularSelection: {
            x: coordinates.x,
            y: coordinates.y - toolbarHeight,
            height: 0,
            width: 0
          },
          selected: {}
        });
      };

      var onMouseEnter = function onMouseEnter() {
        setState({
          isMouseOver: true,
          rectangularSelection: null
        });
      };

      var onMouseLeave = function onMouseLeave() {
        setState({
          isMouseOver: false,
          rectangularSelection: null
        });
      };

      var onMouseMove = function onMouseMove(event) {
        var coordinates = getCoordinates(event);

        if (rectangularSelection) {
          setState({
            rectangularSelection: {
              x: rectangularSelection.x,
              y: rectangularSelection.y,
              height: coordinates.y - toolbarHeight - rectangularSelection.y,
              width: coordinates.x - rectangularSelection.x
            }
          });
        }
      };

      var onMouseUp = function onMouseUp() {
        setState({
          rectangularSelection: null
        });
      };

      var selectStep = function selectStep(key) {
        return function (selected) {
          return function (event) {
            event.stopPropagation();

            var item = {};
            item[key] = selected;

            setState({
              selected: Object.assign({}, _this2.state.selected, item)
            });
          };
        };
      };
      // Create an higher order component to be used as frame,
      // it appears twice in the JSX below depending if the FlowChart
      // is editable or not.

      var Frame = frame({ height: height, width: width, style: style, items: items });

      return editable ? _react2.default.createElement(
        'div',
        {
          onMouseDown: onMouseDown,
          onMouseEnter: onMouseEnter,
          onMouseLeave: onMouseLeave,
          onMouseMove: onMouseMove,
          onMouseUp: onMouseUp,
          style: containerStyle
        },
        _react2.default.createElement(_Toolbar2.default, {
          dropToolbarIcon: dropToolbarIcon,
          fontSize: style.fontSize,
          height: toolbarHeight,
          width: width
        }),
        _react2.default.createElement(Frame, {
          rectangularSelection: rectangularSelection,
          selected: selected,
          selectStep: selectStep
        })
      ) : _react2.default.createElement(Frame, null);
    }
  }]);

  return FlowChart;
}(_react2.default.Component);

exports.default = FlowChart;