// Тут просто сетятся тестовые данные,
// чтобы понимать, чтобы БД работает.

import mongoose from 'mongoose';

import { User, Feedback } from 'app/models';

export const testMongoDb = () => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: {
      firstName: 'Super',
      lastName: 'User',
    },
  });

  user.save(function(err) {
    if (err) {
      throw err;
    }

    console.log('User successfully saved.');

    const comment = new Feedback({
      _id: new mongoose.Types.ObjectId(),
      title: '5+',
      body: 'Great game!',
      user: user._id,
    });

    comment.save(function(err) {
      if (err) {
        throw err;
      }

      console.log('Feedback successfully saved.');
    });
  });
};
