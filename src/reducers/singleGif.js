import { handleActions } from 'redux-actions';

import { gifInfoLoaded } from '../actions';

export const singleGif = {
  value: {},
  isGifFetching: true,
};

export const singleGifReducer = handleActions(
  {
    [gifInfoLoaded]: (state, action) => (
      {
        ...state,
        value: action.payload.gif,
        isGifFetching: action.payload.isGifFetching,
      }
    ),
  },
  singleGif,
);

export default { singleGif, singleGifReducer };
