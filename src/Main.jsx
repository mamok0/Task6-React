import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';


import Home from './containers/HomePage';
import SearchResult from './containers/SearchResultPage';
import GifInfo from './containers/GifPage';

/* eslint-disable no-underscore-dangle */
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const Main = () => (
  <main>
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={SearchResult} />
        <Route path="/gif/:id" component={GifInfo} />
      </Switch>
    </Provider>
  </main>
);

export default Main;
