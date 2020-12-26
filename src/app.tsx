import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import 'normalize.css';

import './styles/common.pcss';

import { RouteWrapper } from './route-wrapper'
import { routes } from './routes';

const App = () => {
  return (
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
  )
}

export default App;
