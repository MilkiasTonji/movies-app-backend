import { Router } from 'express';
import Movie from '../models/Movie.js';
import protect from '../middlewares/auth.js';
import upload from '../utils/upload.js';
const router = Router();


// Protect all routes
router.use(protect);

// Create a new movie
router.post('/', upload.single('thumbnailUrl'),  async (req, res) => {
  const { title, publishingYear } = req.body;
  const thumbnailUrl = req.file ? `/uploads/${req.file.filename}` : null; 
  const userId = req.user.id
 
  try {
    const movie = new Movie({ title, publishingYear, thumbnailUrl, userId });
    await movie.save();
    res.status(201).json({success: true, movie, message: "Movie uploaded successfully"});
  } catch (error) {
    res.status(400).json({success: false, message: error.message });
  }
});

// Get all movies
router.get('/', async (req, res) => {
  try {
    const userId = req.user.id
    const movies = await Movie.find({userId});
    res.json({success: true, movies});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get a single movie by ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json({success: true, movie});
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update a movie by ID
router.put('/:id', upload.single('thumbnailUrl'), async (req, res) => {
  const { title, publishingYear } = req.body;
  const thumbnailUrl = req.file ? `/uploads/${req.file.filename}` : req.body.thumbnailUrl;
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      { title, publishingYear, thumbnailUrl },
      { new: true }
    );
    if (!movie) return res.status(404).json({success: false, message: 'Movie not found' });
    res.json({success: true, movie, message: "Movie updated successfully"});
  } catch (error) {
    res.status(400).json({success: false, message: error.message });
  }
});

// Delete a movie by ID
router.delete('/:id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    res.json({success: true, message: 'Movie deleted' });
  } catch (error) {
    res.status(500).json({success: false, message: error.message });
  }
});

export default router