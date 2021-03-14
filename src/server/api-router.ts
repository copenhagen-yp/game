import { Router, Request, Response, NextFunction } from 'express';
import { feedbackRouter } from './feedback/router';
import { themeRouter } from './theme/router';

export const apiRouter: Router = Router();

apiRouter.use((req: Request, res: Response, next: NextFunction) => {
  if (req.cookies.authCookie) {
    next();
  } else {
    res.statusCode = 401;
    res.send('You are not authorized');
  }
});

feedbackRouter(apiRouter);
themeRouter(apiRouter);
