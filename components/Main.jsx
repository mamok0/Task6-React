import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './HomeContainer';
import SearchResult from './SearchResultContainer';
import GifPage from './GifPageContainer';

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
