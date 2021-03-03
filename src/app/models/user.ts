import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: String,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model('User', userSchema);
