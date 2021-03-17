import { Router } from 'express';

import { updateTheme } from '../theme';

export const themeRouter = (apiRouter: Router) => {
  apiRouter.post('/theme', updateTheme);
};
