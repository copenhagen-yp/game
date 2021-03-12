import { Router } from 'express';

import { createTopic, getTopics, createMessage, getMessages, getTopic } from './';

export const forumRouter = (apiRouter: Router) => {
  apiRouter.post('/forum/topics', createTopic);
  apiRouter.get('/forum/topics', getTopics);
  apiRouter.get('/forum/topics/:id', getTopic);
  apiRouter.post('/forum/topics/:id/messages', createMessage);
  apiRouter.get('/forum/topics/:id/messages', getMessages);
};
