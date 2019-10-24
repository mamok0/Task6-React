import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import gifs from './gifs';
import search from './search';

const createRootReducer = (history) => combineReducers({
  gifs,
  search,
  router: connectRouter(history),
});

export default createRootReducer;
