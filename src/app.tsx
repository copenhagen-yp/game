import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import 'normalize.css';

import './styles/common.pcss';

import { RouteWrapper } from './route-wrapper';
import { Toast } from './components';
import { routes } from './routes';
import { NoMatch } from './pages';
import { ErrorBoundary } from './error-boundary';

const App = () => {
  return (
    <ToastProvider
      components={{ Toast }}
      autoDismiss
    >
      <BrowserRouter>
        <ErrorBoundary>
          <Switch>
            {Object.values(routes).map((route) => (
              <RouteWrapper
                key={route.name}
                path={route.path}
                component={route.component}
                layout={route.layout}
                exact={route.exact}
              />
            ))
            }
            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </ErrorBoundary>
      </BrowserRouter>
    </ToastProvider>
  );
};

export default App;
