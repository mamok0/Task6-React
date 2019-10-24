import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import { gifListReducer, gifList } from './gifList';
import { searchReducer, search } from './search';
import { singleGifReducer, singleGif } from './singleGif';

export const initialState = {
  gifList,
  search,
  singleGif,
};

export const createRootReducer = (history) => combineReducers({
  gifList: gifListReducer,
  search: searchReducer,
  singleGif: singleGifReducer,
  router: connectRouter(history),
});

export default { createRootReducer, initialState };
