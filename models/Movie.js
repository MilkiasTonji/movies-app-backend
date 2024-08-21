import { Schema, model } from 'mongoose';

const movieSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  publishingYear: {
    type: Number,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
});

export default model('Movie', movieSchema);