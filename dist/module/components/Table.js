'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Table = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table = exports.Table = function Table(_ref) {
  var TableHeading = _ref.TableHeading,
      TableBody = _ref.TableBody,
      NoResults = _ref.NoResults,
      style = _ref.style,
      className = _ref.className,
      visibleRows = _ref.visibleRows;
  return visibleRows > 0 ? _react2.default.createElement(
    'table',
    { style: style, className: className },
    TableHeading && _react2.default.createElement(TableHeading, null),
    TableBody && _react2.default.createElement(TableBody, null)
  ) : NoResults && _react2.default.createElement(NoResults, null);
};

exports.default = Table;