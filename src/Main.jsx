import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/HomePage';
import SearchResult from './containers/SearchResultPage';
import GifInfo from './containers/GifPage';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/search" component={SearchResult} />
      <Route path="/gif/:id" component={GifInfo} />
    </Switch>
  </main>
);

export default Main;
