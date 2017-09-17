'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isMyJsonValid = require('is-my-json-valid');

var _isMyJsonValid2 = _interopRequireDefault(_isMyJsonValid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var schema = {
  $schema: 'http://json-schema.org/schema#',
  id: 'http://g14n.info/flow-chart/schema.json',
  type: 'object',
  properties: {
    steps: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: {
            type: 'string'
          },
          type: {
            type: 'string',
            'enum': ['decision', 'process', 'terminator']
          },
          x: {
            type: 'number'
          },
          y: {
            type: 'number'
          },
          height: {
            type: 'number'
          },
          width: {
            type: 'number'
          }
        },
        required: ['id', 'x', 'y', 'type', 'width', 'height'],
        additionalProperties: false
      }
    },
    height: {
      type: 'number'
    },
    width: {
      type: 'number'
    },
    style: {
      type: 'object',
      properties: {
        backgroundColor: {
          type: 'string'
        }
      }
    }
  },
  required: ['steps'],
  additionalProperties: false
};


var validate = (0, _isMyJsonValid2.default)(schema);

// TODO check ids are unique.
exports.default = validate;