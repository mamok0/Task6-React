import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import gifList from './gifList';
import search from './search';
import singleGif from './singleGif';

const createRootReducer = (history) => combineReducers({
  gifList,
  search,
  singleGif,
  router: connectRouter(history),
});

export default createRootReducer;
