'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Terminator = function (_React$Component) {
  _inherits(Terminator, _React$Component);

  function Terminator() {
    _classCallCheck(this, Terminator);

    return _possibleConstructorReturn(this, (Terminator.__proto__ || Object.getPrototypeOf(Terminator)).apply(this, arguments));
  }

  _createClass(Terminator, [{
    key: 'render',
    value: function render() {
      var _Object$assign = Object.assign({}, this.props, {
        style: {
          fill: 'white',
          stroke: 'gray',
          strokeWidth: 2
        }
      }),
          height = _Object$assign.height,
          width = _Object$assign.width,
          x = _Object$assign.x,
          y = _Object$assign.y,
          style = _Object$assign.style;

      var rectStyle = Object.assign({}, style, {
        strokeDasharray: width + ' ' + height + ' ' + width + ' ' + height
      });

      return _react2.default.createElement(
        'g',
        { transform: 'translate(' + x + ',' + y + ')' },
        _react2.default.createElement('rect', {
          height: height,
          style: rectStyle,
          width: width
        }),
        _react2.default.createElement('path', {
          d: 'M0,0 A' + height / 2 + ',' + height / 2 + ' 0 0,0 0,' + height,
          style: style
        }),
        _react2.default.createElement('path', {
          d: 'M' + width + ',0 A' + height / 2 + ',' + height / 2 + ' 0 0,1 ' + width + ',' + height,
          style: style
        })
      );
    }
  }]);

  return Terminator;
}(_react2.default.Component);

exports.default = Terminator;