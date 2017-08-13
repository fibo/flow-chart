'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Step2 = require('./Step');

var _Step3 = _interopRequireDefault(_Step2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Terminator = function (_Step) {
  _inherits(Terminator, _Step);

  function Terminator() {
    _classCallCheck(this, Terminator);

    return _possibleConstructorReturn(this, (Terminator.__proto__ || Object.getPrototypeOf(Terminator)).apply(this, arguments));
  }

  _createClass(Terminator, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          height = _props.height,
          width = _props.width,
          x = _props.x,
          y = _props.y,
          selected = _props.selected,
          selectedColor = _props.selectedColor,
          selectStep = _props.selectStep,
          stopDragging = _props.stopDragging,
          style = _props.style;


      var rectStyle = Object.assign({}, style, { strokeDasharray: width - height + ' ' + height }, selected ? { stroke: selectedColor } : {});

      var halfH = height / 2;

      return _react2.default.createElement(
        'g',
        {
          onMouseDown: selectStep,
          onMouseUp: stopDragging,
          transform: 'translate(' + x + ',' + y + ')'
        },
        _react2.default.createElement('rect', {
          x: halfH,
          height: height,
          style: rectStyle,
          width: width - height
        }),
        _react2.default.createElement('path', {
          d: 'M' + halfH + ',0 A' + halfH + ',' + halfH + ' 0 0,0 ' + halfH + ',' + height,
          style: Object.assign({}, style, selected ? { stroke: selectedColor } : {})
        }),
        _react2.default.createElement('path', {
          d: 'M' + (width - halfH) + ',0 A' + halfH + ',' + halfH + ' 0 0,1 ' + (width - halfH) + ',' + height,
          style: Object.assign({}, style, selected ? { stroke: selectedColor } : {})
        })
      );
    }
  }]);

  return Terminator;
}(_Step3.default);

exports.default = Terminator;