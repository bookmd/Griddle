'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cellPropertiesSelector = exports.rowPropertiesSelector = exports.classNamesForComponentSelector = exports.stylesForComponentSelector = exports.iconsByNameSelector = exports.iconsForComponentSelector = exports.rowDataSelector = exports.cellValueSelector = exports.columnTitlesSelector = exports.columnIdsSelector = exports.hiddenColumnsSelector = exports.visibleRowCountSelector = exports.visibleRowIdsSelector = exports.visibleDataSelector = exports.currentPageDataSelector = exports.sortedDataSelector = exports.hasPreviousSelector = exports.hasNextSelector = exports.visibleColumnsSelector = exports.sortedColumnPropertiesSelector = exports.allColumnsSelector = exports.maxPageSelector = exports.filteredDataSelector = exports.metaDataColumnsSelector = exports.renderPropertiesSelector = exports.sortPropertiesSelector = exports.filterSelector = exports.pageSizeSelector = exports.currentPageSelector = exports.dataSelector = undefined;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reselect = require('reselect');

var _maxSafeInteger = require('max-safe-integer');

var _maxSafeInteger2 = _interopRequireDefault(_maxSafeInteger);

var _sortUtils = require('../../../utils/sortUtils');

var _dataUtils = require('../../../utils/dataUtils');

var _dataSelectors = require('../../../selectors/dataSelectors');

var dataSelectors = _interopRequireWildcard(_dataSelectors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/** Gets the entire data set
 * @param {Immutable} state - state object
 */
var dataSelector = exports.dataSelector = function dataSelector(state) {
  return state.get('data');
};

/** Gets the current page from pageProperties
 * @param {Immutable} state - state object
 */
var currentPageSelector = exports.currentPageSelector = function currentPageSelector(state) {
  return state.getIn(['pageProperties', 'currentPage']);
};

/** Gets the currently set page size
 * @param {Immutable} state - state object
 */
var pageSizeSelector = exports.pageSizeSelector = function pageSizeSelector(state) {
  return state.getIn(['pageProperties', 'pageSize']);
};

/** Gets the currently set filter
 */
var filterSelector = exports.filterSelector = function filterSelector(state) {
  return state.get('filter') || '';
};

var sortPropertiesSelector = exports.sortPropertiesSelector = function sortPropertiesSelector(state) {
  return state.get('sortProperties');
};

var renderPropertiesSelector = exports.renderPropertiesSelector = function renderPropertiesSelector(state) {
  return state.get('renderProperties');
};

var metaDataColumnsSelector = exports.metaDataColumnsSelector = dataSelectors.metaDataColumnsSelector;

/** Gets the data filtered by the current filter
 */
var filteredDataSelector = exports.filteredDataSelector = (0, _reselect.createSelector)(dataSelector, filterSelector, function (data, filter) {
  return data.filter(function (row) {
    return Object.keys(row.toJSON()).some(function (key) {
      return row.get(key) && row.get(key).toString().toLowerCase().indexOf(filter.toLowerCase()) > -1;
    });
  });
});

/** Gets the max page size
 */
var maxPageSelector = exports.maxPageSelector = (0, _reselect.createSelector)(pageSizeSelector, filteredDataSelector, function (pageSize, data) {
  var total = data.size;
  var calc = total / pageSize;

  return calc > Math.floor(calc) ? Math.floor(calc) + 1 : Math.floor(calc);
});

var allColumnsSelector = exports.allColumnsSelector = (0, _reselect.createSelector)(dataSelector, function (data) {
  return data.size === 0 ? [] : data.get(0).keySeq().toJSON();
});

/** Gets the column properties objects sorted by order
 */
var sortedColumnPropertiesSelector = exports.sortedColumnPropertiesSelector = dataSelectors.sortedColumnPropertiesSelector;

/** Gets the visible columns either obtaining the sorted column properties or all columns
 */
var visibleColumnsSelector = exports.visibleColumnsSelector = dataSelectors.visibleColumnsSelector;

/** Returns whether or not this result set has more pages
 */
var hasNextSelector = exports.hasNextSelector = (0, _reselect.createSelector)(currentPageSelector, maxPageSelector, function (currentPage, maxPage) {
  return currentPage < maxPage;
});

/** Returns whether or not there is a previous page to the current data
 */
var hasPreviousSelector = exports.hasPreviousSelector = function hasPreviousSelector(state) {
  return state.getIn(['pageProperties', 'currentPage']) > 1;
};

/** Gets the data sorted by the sort function specified in render properties
 *  if no sort method is supplied, it will use the default sort defined in griddle
 */
var sortedDataSelector = exports.sortedDataSelector = (0, _reselect.createSelector)(filteredDataSelector, sortPropertiesSelector, renderPropertiesSelector, function (filteredData, sortProperties, renderProperties) {
  if (!sortProperties) {
    return filteredData;
  }

  return sortProperties.reverse().reduce(function (data, sortColumnOptions) {
    var columnProperties = renderProperties && renderProperties.get('columnProperties').get(sortColumnOptions.get('id'));

    var sortFunction = columnProperties && columnProperties.get('sortMethod') || _sortUtils.defaultSort;

    return sortFunction(data, sortColumnOptions.get('id'), sortColumnOptions.get('sortAscending'));
  }, filteredData);
});

/** Gets the current page of data
 */
var currentPageDataSelector = exports.currentPageDataSelector = (0, _reselect.createSelector)(sortedDataSelector, pageSizeSelector, currentPageSelector, function (sortedData, pageSize, currentPage) {
  return sortedData.skip(pageSize * (currentPage - 1)).take(pageSize);
});

/** Get the visible data (and only the columns that are visible)
 */
var visibleDataSelector = exports.visibleDataSelector = (0, _reselect.createSelector)(currentPageDataSelector, visibleColumnsSelector, function (currentPageData, visibleColumns) {
  return (0, _dataUtils.getVisibleDataForColumns)(currentPageData, visibleColumns);
});

/** Gets the griddleIds for the visible rows */
var visibleRowIdsSelector = exports.visibleRowIdsSelector = (0, _reselect.createSelector)(currentPageDataSelector, function (currentPageData) {
  return currentPageData.map(function (c) {
    return c.get('griddleKey');
  });
});

/** Gets the count of visible rows */
var visibleRowCountSelector = exports.visibleRowCountSelector = (0, _reselect.createSelector)(visibleRowIdsSelector, function (visibleRowIds) {
  return visibleRowIds.size;
});

/** Gets the columns that are not currently visible
 */
var hiddenColumnsSelector = exports.hiddenColumnsSelector = (0, _reselect.createSelector)(visibleColumnsSelector, allColumnsSelector, metaDataColumnsSelector, function (visibleColumns, allColumns, metaDataColumns) {
  var removeColumns = [].concat(_toConsumableArray(visibleColumns), _toConsumableArray(metaDataColumns));

  return allColumns.filter(function (c) {
    return removeColumns.indexOf(c) === -1;
  });
});

/** Gets the column ids for the visible columns
*/
var columnIdsSelector = exports.columnIdsSelector = (0, _reselect.createSelector)(visibleDataSelector, renderPropertiesSelector, function (visibleData, renderProperties) {
  if (visibleData.size > 0) {
    return Object.keys(visibleData.get(0).toJSON()).map(function (k) {
      return renderProperties.getIn(['columnProperties', k, 'id']) || k;
    });
  }
});

/** Gets the column titles for the visible columns
 */
var columnTitlesSelector = exports.columnTitlesSelector = dataSelectors.columnTitlesSelector;
var cellValueSelector = exports.cellValueSelector = dataSelectors.cellValueSelector;
var rowDataSelector = exports.rowDataSelector = dataSelectors.rowDataSelector;
var iconsForComponentSelector = exports.iconsForComponentSelector = dataSelectors.iconsForComponentSelector;
var iconsByNameSelector = exports.iconsByNameSelector = dataSelectors.iconsForComponentSelector;
var stylesForComponentSelector = exports.stylesForComponentSelector = dataSelectors.stylesForComponentSelector;
var classNamesForComponentSelector = exports.classNamesForComponentSelector = dataSelectors.classNamesForComponentSelector;

var rowPropertiesSelector = exports.rowPropertiesSelector = dataSelectors.rowPropertiesSelector;
var cellPropertiesSelector = exports.cellPropertiesSelector = dataSelectors.cellPropertiesSelector;