'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Decision = require('./Decision');

var _Decision2 = _interopRequireDefault(_Decision);

var _Process = require('./Process');

var _Process2 = _interopRequireDefault(_Process);

var _Terminator = require('./Terminator');

var _Terminator2 = _interopRequireDefault(_Terminator);

var _DraggableToolbarIcon = require('./DraggableToolbarIcon');

var _DraggableToolbarIcon2 = _interopRequireDefault(_DraggableToolbarIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var componets = { Terminator: _Terminator2.default, Decision: _Decision2.default, Process: _Process2.default };

var Toolbar = function (_React$Component) {
  _inherits(Toolbar, _React$Component);

  function Toolbar() {
    _classCallCheck(this, Toolbar);

    return _possibleConstructorReturn(this, (Toolbar.__proto__ || Object.getPrototypeOf(Toolbar)).apply(this, arguments));
  }

  _createClass(Toolbar, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          dropToolbarIcon = _props.dropToolbarIcon,
          fontSize = _props.fontSize,
          height = _props.height,
          width = _props.width;


      return _react2.default.createElement(
        'div',
        {
          style: {
            display: 'flex',
            fontSize: fontSize,
            height: height,
            width: width
          }
        },
        Object.keys(componets).map(function (itemType) {
          return _react2.default.createElement(_DraggableToolbarIcon2.default, {
            key: itemType,
            dropToolbarIcon: dropToolbarIcon,
            height: height,
            Item: componets[itemType],
            width: 1.618 * height
          });
        })
      );
    }
  }]);

  return Toolbar;
}(_react2.default.Component);

exports.default = Toolbar;