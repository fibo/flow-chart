'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _bindme = require('bindme');

var _bindme2 = _interopRequireDefault(_bindme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ConnectionPoint = function (_React$Component) {
  _inherits(ConnectionPoint, _React$Component);

  function ConnectionPoint(props) {
    var _this;

    _classCallCheck(this, ConnectionPoint);

    (0, _bindme2.default)((_this = _possibleConstructorReturn(this, (ConnectionPoint.__proto__ || Object.getPrototypeOf(ConnectionPoint)).call(this, props)), _this), 'onMouseLeave', 'onMouseOver');

    _this.state = {
      focused: false
    };
    return _this;
  }

  _createClass(ConnectionPoint, [{
    key: 'onMouseLeave',
    value: function onMouseLeave() {
      this.setState({ focused: false });
    }
  }, {
    key: 'onMouseOver',
    value: function onMouseOver() {
      this.setState({ focused: true });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          createArrow = _props.createArrow,
          cx = _props.cx,
          cy = _props.cy,
          r = _props.r;
      var focused = this.state.focused;


      return _react2.default.createElement('circle', {
        onMouseDown: createArrow,
        onMouseLeave: this.onMouseLeave,
        onMouseOver: this.onMouseOver,
        fill: focused ? 'tomato' : 'white',
        stroke: 'tomato',
        strokeWidth: 1,
        cx: cx,
        cy: cy,
        r: r
      });
    }
  }]);

  return ConnectionPoint;
}(_react2.default.Component);

exports.default = ConnectionPoint;


ConnectionPoint.defaultProps = {
  r: 5
};