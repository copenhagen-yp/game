import { hot } from 'react-hot-loader/root';
import React from 'react';
import { Provider } from 'react-redux';
import StyleContext from 'isomorphic-style-loader/StyleContext';
import { BrowserRouter } from 'react-router-dom';

import { ErrorBoundary } from './error-boundary';
import App from './app';
import { configureStore } from './store';

let preloadedState;

if (typeof window !== 'undefined') {
  // https://redux.js.org/recipes/server-rendering
  // Grab the state from a global variable injected into the server-generated HTML
  preloadedState = (window as any).__PRELOADED_STATE__;

  // Allow the passed state to be garbage-collected
  delete (window as any).__PRELOADED_STATE__;
}

const store = configureStore(preloadedState);


const insertCss = (...styles: any) => {
  const removeCss = styles.map((style: any) => style._insertCss());

  return () => removeCss.forEach((dispose: any) => dispose());
};



function Root() {
  return (
    <Provider store={store}>
      <StyleContext.Provider value={{ insertCss }}>
        <ErrorBoundary>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ErrorBoundary>
      </StyleContext.Provider>
    </Provider>
  );
}

export default hot(Root);
