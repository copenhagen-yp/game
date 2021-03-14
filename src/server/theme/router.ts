import { Router } from 'express';
import bodyParser from 'body-parser';

import { updateTheme } from '../theme';

export const themeRouter = (apiRouter: Router) => {
  apiRouter.use(bodyParser.json());

  apiRouter.post('/theme', updateTheme);
};
