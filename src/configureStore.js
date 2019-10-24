import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';

import { createRootReducer } from './reducers';

export const history = createBrowserHistory();

export default function configureStore(initialState) {
  const store = createStore(
    createRootReducer(history),
    initialState,
    composeWithDevTools(
      applyMiddleware(
        routerMiddleware(history),
      ),
    ),
  );

  return store;
}
