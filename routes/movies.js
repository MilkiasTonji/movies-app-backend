import { Router } from 'express';
import Movie from '../models/Movie.js';
import protect from '../middlewares/auth.js';
import upload from '../utils/upload.js';
const router = Router();


// Protect all routes
router.use(protect);

// Create a new movie
router.post('/', upload.single('thumbnail'),  async (req, res) => {
  const { title, publishingYear } = req.body;
  const thumbnailUrl = req.file ? `/uploads/${req.file.filename}` : null; // Local file path
 
  try {
    const movie = new Movie({ title, publishingYear, thumbnailUrl });
    await movie.save();
    res.status(201).json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all movies
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a movie by ID
router.put('/:id', async (req, res) => {
  const { title, publishingYear, thumbnailUrl } = req.body;
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, publishingYear, thumbnailUrl },
      { new: true }
    );
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a movie by ID
router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router