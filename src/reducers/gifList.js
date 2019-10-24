import { handleActions } from 'redux-actions';

import { gifsLoaded, gifsUnloaded } from '../actions';

export const gifList = {
  values: [],
  gifListOffset: 0,
  isGifListFetching: true,
};

export const gifListReducer = handleActions(
  {
    [gifsLoaded]: (state, action) => (
      {
        ...state,
        values: state.values.concat(action.payload.newGifs),
        isGifListFetching: action.payload.isGifListFetching,
        gifListOffset: action.payload.gifListOffset,
      }
    ),
    [gifsUnloaded]: (state) => (
      {
        ...state,
        values: [],
        isGifListFetching: true,
        gifListOffset: 0,
      }
    ),
  },
  gifList,
);

export default { gifList, gifListReducer };
