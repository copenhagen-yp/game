import { Request, Response } from 'express';

const createTopic = (req: Request, res: Response) => {
  if (!req.body.body) {
    res.statusCode = 400;
    res.send({ 'error': 'The feedback field is required' });

    return;
  }

  if (!req.body.userId) {
    res.statusCode = 400;
    res.send({ 'error': 'userId is required' });

    return;
  }

  res.send('Ok');
};

const getTopics = (req: Request, res: Response) => {
  console.log(req, res);
};

const createMessage = (req: Request, res: Response) => {
  console.log(req, res);
};

const getMessages = (req: Request, res: Response) => {
  console.log(req, res);
};

const getTopic = (req: Request, res: Response) => {
  console.log(req, res);
};

export {
  createTopic,
  getTopics,
  createMessage,
  getMessages,
  getTopic,
};
