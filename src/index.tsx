import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import StyleContext from 'isomorphic-style-loader/StyleContext';

import { ErrorBoundary } from './error-boundary';
import { configureStore } from './store';
import { registerSw } from './worker';
import App from './app';
import { BrowserRouter } from 'react-router-dom';

let preloadedState;

if (typeof window !== 'undefined') {
  // https://redux.js.org/recipes/server-rendering
  // Grab the state from a global variable injected into the server-generated HTML
  preloadedState = (window as any).__PRELOADED_STATE__;

  // Allow the passed state to be garbage-collected
  delete (window as any).__PRELOADED_STATE__;
}

const store = configureStore(preloadedState);

registerSw();

const insertCss = (...styles: any) => {
  const removeCss = styles.map((style: any) => style._insertCss());

  return () => removeCss.forEach((dispose: any) => dispose());
};

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <StyleContext.Provider value={{ insertCss }}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </StyleContext.Provider>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
