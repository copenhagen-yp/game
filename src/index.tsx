import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';

import { configureStore } from './store';
import App from './app';
import { Toast } from './components';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <ToastProvider
      components={{ Toast }}
      autoDismiss
    >
      <App />
    </ToastProvider>
  </Provider>, document.getElementById('root'));
