import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  summary: String,
  isbn: String,
  thumbnail: Buffer,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  ratings: [
    {
      summary: String,
      detail: String,
      numberOfStars: Number,
      created: {
        type: Date,
        default: Date.now
      }
    }
  ],
  created: {
    type: Date,
    default: Date.now
  }
});

export const Book = mongoose.model('Book', bookSchema);
