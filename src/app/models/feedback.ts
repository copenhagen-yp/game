import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  body: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  created: {
    type: Date,
    default: Date.now
  }
});

export const Feedback = mongoose.model('Feedback', feedbackSchema);
