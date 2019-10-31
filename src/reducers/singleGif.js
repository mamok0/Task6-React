import { handleActions } from 'redux-actions';

import {
  gifInfoLoaded,
  gifInfoUnloaded,
  switchDeleting,
  switchEditing,
} from '../actions';

export const singleGif = {
  value: {},
  isFetching: true,
  isEditing: false,
  isDeleting: false,
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
    [switchDeleting]: (state) => (
      {
        ...state,
        isDeleting: !state.isDeleting,
      }
    ),
    [switchEditing]: (state) => (
      {
        ...state,
        isEditing: !state.isEditing,
      }
    ),
  },
  singleGif,
);

export default { singleGif, singleGifReducer };
