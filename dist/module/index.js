'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge2 = require('lodash/merge');

var _merge3 = _interopRequireDefault(_merge2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _redux = require('redux');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reactRedux = require('react-redux');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _dataReducer = require('./reducers/dataReducer');

var dataReducers = _interopRequireWildcard(_dataReducer);

var _components = require('./components');

var _components2 = _interopRequireDefault(_components);

var _settingsComponentObjects = require('./settingsComponentObjects');

var _settingsComponentObjects2 = _interopRequireDefault(_settingsComponentObjects);

var _dataSelectors = require('./selectors/dataSelectors');

var selectors = _interopRequireWildcard(_dataSelectors);

var _compositionUtils = require('./utils/compositionUtils');

var _columnUtils = require('./utils/columnUtils');

var _rowUtils = require('./utils/rowUtils');

var _sortUtils = require('./utils/sortUtils');

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var defaultEvents = _extends({}, actions, {
  onFilter: actions.setFilter,
  setSortProperties: _sortUtils.setSortProperties
});

var defaultStyleConfig = {
  icons: {
    TableHeadingCell: {
      sortDescendingIcon: '▼',
      sortAscendingIcon: '▲'
    }
  },
  classNames: {
    Cell: 'griddle-cell',
    Filter: 'griddle-filter',
    Loading: 'griddle-loadingResults',
    NextButton: 'griddle-next-button',
    NoResults: 'griddle-noResults',
    PageDropdown: 'griddle-page-select',
    Pagination: 'griddle-pagination',
    PreviousButton: 'griddle-previous-button',
    Row: 'griddle-row',
    RowDefinition: 'griddle-row-definition',
    Settings: 'griddle-settings',
    SettingsToggle: 'griddle-settings-toggle',
    Table: 'griddle-table',
    TableBody: 'griddle-table-body',
    TableHeading: 'griddle-table-heading',
    TableHeadingCell: 'griddle-table-heading-cell',
    TableHeadingCellAscending: 'griddle-heading-ascending',
    TableHeadingCellDescending: 'griddle-heading-descending'
  },
  styles: {}
};

var Griddle = function (_Component) {
  _inherits(Griddle, _Component);

  function Griddle(props) {
    _classCallCheck(this, Griddle);

    var _this = _possibleConstructorReturn(this, (Griddle.__proto__ || Object.getPrototypeOf(Griddle)).call(this, props));

    var _props$plugins = props.plugins,
        plugins = _props$plugins === undefined ? [] : _props$plugins,
        data = props.data,
        rowPropertiesComponent = props.children,
        _props$events = props.events,
        events = _props$events === undefined ? {} : _props$events,
        _props$sortProperties = props.sortProperties,
        sortProperties = _props$sortProperties === undefined ? {} : _props$sortProperties,
        _props$styleConfig = props.styleConfig,
        styleConfig = _props$styleConfig === undefined ? {} : _props$styleConfig,
        importedPageProperties = props.pageProperties,
        userComponents = props.components,
        _props$renderProperti = props.renderProperties,
        userRenderProperties = _props$renderProperti === undefined ? {} : _props$renderProperti,
        userSettingsComponentObjects = props.settingsComponentObjects;


    var rowProperties = (0, _rowUtils.getRowProperties)(rowPropertiesComponent);
    var columnProperties = (0, _columnUtils.getColumnProperties)(rowPropertiesComponent);

    //Combine / compose the reducers to make a single, unified reducer
    var reducers = (0, _compositionUtils.buildGriddleReducer)([dataReducers].concat(_toConsumableArray(plugins.map(function (p) {
      return p.reducer;
    }))));

    //Combine / Compose the components to make a single component for each component type
    _this.components = (0, _compositionUtils.buildGriddleComponents)([_components2.default].concat(_toConsumableArray(plugins.map(function (p) {
      return p.components;
    })), [userComponents]));

    _this.settingsComponentObjects = Object.assign.apply(Object, [{}, _settingsComponentObjects2.default].concat(_toConsumableArray(plugins.map(function (p) {
      return p.settingsComponentObjects;
    })), [userSettingsComponentObjects]));

    _this.events = Object.assign.apply(Object, [{}, events].concat(_toConsumableArray(plugins.map(function (p) {
      return p.events;
    }))));

    _this.selectors = plugins.reduce(function (combined, plugin) {
      return _extends({}, combined, plugin.selectors);
    }, _extends({}, selectors));

    var mergedStyleConfig = _merge3.default.apply(undefined, [{}, defaultStyleConfig].concat(_toConsumableArray(plugins.map(function (p) {
      return p.styleConfig;
    })), [styleConfig]));

    var pageProperties = Object.assign({}, {
      currentPage: 1,
      pageSize: 10
    }, importedPageProperties);

    //TODO: This should also look at the default and plugin initial state objects
    var renderProperties = Object.assign.apply(Object, [{
      rowProperties: rowProperties,
      columnProperties: columnProperties
    }].concat(_toConsumableArray(plugins.map(function (p) {
      return p.renderProperties;
    })), [userRenderProperties]));

    // TODO: Make this its own method
    var initialState = plugins.reduce(function (combined, plugin) {
      return !!plugin.initialState ? _extends({}, combined, plugin.initialState) : combined;
    }, {
      renderProperties: renderProperties,
      data: data,
      enableSettings: true,
      pageProperties: pageProperties,
      sortProperties: sortProperties,
      textProperties: {
        settingsToggle: 'Settings'
      },
      styleConfig: mergedStyleConfig
    });

    _this.store = (0, _redux.createStore)(reducers, initialState);
    return _this;
  }

  _createClass(Griddle, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var data = nextProps.data,
          pageProperties = nextProps.pageProperties,
          sortProperties = nextProps.sortProperties;


      this.store.dispatch(actions.updateState({ data: data, pageProperties: pageProperties, sortProperties: sortProperties }));
    }
  }, {
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        components: this.components,
        settingsComponentObjects: this.settingsComponentObjects,
        events: this.events,
        selectors: this.selectors
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        _reactRedux.Provider,
        { store: this.store },
        _react2.default.createElement(this.components.Layout, null)
      );
    }
  }]);

  return Griddle;
}(_react.Component);

Griddle.childContextTypes = {
  components: _propTypes2.default.object.isRequired,
  settingsComponentObjects: _propTypes2.default.object,
  events: _propTypes2.default.object,
  selectors: _propTypes2.default.object
};
exports.default = Griddle;