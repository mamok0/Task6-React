import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './js/reducers/index';


import Home from './containers/HomePage';
import SearchResultPage from './containers/SearchResultPage';
import GifPage from './containers/GifPage';

const store = createStore(rootReducer);

const Main = () => (
  <main>
    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/search" component={SearchResultPage} />
        <Route path="/gif/:id" component={GifPage} />
      </Switch>
    </Provider>
  </main>
);

export default Main;
