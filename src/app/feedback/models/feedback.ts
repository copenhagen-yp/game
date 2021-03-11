import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  body: {
    type: String,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  created: {
    type: Date,
    default: Date.now
  }
});

export const Feedback = mongoose.model('Feedback', feedbackSchema);
