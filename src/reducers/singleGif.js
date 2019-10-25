import { handleActions } from 'redux-actions';

import {
  gifInfoLoaded,
  gifInfoUnloaded,
  editingSubmitted,
  deletingSubmitted,
} from '../actions';

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
    [editingSubmitted]: (state, action) => {
      const request = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(action.payload),
      };
      console.log(request);
      return state;
    },
    [deletingSubmitted]: (state, action) => {
      console.log(action.payload);
      return state;
    },
  },
  singleGif,
);

export default { singleGif, singleGifReducer };
