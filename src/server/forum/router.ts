import { Router } from 'express';

import { createTopic, getTopics, createMessage, getTopic } from './';

export const forumRouter = (apiRouter: Router) => {
  apiRouter.post('/forum/topic', createTopic);
  apiRouter.get('/forum/topic', getTopics);
  apiRouter.get('/forum/topic/:id', getTopic);
  apiRouter.post('/forum/topic/:id/message', createMessage);
};
