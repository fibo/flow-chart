'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Decision = require('./Decision');

var _Decision2 = _interopRequireDefault(_Decision);

var _Process = require('./Process');

var _Process2 = _interopRequireDefault(_Process);

var _Terminator = require('./Terminator');

var _Terminator2 = _interopRequireDefault(_Terminator);

var _RectangularSelection = require('./RectangularSelection');

var _RectangularSelection2 = _interopRequireDefault(_RectangularSelection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Canvas = function (_React$Component) {
  _inherits(Canvas, _React$Component);

  function Canvas() {
    _classCallCheck(this, Canvas);

    return _possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).apply(this, arguments));
  }

  _createClass(Canvas, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          height = _props.height,
          items = _props.items,
          rectangularSelection = _props.rectangularSelection,
          selected = _props.selected,
          selectStep = _props.selectStep,
          stopDragging = _props.stopDragging,
          style = _props.style,
          width = _props.width;


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
            selectStep: selectStep(key),
            stopDragging: stopDragging
          }, items.decision[key]));
        }),
        Object.keys(items.process).map(function (key) {
          return _react2.default.createElement(_Process2.default, _extends({ key: key,
            selected: selected[key],
            selectStep: selectStep(key),
            stopDragging: stopDragging
          }, items.process[key]));
        }),
        Object.keys(items.terminator).map(function (key) {
          return _react2.default.createElement(_Terminator2.default, _extends({ key: key,
            selected: selected[key],
            selectStep: selectStep(key),
            stopDragging: stopDragging
          }, items.terminator[key]));
        })
      );
    }
  }]);

  return Canvas;
}(_react2.default.Component);

exports.default = Canvas;