import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import mapProps from 'recompose/mapProps';
import getContext from 'recompose/getContext';
import { combineHandlers } from '../utils/compositionUtils';

const EnhancedHeadingCell = OriginalComponent => compose(
  getContext({
    events: PropTypes.object,
  }),
  mapProps(({ events: { onSort }, ...props }) => ({
    ...props,
    onClick: combineHandlers([
      () => onSort && onSort({
        id: props.columnId,
        sortAscending: props.sortProperty ? !props.sortProperty.sortAscending : true
      }),
      props.onClick
    ]),
  }))
)(props => <OriginalComponent {...props} />);

export default EnhancedHeadingCell;
