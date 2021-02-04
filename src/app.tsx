import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import withStyles from 'isomorphic-style-loader/withStyles';
import 'normalize.css';

import commonStyles from './styles/common.pcss';

import { RouteWrapper } from './route-wrapper';
import { routes } from './routes';
import { NoMatch } from './pages';
import { ErrorBoundary } from './error-boundary';
import { Toast } from './components';
import { UserInfoWrapper } from './user-info-wrapper';

function App() {
  return (
    <ToastProvider
      components={{ Toast }}
      autoDismiss
    >
      <UserInfoWrapper>
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
      </UserInfoWrapper>
    </ToastProvider>
  );
}

export default withStyles(commonStyles)(App);
