import { Router } from 'express';
import { feedbackRouter } from './feedback/router';

export const apiRouter: Router = Router();

feedbackRouter(apiRouter);
