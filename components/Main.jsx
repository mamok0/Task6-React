import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomeContainer from './HomeContainer';
import SearchResultContainer from './SearchResultContainer';
import GifPageContainer from './GifPageContainer';

const Main = () => (
  <main>
    <Switch>
      <Route exact path="/" component={HomeContainer} />
      <Route path="/search" component={SearchResultContainer} />
      <Route path="/gif/:id" component={GifPageContainer} />
    </Switch>
  </main>
);

export default Main;
