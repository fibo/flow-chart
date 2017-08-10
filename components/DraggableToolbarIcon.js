'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _types = require('../types');

var _Step = require('./Step');

var _Step2 = _interopRequireDefault(_Step);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DraggableToolbarIcon = function (_React$Component) {
  _inherits(DraggableToolbarIcon, _React$Component);

  function DraggableToolbarIcon() {
    _classCallCheck(this, DraggableToolbarIcon);

    return _possibleConstructorReturn(this, (DraggableToolbarIcon.__proto__ || Object.getPrototypeOf(DraggableToolbarIcon)).apply(this, arguments));
  }

  _createClass(DraggableToolbarIcon, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          dropToolbarIcon = _props.dropToolbarIcon,
          height = _props.height,
          Item = _props.Item,
          width = _props.width;


      var margin = Item.defaultProps.style.strokeWidth;

      return _react2.default.createElement(
        'div',
        {
          draggable: true,
          onDragEnd: dropToolbarIcon(Item),
          style: { height: height, width: width }
        },
        _react2.default.createElement(
          'svg',
          {
            height: height,
            width: width
          },
          _react2.default.createElement(Item, {
            x: margin,
            y: margin,
            height: height - 2 * margin,
            width: width - 2 * margin
          })
        )
      );
    }
  }]);

  return DraggableToolbarIcon;
}(_react2.default.Component);

exports.default = DraggableToolbarIcon;