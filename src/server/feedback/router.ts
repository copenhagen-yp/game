import { Router } from 'express';

import { saveFeedback } from './';

export const feedbackRouter = (apiRouter: Router) => {
  apiRouter.post('/feedback', saveFeedback);
};
