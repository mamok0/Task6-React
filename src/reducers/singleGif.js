import { handleActions } from 'redux-actions';

import { gifInfoLoaded } from '../actions';

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
  },
  singleGif,
);

export default { singleGif, singleGifReducer };
