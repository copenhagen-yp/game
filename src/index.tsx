import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import StyleContext from 'isomorphic-style-loader/StyleContext';

import { configureStore } from './store';
import { registerSw } from './worker';
import App from './app';
import { BrowserRouter } from 'react-router-dom';

const store = configureStore();

registerSw();

const insertCss = (...styles: any) => {
  const removeCss = styles.map((style: any) => style._insertCss());

  return () => removeCss.forEach((dispose: any) => dispose());
};

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <StyleContext.Provider value={{ insertCss }}>
        <App />
      </StyleContext.Provider>
    </BrowserRouter>
  </Provider>, document.getElementById('root'));
