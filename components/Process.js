'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _defaultStyle = require('./defaultStyle');

var _defaultStyle2 = _interopRequireDefault(_defaultStyle);

var _css = require('../utils/css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Process = function (_React$Component) {
  _inherits(Process, _React$Component);

  function Process() {
    _classCallCheck(this, Process);

    return _possibleConstructorReturn(this, (Process.__proto__ || Object.getPrototypeOf(Process)).apply(this, arguments));
  }

  _createClass(Process, [{
    key: 'render',
    value: function render() {
      var _Object$assign = Object.assign({}, {
        selected: false,
        selectItem: Function.prototype
      }, this.props, {
        style: _defaultStyle2.default
      }),
          height = _Object$assign.height,
          width = _Object$assign.width,
          x = _Object$assign.x,
          y = _Object$assign.y,
          selected = _Object$assign.selected,
          selectItem = _Object$assign.selectItem,
          style = _Object$assign.style;

      var onMouseDown = function onMouseDown(event) {
        event.stopPropagation();
        selectItem(!selected);
      };

      return _react2.default.createElement(
        'g',
        {
          onMouseDown: onMouseDown,
          transform: 'translate(' + x + ',' + y + ')'
        },
        _react2.default.createElement('rect', {
          height: height,
          style: Object.assign({}, selected ? _css.strokeDasharraySelected : {}, style),
          width: width
        })
      );
    }
  }]);

  return Process;
}(_react2.default.Component);

exports.default = Process;