import { Router } from 'express';
import pkg from 'jsonwebtoken';
import User from '../models/User.js';

const { sign } = pkg;

const router = Router();

const validateEmail = (email) => {
    const re = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
  };

// Register a new user
router.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (! validateEmail(email)){
        return res.status(404).json({success: false, message: "Invalid email address"});
    }
    const user = new User({ email, password });
    await user.save();
    const token = sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });
  
    res.status(201).json({success: true, message: 'User registered successfully', token });
  } catch (error) {
    res.status(400).json({success: false, message: error.message });
  }
});

// Login a user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({success:false, message: 'Invalid credentials' });
    }

    const token = sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ success: true, token, message: "User loggedin successfully" });
  } catch (error) {
    res.status(500).json({success: false, message: error.message });
  }
});

export default router;
