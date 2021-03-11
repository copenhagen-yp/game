import { Router } from 'express';
import bodyParser from 'body-parser';

import { saveFeedback } from '../feedback';

export const feedbackRouter = (apiRouter: Router) => {
  apiRouter.use(bodyParser.json());

  apiRouter.post('/feedback', saveFeedback);
};
