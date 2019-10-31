import React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import PropTypes from 'prop-types';

import Header from './components/common/Header';
import Main from './Main';

const App = ({ history }) => (
  <ConnectedRouter history={history}>
    <Header />
    <Main />
  </ConnectedRouter>
);

App.propTypes = {
  history: PropTypes.shape({
    listen: PropTypes.func,
    action: PropTypes.string,
  }).isRequired,
};

export default App;
