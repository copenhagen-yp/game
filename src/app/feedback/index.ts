import mongoose from 'mongoose';
import { Request, Response } from 'express';

import { Feedback } from './models';

export const saveFeedback = (req: Request, res: Response) => {
  if (!req.body.message) {
    res.statusCode = 400;
    res.send('The feedback field is required');

    return;
  }

  if (!req.body.userId) {
    res.statusCode = 400;
    res.send('userId is required');

    return;
  }

  const comment = new Feedback({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title || 'unknown',
    message: req.body.message,
    userId: req.body.userId,
  });

  comment.save(function(err) {
    if (err) {
      throw err;
    }
  });

  res.send('Ok');
};
