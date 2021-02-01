import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import 'normalize.css';

import './styles/common.pcss';

import { RouteWrapper } from './route-wrapper';
import { routes } from './routes';
import { NoMatch } from './pages';
import { ErrorBoundary } from './error-boundary';
import { Toast } from './components';
import { UserInfoWrapper } from './user-info-wrapper';

const App = (props: any) => {
  console.log(props);
  
  return (
    <ToastProvider
      components={{ Toast }}
      autoDismiss
    >
      <UserInfoWrapper>
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
                  isPrivate={route.isPrivate}
                />
              ))
              }
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </ErrorBoundary>
        </BrowserRouter>
      </UserInfoWrapper>
    </ToastProvider>
  );
};

export default App;
