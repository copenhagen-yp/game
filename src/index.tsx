import React from 'react';
import ReactDOM from 'react-dom';

import Root from './root';
import { registerSw } from './worker';

registerSw();

ReactDOM.hydrate(
  <Root />,
  document.getElementById('root')
);
