'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _compose = require('recompose/compose');

var _compose2 = _interopRequireDefault(_compose);

var _mapProps = require('recompose/mapProps');

var _mapProps2 = _interopRequireDefault(_mapProps);

var _getContext = require('recompose/getContext');

var _getContext2 = _interopRequireDefault(_getContext);

var _dataSelectors = require('../selectors/dataSelectors');

var _valueUtils = require('../utils/valueUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DefaultTableHeadingCellContent = function DefaultTableHeadingCellContent(_ref) {
  var title = _ref.title,
      icon = _ref.icon;
  return _react2.default.createElement(
    'span',
    null,
    title,
    icon && _react2.default.createElement(
      'span',
      null,
      icon
    )
  );
};

function getIcon(_ref2) {
  var sortProperty = _ref2.sortProperty,
      sortAscendingIcon = _ref2.sortAscendingIcon,
      sortDescendingIcon = _ref2.sortDescendingIcon;

  if (sortProperty) {
    return sortProperty.sortAscending ? sortAscendingIcon : sortDescendingIcon;
  }

  // return null so we don't render anything if no sortProperty
  return null;
}

var EnhancedHeadingCell = function EnhancedHeadingCell(OriginalComponent) {
  return (0, _compose2.default)((0, _getContext2.default)({
    selectors: _propTypes2.default.object
  }), (0, _reactRedux.connect)(function (state, props) {
    return _extends({
      sortProperty: (0, _dataSelectors.sortPropertyByIdSelector)(state, props),
      customHeadingComponent: (0, _dataSelectors.customHeadingComponentSelector)(state, props),
      cellProperties: (0, _dataSelectors.cellPropertiesSelector)(state, props),
      className: (0, _dataSelectors.classNamesForComponentSelector)(state, 'TableHeadingCell'),
      style: (0, _dataSelectors.stylesForComponentSelector)(state, 'TableHeadingCell')
    }, (0, _dataSelectors.iconsForComponentSelector)(state, 'TableHeadingCell'));
  }), (0, _mapProps2.default)(function (props) {
    var icon = getIcon(props);
    var title = props.customHeadingComponent ? _react2.default.createElement(props.customHeadingComponent, _extends({}, props.cellProperties.extraData, props, { icon: icon })) : _react2.default.createElement(DefaultTableHeadingCellContent, { title: props.title, icon: icon });
    var className = (0, _valueUtils.valueOrResult)(props.cellProperties.headerCssClassName, props) || props.className;
    var style = _extends({}, props.cellProperties.sortable === false || { cursor: 'pointer' }, props.style);

    return _extends({}, props.cellProperties.extraData, props, {
      icon: icon,
      title: title,
      style: style,
      className: className
    });
  }))(function (props) {
    return _react2.default.createElement(OriginalComponent, props);
  });
};

exports.default = EnhancedHeadingCell;