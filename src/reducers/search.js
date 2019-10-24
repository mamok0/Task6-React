import { handleAction } from 'redux-actions';

const search = handleAction(
  'SEARCH_REQUEST',
  (state, action) => (
    Object.assign({}, state, { searchValue: action.payload.searchValue })
  ),
  {},
);

export default search;
