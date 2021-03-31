import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import withStyles from 'isomorphic-style-loader/withStyles';
import 'normalize.css';

import commonStyles from './styles/common.pcss';

import { RouteWrapper } from './route-wrapper';
import { routes } from './routes';
import { NoMatch } from './pages';
import { Toast } from './components';
import { UserInfoWrapper } from './user-info-wrapper';
import { userSelectors } from './store/user';

function App() {
  const theme = useSelector(userSelectors.getTheme);
  
  return (
    <div className={commonStyles[theme]}>
      <ToastProvider
        components={{ Toast }}
        autoDismiss
      >
        <UserInfoWrapper>
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
        </UserInfoWrapper>
      </ToastProvider>
    </div>
  );
}

export default withStyles(commonStyles)(App);
