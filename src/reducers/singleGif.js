import { handleActions } from 'redux-actions';

import { gifInfoLoaded, gifInfoUnloaded } from '../actions';

export const singleGif = {
  value: {},
  isFetching: true,
};

export const singleGifReducer = handleActions(
  {
    [gifInfoLoaded]: (state, action) => (
      {
        ...state,
        value: action.payload.gif,
        isFetching: action.payload.isFetching,
      }
    ),
    [gifInfoUnloaded]: (state) => (
      {
        ...state,
        value: {},
        isFetching: true,
      }
    ),
  },
  singleGif,
);

export default { singleGif, singleGifReducer };
