import { handleActions } from 'redux-actions';

import { gifsLoaded, gifsUnloaded } from '../actions';

export const gifList = {
  values: [],
  offset: 0,
  isFetching: true,
};

export const gifListReducer = handleActions(
  {
    [gifsLoaded]: (state, action) => (
      {
        ...state,
        values: state.values.concat(action.payload.newGifs),
        isFetching: action.payload.isFetching,
        offset: action.payload.offset,
      }
    ),
    [gifsUnloaded]: (state) => (
      {
        ...state,
        values: [],
        isFetching: true,
        offset: 0,
      }
    ),
  },
  gifList,
);

export default { gifList, gifListReducer };
