import React, { useEffect, useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import 'normalize.css';

import './styles/common.pcss';

import { RouteWrapper } from './route-wrapper';
import { routes } from './routes';
import { NoMatch } from './pages';
import { ErrorBoundary } from './error-boundary';
import { API_URL } from './constants';
import * as userActions from './store/user/actions';
import { useHttp } from './hooks';



const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const { request } = useHttp();
  const dispatch = useDispatch();

  useEffect(() => {
    async function init() {
      request(API_URL.GET_USER_INFO)
        .then((resp) => {
          dispatch(userActions.setUserInfo(resp));
        })
        .catch(() => dispatch(userActions.setUserInfo(null)))
        .finally(() => {
          setIsLoading(false);
        });
    }

    init();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
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
  );
};

export default App;
