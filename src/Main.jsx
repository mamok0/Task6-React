import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from './containers/HomePage';
import SearchResult from './containers/SearchResultPage';
import GifInfo from './containers/GifPage';
import Add from './components/forms/Add';

const Main = () => (
  <main className="text-center">
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/search" component={SearchResult} />
      <Route path="/gif/:id" component={GifInfo} />
      <Route path="/addGif" component={Add} />
    </Switch>
  </main>
);

export default Main;
