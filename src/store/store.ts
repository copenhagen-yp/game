import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from './reducer';

let composeEnhancers = compose;

if (typeof window !== 'undefined' && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
}

export const configureStore = (preloadedState: any) => {
  const store = createStore(reducers, preloadedState, composeEnhancers(applyMiddleware(thunk)));

  return store;
};
