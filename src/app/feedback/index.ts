import mongoose from 'mongoose';

import { User, Feedback } from './models';

export const saveFeedback = (req, res) => {
  if (!req.body.body) {
    res.statusCode = 400;
    res.send({ 'error': 'The feedback field is required' });

    return;
  }

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: {
      firstName: req.body.first_name || 'unknown',
      lastName: req.body.last_name || 'unknown',
    },
  });

  user.save(function(err) {
    if (err) {
      throw err;
    }

    const comment = new Feedback({
      _id: new mongoose.Types.ObjectId(),
      title: req.body.title || 'unknown',
      body: req.body.body,
      userId: user._id,
    });

    comment.save(function(err) {
      if (err) {
        throw err;
      }
    });
  });

  res.json({
    message: 'Ok'
  });
};
