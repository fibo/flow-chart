'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _notDefined = require('not-defined');

var _notDefined2 = _interopRequireDefault(_notDefined);

var _defaultStyle = require('./components/defaultStyle');

var _defaultStyle2 = _interopRequireDefault(_defaultStyle);

var _Decision = require('./components/Decision');

var _Decision2 = _interopRequireDefault(_Decision);

var _Process = require('./components/Process');

var _Process2 = _interopRequireDefault(_Process);

var _Terminator = require('./components/Terminator');

var _Terminator2 = _interopRequireDefault(_Terminator);

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
    var editable = _ref2.editable;
    return _react2.default.createElement(
      'svg',
      {
        height: height,
        width: width,
        style: style
      },
      Object.keys(items.decision).map(function (key) {
        return _react2.default.createElement(_Decision2.default, _extends({ key: key }, items.decision[key], { editable: true }));
      }),
      Object.keys(items.process).map(function (key) {
        return _react2.default.createElement(_Process2.default, _extends({ key: key }, items.process[key], { editable: true }));
      }),
      Object.keys(items.terminator).map(function (key) {
        return _react2.default.createElement(_Terminator2.default, _extends({ key: key }, items.terminator[key], { editable: true }));
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
      isMouseOver: false
    };
    return _this;
  }

  _createClass(FlowChart, [{
    key: 'render',
    value: function render() {
      // State and props.

      var _props = this.props,
          diagram = _props.diagram,
          editable = _props.editable;
      var items = diagram.items,
          style = diagram.style,
          height = diagram.height,
          width = diagram.width;
      var isMouseOver = this.state.isMouseOver;


      var setState = this.setState.bind(this);

      // Defaults.

      if ((0, _notDefined2.default)(items.decision)) items.decision = {};
      if ((0, _notDefined2.default)(items.process)) items.process = {};
      if ((0, _notDefined2.default)(items.terminator)) items.terminator = {};

      if ((0, _notDefined2.default)(style.fontSize)) style.fontSize = _defaultStyle2.default.fontSize;

      var toolbarHeight = 2 * style.fontSize;

      var containerStyle = {
        boxShadow: isMouseOver ? '3px 4px 16px 0px rgba(0, 0, 0, 0.5)' : null,
        height: toolbarHeight + height,
        width: width

        // Events.

      };var onMouseEnter = editable ? function () {
        setState({ isMouseOver: true });
      } : Function.prototype;

      var onMouseLeave = editable ? function () {
        setState({ isMouseOver: false });
      } : Function.prototype;

      // Create an higher order component to be used as frame,
      // it appears twice in the JSX below depending if the FlowChart
      // is editable or not.
      var Frame = frame({ height: height, width: width, style: style, items: items });

      return editable ? _react2.default.createElement(
        'div',
        {
          onMouseEnter: onMouseEnter,
          onMouseLeave: onMouseLeave,
          style: containerStyle
        },
        _react2.default.createElement(_Toolbar2.default, {
          width: width,
          height: toolbarHeight,
          fontSize: style.fontSize
        }),
        _react2.default.createElement(Frame, { editable: true })
      ) : _react2.default.createElement(Frame, null);
    }
  }]);

  return FlowChart;
}(_react2.default.Component);

exports.default = FlowChart;