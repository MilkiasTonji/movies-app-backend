import 'dotenv/config'

import express from 'express';
import cors from 'cors';
import pkg from 'body-parser';
const { json } = pkg;
import moviesRoutes from './routes/movies.js';
import authRoutes from './routes/auth.js'

import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(json());
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api/movies', moviesRoutes);


mongoose.connect(process.env.MONGODB_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch((err) => console.error('Could not connect to MongoDB Atlas', err));


  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});