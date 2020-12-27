import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import 'normalize.css';

import './styles/common.pcss';

import { RouteWrapper } from './route-wrapper';
import { Toast } from './components';
import { routes } from './routes';

const App = () => {
  return (
    <ToastProvider
      components={{ Toast }}
      autoDismiss
    >
      <BrowserRouter>
        <Switch>
          {Object.values(routes).map((route) => (
            <RouteWrapper
              key={route.name}
              path={route.path}
              component={route.component}
              layout={route.layout}
            />
          ))
          }
        </Switch>
      </BrowserRouter>
    </ToastProvider>
  );
};

export default App;
