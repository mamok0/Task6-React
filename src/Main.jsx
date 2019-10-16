import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/Home';
import SearchResult from './containers/SearchResult';
import GifPage from './containers/GifPage';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/search" component={SearchResult} />
      <Route path="/gif/:id" component={GifPage} />
    </Switch>
  </main>
);

export default Main;
