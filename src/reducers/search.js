import { handleActions, createAction } from 'redux-actions';

import { getSearchQuery } from '../services/api';

const searchRequest = createAction('SEARCH_REQUEST');

const search = handleActions(
  {
    [searchRequest]: (state, action) => (
      { ...state, searchValue: action.payload.searchValue }
    ),
  },
  {
    searchValue: getSearchQuery() || '',
  },
);

export default search;
