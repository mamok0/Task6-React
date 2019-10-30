import { handleActions } from 'redux-actions';

import {
  gifInfoLoaded,
  gifInfoUnloaded,
  editingSubmitted,
  deletingSubmitted,
  addingSubmitted,
} from '../actions';
import { createApiRequest } from '../services/api';

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
      const request = createApiRequest('POST', 'application/json', JSON.stringify(action.payload));
      console.log(request);
      return state;
    },
    [deletingSubmitted]: (state, action) => {
      const request = createApiRequest('DELETE', 'application/json', JSON.stringify(action.payload));
      console.log(request);
      return state;
    },
    [addingSubmitted]: (state, action) => {
      const request = createApiRequest('POST', 'multipart/form-data', action.payload);
      console.log(request);
      return state;
    },
  },
  singleGif,
);

export default { singleGif, singleGifReducer };
