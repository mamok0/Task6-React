import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { createRootReducer } from './reducers';
import rootSaga from './sagas';


export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState) {
  const store = createStore(
    createRootReducer(history),
    initialState,
    composeWithDevTools(
      applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history),
      ),
    ),
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
