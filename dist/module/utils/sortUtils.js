"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.defaultSort = defaultSort;
exports.setSortProperties = setSortProperties;
/* Sorts the given data by the specified column
 * @parameter {array<object>} data - The data to sort
 * @parameter {string} column - the name of the column to sort
 * @parameter {boolean optional} sortAscending - whether or not to sort this column in ascending order
 *
 * TODO: Needs tests!
 */
function defaultSort(data, column) {
  var sortAscending = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

  return data.sort(function (original, newRecord) {
    original = !!original.get(column) && original.get(column) || "";
    newRecord = !!newRecord.get(column) && newRecord.get(column) || "";

    //TODO: This is about the most cheezy sorting check ever.
    //Make it better
    if (original === newRecord) {
      return 0;
    } else if (original > newRecord) {
      return sortAscending ? 1 : -1;
    } else {
      return sortAscending ? -1 : 1;
    }
  });
}

function setSortProperties(_ref) {
  var setSortColumn = _ref.setSortColumn,
      sortProperty = _ref.sortProperty,
      columnId = _ref.columnId;

  return function () {
    if (sortProperty === null) {
      setSortColumn({ id: columnId, sortAscending: true });
      return;
    }

    var newSortProperty = _extends({}, sortProperty, {
      sortAscending: !sortProperty.sortAscending
    });

    setSortColumn(newSortProperty);
  };
}