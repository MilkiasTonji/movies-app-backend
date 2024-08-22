import multer, { diskStorage } from 'multer';
import { extname as _extname } from 'path';

// Set up storage engine
const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Specify the folder to store uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`); // Create a unique filename
  }
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(_extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 10 } // 10MB file size limit
});

export default upload;
