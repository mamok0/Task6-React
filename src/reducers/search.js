import { handleActions } from 'redux-actions';

import { searchRequest } from '../actions';
import { getSearchQuery } from '../services/api';

export const search = {
  searchValue: getSearchQuery() || '',
};

export const searchReducer = handleActions(
  {
    [searchRequest]: (state, action) => (
      { ...state, searchValue: action.payload.searchValue }
    ),
  },
  search,
);

export default { searchReducer, search };
