import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import configureStore, { history } from './src/configureStore';
import App from './src/App';
import { initialState } from './src/reducers/index';

const store = configureStore(initialState);

ReactDOM.render((
  <Provider store={store}>
    <App history={history} />
  </Provider>
), document.getElementById('root'));
