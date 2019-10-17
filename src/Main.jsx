import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './containers/HomePage';
import SearchResultPage from './containers/SearchResultPage';
import GifPage from './containers/GifPage';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/search" component={SearchResultPage} />
      <Route path="/gif/:id" component={GifPage} />
    </Switch>
  </main>
);

export default Main;
