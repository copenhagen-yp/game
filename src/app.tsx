import React from 'react';
import { BrowserRouter, Link, Switch } from 'react-router-dom';

import { RouteWrapper } from './route-wrapper'
import { routes } from './routes';

const App = () => {
  return (
    <BrowserRouter>
      <ul>
        <li><Link to="/sign-in">SignIn</Link></li>
        <li><Link to="/home">Home</Link></li>
      </ul>

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
