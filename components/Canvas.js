'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _validate = require('../validate');

var _validate2 = _interopRequireDefault(_validate);

var _Arrow = require('./Arrow');

var _Arrow2 = _interopRequireDefault(_Arrow);

var _RectangularSelection = require('./RectangularSelection');

var _RectangularSelection2 = _interopRequireDefault(_RectangularSelection);

var _Step = require('./Step');

var _Step2 = _interopRequireDefault(_Step);

var _Decision = require('./Decision');

var _Decision2 = _interopRequireDefault(_Decision);

var _Process = require('./Process');

var _Process2 = _interopRequireDefault(_Process);

var _Terminator = require('./Terminator');

var _Terminator2 = _interopRequireDefault(_Terminator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var component = {
  decision: _Decision2.default,
  process: _Process2.default,
  terminator: _Terminator2.default
};

var Canvas = function (_React$Component) {
  _inherits(Canvas, _React$Component);

  function Canvas(props) {
    _classCallCheck(this, Canvas);

    var _this = _possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).call(this, props));

    if (!(0, _validate2.default)(props.diagram)) {
      var error = new Error('Invalid flow-chart diagram');
      error.diagram = props.diagram;
      throw error;
    }
    return _this;
  }

  _createClass(Canvas, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          createArrow = _props.createArrow,
          diagram = _props.diagram,
          rectangularSelection = _props.rectangularSelection,
          selected = _props.selected,
          selectStep = _props.selectStep,
          stopDragging = _props.stopDragging;
      var height = diagram.height,
          steps = diagram.steps,
          style = diagram.style,
          width = diagram.width;


      var multipleSelection = Object.keys(selected).length > 1;

      return _react2.default.createElement(
        'svg',
        {
          height: height,
          width: width,
          style: style
        },
        _react2.default.createElement(
          'defs',
          null,
          _react2.default.createElement(
            'marker',
            {
              id: 'arrow',
              markerWidth: '10',
              markerHeight: '10',
              refX: '0',
              refY: '3',
              orient: 'auto',
              markerUnits: 'strokeWidth'
            },
            _react2.default.createElement('path', {
              d: 'M0,0 L0,6 L9,3 z',
              fill: _Step2.default.defaultProps.style.stroke
            })
          )
        ),
        _react2.default.createElement(_Arrow2.default, null),
        steps.map(function (step, i) {
          var id = step.id,
              type = step.type;

          var Step = component[type];

          return _react2.default.createElement(Step, _extends({ key: i,
            createArrow: createArrow,
            multipleSelection: multipleSelection,
            selected: selected[id],
            selectStep: selectStep(id),
            stopDragging: stopDragging
          }, step));
        }),
        rectangularSelection ? _react2.default.createElement(_RectangularSelection2.default, rectangularSelection) : null
      );
    }
  }]);

  return Canvas;
}(_react2.default.Component);

exports.default = Canvas;