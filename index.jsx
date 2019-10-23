import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore, { history } from './src/configureStore';

import App from './src/App';
import { getSearchQuery } from './src/services/api';

const initialState = {
  gifList: {
    values: [],
    gifListOffset: 0,
    isGifListFetching: true,
  },
  singleGif: {
    value: {},
    isGifFetching: true,
  },
  search: {
    searchValue: getSearchQuery() || '',
  },
};

const store = configureStore(initialState);

ReactDOM.render((
  <Provider store={store}>
    <App history={history} />
  </Provider>
), document.getElementById('root'));
