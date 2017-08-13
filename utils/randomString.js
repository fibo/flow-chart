'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var randomString = function randomString(length) {
  var result = '';

  while (result.length < length) {
    result += String.fromCharCode(97 + Math.floor(Math.random() * 26));
  }

  return result;
};

exports.default = randomString;